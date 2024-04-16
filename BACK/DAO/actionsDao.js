class actionsDao {
    static actions;
    static async injectDB(conn){
        if(this.actions){
            return
        }
        try{
            this.actions = await conn.db(process.env.MONGODB_DB).collection("actions")
        } catch(e){
            console.error("Unable to connect to the action's collection : " + e)
        }
    }

    static async findAllActions(){
        try{
            return await this.actions.find().toArray();
        } catch(e){
            console.error("Error to find all actions : " + e)
            return {error : e}
        }
    }
}

module.exports = actionsDao;