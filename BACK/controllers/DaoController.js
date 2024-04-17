const actionsDao = require("../DAO/actionsDao")
const roomsDao = require("../DAO/roomsDao")
const typeActuor = require("../DAO/typeActuorDao")
const typeCaptor = require("../DAO/typeCaptorDao")

class DaoController{

    static async getAllRooms(req, res){
        try{
            const rooms = await roomsDao.findAllRooms();
            res.json(rooms);
        } catch(e){
            res.status(500).json({
                error : e.message
            });
        }
    }

    static async getAllActions(req, res){
        try {
            const actions = await actionsDao.findAllActions();
            res.json(actions)
        } catch(e){
            res.status(500).json({
                error : e.message
            });
        }
    }

    static async getAllTypeActuors(req, res){
        try {
            const type_actuors = await typeActuor.findAllTypeActuors();
            res.json(type_actuors)
        } catch(e){
            res.status(500).json({
                error : e.message
            });
        }
    }

    static async getListAllActions(){
        try {
            const type_actuors = await actionsDao.findAllActions();
            let table = [];

            type_actuors.forEach(t => {
                table.push(t.nomAction)
            })
            return table;
        } catch(e){
            console.log(e)
            return
        }
    }

    static async getAllTypeCaptors(req, res){
        try {
            const type_captors = await typeCaptor.findAllTypeCaptors();
            res.json(type_captors)
        } catch(e){
            res.status(500).json({
                error : e.message
            });
        }
    }
}

module.exports = DaoController;