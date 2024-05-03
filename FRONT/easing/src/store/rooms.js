    import {defineStore} from 'pinia';
    import roomService from "@/service/roomService";

    export const useRoomsStore = defineStore('rooms', {
        state: () => ({
            pieces : [],
            captorActionneur: [],
            captorActioneurToAdd: [],
            currentFloor: 'first',
            hours:"23:04",
            temperature: 5,
            person: "Visually Imparaired"
        }),
        actions:{
            changeFloor(){
               this.currentFloor = this.currentFloor === 'first' ? 'second' : 'first'        },
            async getPieces(){
                this.pieces = await roomService.getPieces();
            },
            setHours(hour){
                this.hours = hour;
            },
            setTemperature(temp){
                this.temperature = temp;
            } ,async getCaptorandSensor()
            {
                const captors = await roomService.getAllCaptor();
                const actuators = await roomService.getAllActuor();
                this.captorActionneur = [...captors, ...actuators];
            }, addCaptorActionneur(captor){
                this.captorActioneurToAdd.push(captor);
            }, pushCaptorActionneur(){
                roomService.addCaptorActionneur(this.captorActioneurToAdd)
                this.captorActioneurToAdd = [];
            },    updateCaptor(nom, etat) {
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
        }

    })