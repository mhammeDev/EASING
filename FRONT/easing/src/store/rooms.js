    import {defineStore} from 'pinia';
    import roomService from "@/service/roomService";

    export const useRoomsStore = defineStore('rooms', {
        state: () => ({
            pieces : [],
            captorActionneur: [],
            captorActioneurToAdd: [],
            currentFloor: 'first',
            hours:12,
            temperature: 5,
        }),
        actions:{
            changeFloor(){
               this.currentFloor = this.currentFloor === 'first' ? 'second' : 'first'        },
            async getPieces(){
                this.pieces = await roomService.getPieces();
                console.log(this.pieces)
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
                const IndexPiece = this.pieces.findIndex(p => p.nom === nom);

                if (IndexPiece !== -1) {
                    const updatedPiece = { ...this.pieces[IndexPiece] };
                    updatedPiece.capteurs.forEach(capteur => {
                        if (capteur.typeId === "sensor-presence") {
                            capteur.etat = etat;
                        }
                    });
                        this.pieces.splice(IndexPiece, 1, updatedPiece);

                        console.log(this.pieces[IndexPiece]);


                }
            },
        }

    })