    import {defineStore} from 'pinia';
    import roomService from "../service/roomService";

    export const useRoomsStore = defineStore('rooms', {
        state: () => ({
            pieces : [],
            captorActionneur: [],
          //  captorActioneurToAdd: [],
            currentFloor: 'first',
            security: false,
            external_luminosity:"low_luminosity",
            hours:"23:04",
            temperature: 5,
            person: "Visually Imparaired"
        }),
        actions:{
            changeFloor(){
               this.currentFloor = this.currentFloor === 'first' ? 'second' : 'first'        },
            async getPieces(){
                try{
                    let response = await roomService.getPieces()
                    if(!response.error){
                        this.pieces = response;
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
                        console.log(this.captorActionneur)
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
            updateCaptor(nom, etat) {
                const IndexPiece = this.pieces.findIndex(p => p.name === nom);
                if (IndexPiece !== -1) {
                    const updatedPiece = { ...this.pieces[IndexPiece] };
                    console.log("ici")
                    updatedPiece.captors.forEach(capteur => {
                        if (capteur.typeId === "sensor-presence") {
                            capteur.value = etat;
                        }
                    });
                        this.pieces.splice(IndexPiece, 1, updatedPiece);

                }
            },
            updateSecurity(value){
                this.security = value;
            },
            updateExternalLight(value){
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
            },
            setHours(hour){
                this.hours = hour;
            },
            setTemperature(temp){
                this.temperature = temp;
            },
            setPerson(type){
                this.person = type;
            }
        }

    })