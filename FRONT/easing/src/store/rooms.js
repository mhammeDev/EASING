    import {defineStore} from 'pinia';
    import roomService from "../service/roomService";
    import {connectToSocket} from "@/service/socket.service"


    export const useRoomsStore = defineStore('rooms', {
        state: () => ({
            pieces : [],
            captorActionneur: [],
            socket: null,
          //  captorActioneurToAdd: [],
            currentFloor: 'first',
            security: false,
            external_luminosity:"high_luminosity",
            hours:"23:04",
            temperature: 20,
            currentPiece: null,
            person: "Visually Imparaired",
            message:'',
            conversationChatBot:[
                {from: "assistant", content: "Hi, I'm your assistant, I'm here to do what you ask of me"}
            ],
            recommendations: [],
            actionsLogs: [],
            zoom: 1,
            loading: false,
            errorRequest: false,
        }),
        actions:{
            changeFloor(){
               this.currentFloor = this.currentFloor === 'first' ? 'second' : 'first'        },
            async getPieces(){
                try{
                    let response = await roomService.getPieces()
                    if(!response.error){
                        this.pieces = response;
                        await this.updateBrightness();

                    }
                }catch(e){
                    console.log("An error occured : " + e)
                }
            },
            async getCaptorandSensor()
            {
                try{
                    let response = await roomService.getAllActuators()
                    let response2 = await roomService.getAllSensors()
                    if(!response.error && !response2.error){
                        this.captorActionneur = [...response, ...response2];
                    }

                }catch(e){
                    console.log("An error occured : " + e)

                }
           /*

                const captors = await roomService.getAllCaptor();
                const actuators = await roomService.getAllActuor();
                this.captorActionneur = [...captors, ...actuators];*/
            },

          /* addCaptorActionneur(captor){
                this.captorActioneurToAdd.push(captor);
            }, pushCaptorActionneur(){
                roomService.addCaptorActionneur(this.captorActioneurToAdd)
                this.captorActioneurToAdd = [];
            }, */
            async UpdatePresenceSensor(nom, etat) {
                const IndexPiece = this.pieces.findIndex(p => p.name === nom);
                if (IndexPiece !== -1) {
                    const updatedPiece = { ...this.pieces[IndexPiece] };
                    updatedPiece.captors.forEach(capteur => {
                        if (capteur.typeId === "sensor-presence") {
                            capteur.value = etat;
                        }
                    });
                        this.pieces.splice(IndexPiece, 1, updatedPiece);
                        if(updatedPiece.actuators.length > 0){
                            let actuators = [];
                            let sensors = [];

                            await updatedPiece.captors.forEach(sensor => {
                                sensors.push({typeId: sensor.typeId, value: sensor.value});
                            })
                            if(this.security === true ) sensors.push({typeId: "security", value: this.security});

                            await updatedPiece.actuators.forEach(actuator => {
                                if (actuator.typeId.toString() !== "motorized-blind" && actuator.typeId.toString() !== "heating") {
                                    if(actuator.dependencies && actuator.dependencies.length > 0){
                                        actuators.push({typeId :actuator.typeId, dependencies:JSON.stringify(actuator.dependencies)});
                                    }else{
                                        actuators.push({typeId :actuator.typeId});
                                    }
                                }
                            })
                            let prompt = {name : updatedPiece.name, sensors: sensors, actuators : actuators}
                            this.SensorEvent(prompt)
                        }

                    else if(this.security === true ){
                        let sensors = [];
                        await updatedPiece.captors.forEach(sensor => {
                            sensors.push({typeId: sensor.typeId, value: sensor.value});
                        })
                        sensors.push({typeId: "security", value: this.security});
                        let prompt = {name : updatedPiece.name, sensors: sensors}
                        this.SensorEvent(prompt)

                    }


                }
            },

            /*
            This function doesn't take anything in parameter and return a void
            This function update internal light sensor when an actuators "gave" light
             */

            async updateBrightness() {
                let result = this.pieces;

                result.forEach(piece => {
                    // We check for each pieces to auto update the brithness
                    let currentRoom = this.pieces.findIndex(p => p.name === piece.name);
                    if(currentRoom !== -1){
                        let result = 'low_luminosity'
                        piece.actuators.forEach(act => {
                            //The actuators who interact with the brightness are the light and the blind
                            // so we check if something raise the brightness
                            if(act.value === 'bulb_on' || act.value === 'blind_up'){
                                result = 'high_luminosity';
                            }
                        })
                        // finally we update it
                        piece.captors.forEach(captor => {
                            if(captor.typeId === 'internal-light-sensor'){
                                captor.value = result
                            }
                        })
                        // We update the tablz
                        this.pieces.splice(currentRoom, 1, piece);
                    }
                })

            },

            async UpdateSocketSensor(roomName, actuator){
                await actuator.dependencies.forEach(e => {
                    e.value = !e.value
                })
                let prompt_actuator = [{typeId :actuator.typeId, dependencies:JSON.stringify(actuator.dependencies)}];
                let prompt = {name : roomName, actuators : prompt_actuator}
                console.log(prompt)
                this.SensorEvent(prompt)

            },

            async SensorEvent(sensor){
                this.socket.emit("house-sensor-event", sensor)

            },
            updateSecurity(value){
                this.security = value;
            },
            setCurrentRoom(piece){
                this.currentPiece = piece;
            },
            updateExternalLight(value){
                if(this.external_luminosity !== value){
                    switch (value){
                        case "low_luminosity":
                            this.external_luminosity ="low_luminosity"
                            break;
                        case "medium_luminosity":
                            this.external_luminosity ="medium_luminosity"
                            break;
                        case "high_luminosity":
                            this.external_luminosity ="high_luminosity"
                            break;
                        default:
                            break;
                    }
                    let external_sensors = [{
                        "exernal-light-sensor": value
                    }]
                    let actuators = [
                        {
                            "typeId" : "motorized-blind"
                        }
                    ]
                    this.socket.emit("general-sensor-event", {external_sensors : external_sensors, actuators : actuators})

                }
            },
            setHours(hour){
                this.hours = hour;
            },
            setTemperature(temp){
                let actuators = [
                    {
                        "typeId" : "heating"
                    }
                ]
                let result;
                // classify or gpt going to give random answer
                temp < 18 ? result = "temp_low" :  result = "temp_high"
                //this.SensorEvent(
                  //  {sensors :[{typeId: "temperature" , old_value: result2, new_value: result}]}
                //)

                this.socket.emit("general-sensor-event", {name:"",sensors :[{typeId: "temperature" , value: result}], actuators: actuators })
                this.temperature = temp;
            },
            sendMessageToApi(content){
                this.conversationChatBot.push({from: "user", content: content})
                this.loading = true;
                console.log("su")
                this.socket.emit("chat-event", content)
            },
            setPerson(type){
                this.person = type;
            },

            async updateRoom(IndexPiece, data){
                let updatedRooms = this.pieces[IndexPiece];
                updatedRooms.actuators.forEach(room_actu => {
                    data.actuators.forEach(actuator => {
                        if(room_actu.typeId === actuator.name){
                            room_actu.value = actuator.result;
                        }
                    })
                })
                this.pieces.splice(IndexPiece, 1, updatedRooms);
                await this.updateBrightness();
            },
            initializeSocket(){
                const socket = connectToSocket();

                socket.on('update-room', async data => {
                    const IndexPiece = this.pieces.findIndex(e => e.name === data.name);
                    if(IndexPiece !== -1){
                        this.updateRoom(IndexPiece,data)
                    }
                })

                socket.on("error", error=>{
                    console.log("Error from the socket " + error);
                })

                socket.on("update-actuator", async data => {
                    let actuatorName;
                    data.actuators.forEach(e => {
                        actuatorName = e.name;

                    })

                    this.pieces.forEach(piece => {
                        if(piece.actuators.some(e => e.typeId === actuatorName)){
                            this.updateRoom(this.pieces.findIndex(ex => ex.name === piece.name), data)
                        }
                    })

                })

                socket.on("house-notification", data => {
                    console.log(data)
                    switch (data.result){
                        case "water-leak":
                            this.setNotificationMessage("💦", "A water leak is detected !", "info", "bottom-left");
                            break;
                        case "temp_down":
                            this.setNotificationMessage("🌡️", "The temperature has decreased !", "error", "bottom-left");
                            break;
                        case "temp_up":
                            this.setNotificationMessage("🌡️", "The temperature has increased !", "warning", "bottom-left");
                            break;
                        case "intrusion":
                            this.setNotificationMessage("🔒️", "An intrusion has been detected !", "error", "bottom-left");
                            break;
                        default:
                            console.log("erreur")
                            break;
                    }
                })

                socket.on("logs", data => {
                    try{
                        this.actionsLogs.push(data) ;
                    }catch (e){
                        console.log(e)
                    }
                })

                socket.on("recommendations-actions", data => {
                    try{
                        this.recommendations.push(data) ;
                    } catch (e){
                        console.log(e)
                    }
                })

                socket.on("error_connection", () => {
                    console.error("Token error:");
                    this.errorRequest = true;

                });

                socket.on("chat-action", data => {
                    try{
                        this.loading = false;
                        this.conversationChatBot.push({from:"assistant", content: data.response})
                        console.log(data.response);
                        console.log(data.content)
                        data.content.forEach(room => {
                            const IndexPiece = this.pieces.findIndex(e => e.name === room.name);
                            if(IndexPiece !== -1){
                                this.updateRoom(IndexPiece,room)
                            }
                        })

                    }catch (e){
                        console.log(e)
                    }

                })
                this.socket = socket;
            },
            setNotificationMessage(icon, message, style, position) {
                this.message = {icon: icon, message : message, style: style, position: position};
            },
            resetError(){
                this.errorRequest = false;
            },
            setZoom(factor){
                let copy= this.zoom;
                if(copy * factor < 1){this.zoom = 1}
                else if(copy * factor > 3){this.zoom =3}
                else{this.zoom *= factor}}
        }

    })