class roomsDao {
    static rooms;
    static async injectDB(conn){
        if(this.rooms){
            return
        }
        try{
            this.rooms = await conn.db(process.env.MONGODB_DB).collection("rooms")
        } catch(e){
            console.error("Unable to connect to the room's collection : " + e)
        }
    }

    static async findAllRooms(){
        try{
            return await this.rooms.find().toArray();
        } catch(e){
            console.error("Error to find all rooms : " + e)
            return {error : e}
        }
    }
}

module.exports = roomsDao;