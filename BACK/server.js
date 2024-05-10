require("dotenv").config();
const express = require("express");
const socketEvents = require("./sockets/socketEvents");
const {connectToDatabase} = require("./databaseConfig")
const DaoRouter = require("./router/DaoRouter");
const cors = require("cors");



const app = express();
app.use(cors())

const port = process.env.PORT || 3000;
var server = require("http").createServer(app);
var io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


socketEvents(io);


app.use(express.json());
app.use("/db",DaoRouter)


connectToDatabase().then(() => {
    server.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
})


