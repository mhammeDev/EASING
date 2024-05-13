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
            console.log(this.logs)
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
}

module.exports = logsDao