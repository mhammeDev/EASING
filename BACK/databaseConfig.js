var mongodb = require("mongodb");
var actionsDao = require("./DAO/actionsDao")
var roomsDao = require("./DAO/roomsDao")
var typeActuor = require("./DAO/typeActuorDao")
var typeCaptor = require("./DAO/typeCaptorDao")
var logs = require("./DAO/logsDao")

async function connectToDatabase(){
    const client = new mongodb.MongoClient(process.env.MONGODB_URI);

    try{
        await client.connect();
        await actionsDao.injectDB(client);
        await typeActuor.injectDB(client);
        await typeCaptor.injectDB(client);
        await roomsDao.injectDB(client);
        await logs.injectDB(client);

        console.log("Connected to Database");
    } catch(e){
        console.error("Failed to connect to database : " + e)
        process.exit(1);
    }
}

module.exports = {
    connectToDatabase,
}