class typeCaptorsrDao {
    static typeCaptors;
    static async injectDB(conn){
        if(this.typeCaptors){
            return
        }
        try{
            this.typeCaptors = await conn.db(process.env.MONGODB_DB).collection("types_capteurs")
        } catch(e){
            console.error("Unable to connect to the type_captor's collection : " + e)
        }
    }

    static async findAllTypeCaptors(){
        try{
            return await this.typeCaptors.find().toArray();
        } catch(e){
            console.error("Error to find all types of captors : " + e)
            return {error : e}
        }
    }
}

module.exports = typeCaptorsrDao;