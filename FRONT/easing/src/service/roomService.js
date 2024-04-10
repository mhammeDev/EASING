import {pieces, type_actionneur} from '@/data/pieces'

async function getPieces(){
    return pieces;
}

async function getAllSensorAndActionnor(){
    return type_actionneur;
}

export default {
    getPieces,
    getAllSensorAndActionnor
}