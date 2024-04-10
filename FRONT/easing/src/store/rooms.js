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
        },
        setHours(hour){
            this.hours = hour;
        },
        setTemperature(temp){
            this.temperature = temp;
        } ,async getCaptorandSensor(){
            this.captorActionneur = await roomService.getAllSensorAndActionnor();
        }, addCaptorActionneur(captor){
            this.captorActioneurToAdd.push(captor);

        }, pushCaptorActionneur(){
            roomService.addCaptorActionneur(this.captorActioneurToAdd)

        }
    }

})