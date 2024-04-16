class typeActuorDao {
    static typeActuor;
    static async injectDB(conn){
        if(this.typeActuor){
            return
        }
        try{
            this.typeActuor = await conn.db(process.env.MONGODB_DB).collection("types_actionneurs")
        } catch(e){
            console.error("Unable to connect to the type_actuor's collection : " + e)
        }
    }

    static async findAllTypeActuors(){
        try{
            return await this.typeActuor.find().toArray();
        } catch(e){
            console.error("Error to find all types of actuor : " + e)
            return {error : e}
        }
    }
}

module.exports = typeActuorDao;