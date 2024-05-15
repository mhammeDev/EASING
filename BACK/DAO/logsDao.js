class logsDao{
    static logs;
    static async injectDB(conn){
        if(this.logs){
            return
        }
        try{
            this.logs = await conn.db(process.env.MONGODB_DB).collection("logs")
        } catch(e){
            console.error("Unable to connect to the logs's collection : " + e)
        }
    }

    static async insertHistory(input, output){
        try{
            await this.logs.insertOne(
                {
                    input: input,
                    output:output
                }
            )
            console.log("Insert historical successful !")
        } catch(e){
            console.error("Error to insert history : " + e)
        }
    }

    static async getAllLogs(){
        try{
            return await this.logs.find().toArray();
        } catch(e){
            console.error("Error to get all logs : " + e)
            return {error : e}
        }
    }

    
}

module.exports = logsDao