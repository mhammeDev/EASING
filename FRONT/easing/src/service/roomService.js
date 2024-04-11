import {pieces, type_actionneur} from '@/data/pieces'

async function getPieces(){
    return pieces;
}

async function getAllSensorAndActionnor(){
    return type_actionneur.filter(e => e._id !== "sensor-luminosity" && e._id !== "sensor-temperature" && e._id !== "sensor-presence");

}

function addCaptorActionneur(captor){
    captor.forEach(ex => {
        const pieceIndex = pieces.findIndex(p => p.nom === ex.nom);
        if(pieceIndex !== -1){
            console.log(pieces[pieceIndex].nom, {"typeId": ex._id,"points": ex.points, "etat": false})
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