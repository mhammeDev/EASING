import {pieces, type_actionneur, type_capteur} from '@/data/pieces'

async function getPieces(){
    return pieces;
}

async function getAllActuor(){
    return type_actionneur.map(e => ({ ...e, type: 'actuator' }));}

async function getAllCaptor(){
    return type_capteur.map(e => ({ ...e, type: 'captor' }));
}


function addCaptorActionneur(captor){
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
}

export default {
    getPieces,
    getAllActuor,
    getAllCaptor,
    addCaptorActionneur
}