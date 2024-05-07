import {getRequest} from "@/service/axios.service";

const url = "/db"

async function getAllRoomsFromApi(){
    return getRequest(url+"/rooms", "getAllRooms")
}

async function getAllSensorsFromApi(){
    return getRequest(url+"/type-sensors", "getAllSensors")
}

async function getAllActuatorsFromApi(){
    return getRequest(url+"/type-actuators", "getAllActuators")
}


/*
async function getPieces(){
    return pieces;
}

async function getAllActuor(){
    return type_actionneur.map(e => ({ ...e, type: 'actuator' }));}

async function getAllCaptor(){
    return type_capteur.map(e => ({ ...e, type: 'captor' }));
}

*/


async function getPieces(){
    let response = null;
    try{
        response = await getAllRoomsFromApi();
     //   console.log(response)
        return response.data
    }catch (e){
        console.error("Error while fetching rooms from API : " + e)
        throw e;
    }
}

async function getAllActuators(){
    let response = null;
    try{
        response = await getAllActuatorsFromApi();
        return response.data.map(e => ({ ...e, type: 'actuator' }));
    }catch (e){
        console.error("Error while fetching actuators from API : " + e)
        throw e;
    }
}


async function getAllSensors(){
    let response = null;
    try{
        response = await getAllSensorsFromApi();
        return response.data.map(e => ({ ...e, type: 'captor' }));
    }catch (e){
        console.error("Error while fetching sensors from API : " + e)
        throw e;
    }
}


/*function addCaptorActionneur(captor){
    captor.forEach(ex => {
        const pieceIndex = pieces.findIndex(p => p.nom === ex.nom);
        if(pieceIndex !== -1){
            console.log(pieces[pieceIndex].nom, {"typeId": ex._id,"points": ex.points, "etat": false})
            pieces[pieceIndex].captors.push({
                "typeId": ex._id,
                "points": ex.points,
                "etat": false
            });
        }
    });
}*/

export default {
    getPieces,
    getAllActuators,
    getAllSensors
}