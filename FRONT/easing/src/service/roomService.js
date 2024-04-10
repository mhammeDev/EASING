import {pieces, type_actionneur} from '@/data/pieces'

async function getPieces(){
    return pieces;
}

async function getAllSensorAndActionnor(){
    let table = type_actionneur.filter(e => e._id !== "sensor-luminosity" && e._id !== "sensor-temperature" && e._id !== "sensor-presence");
    return table;
}

function addCaptorActionneur(captor){
    captor.forEach(ex => {
        const pieceIndex = pieces.findIndex(p => p.nom === ex.nom);
        if(pieceIndex !== -1){
            console.log("sisis")
            pieces[pieceIndex].capteurs.push({
                "typeId": ex._id,
                "points": ex.points,
                "etat": false
            });
        }
    });
}

export default {
    getPieces,
    getAllSensorAndActionnor,
    addCaptorActionneur
}