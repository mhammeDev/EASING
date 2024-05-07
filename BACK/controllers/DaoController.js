const actionsDao = require("../DAO/actionsDao")
const roomsDao = require("../DAO/roomsDao")
const typeActuor = require("../DAO/typeActuorDao")
const typeCaptor = require("../DAO/typeCaptorDao")

class DaoController{

    static async getAllRooms(req, res){
        try{
            const rooms = await roomsDao.findAllRooms();
            res.status(200).json({data: rooms});
        } catch(e){
            res.status(500).json({
                error : "Impossible to get all rooms : " + e.message
            });
        }
    }

    static async getAllActions(req, res){
        try {
            const actions = await actionsDao.findAllActions();
            res.status(200).json({data: actions});
        } catch(e){
            res.status(500).json({
                error : "Impossible to get all actions : "+ e.message            });
        }
    }

    static async getAllTypeActuors(req, res){
        try {
            const type_actuors = await typeActuor.findAllTypeActuors();
            res.status(200).json({data: type_actuors})
        } catch(e){
            res.status(500).json({
                error : "Impossible to get all actuators : " + e.message
            });
        }
    }

    static async getAllTypeCaptors(req, res){
        try {
            const type_captors = await typeCaptor.findAllTypeCaptors();
            res.status(200).json({data: type_captors})
        } catch(e){
            res.status(200).json({
                error : "Impossible to get all sensors : " + e.message
        });
        }
    }

    static async getListAllActions(){
        try {
            const type_actions = await actionsDao.findAllActions();
            let table = [];

            type_actions.forEach(t => {
                if(t.actuators){
                    table.push({action : t.name, type_action : t.type_result, actuators : t.actuators, result : t.result});
                } else if(t.sensors){
                    table.push({action : t.name, type_action : t.type_result, sensors : t.sensors, result : t.result});
                }
            })
            return table;
        } catch(e){
            console.log(e)
        }
    }

    static async getListAllActuorsDependecies(){
        try {
            const type_actuors = await typeActuor.findAllTypeActuors();
            let table = [];

            type_actuors.forEach(t => {
                table.push({id : t._id, dependecies : t.dependecies})
            })
            return table;
        } catch(e){
            console.log(e)
        }
    }
}

module.exports = DaoController;