require("dotenv").config();
const express = require("express");
const {connectToDatabase} = require("./databaseConfig")
const DaoRouter = require("./router/DaoRouter");


const app = express();
const port = process.env.PORT || 3000;
var server = require("http").createServer(app);
var io = require("socket.io")(server)

app.use(express.json());

app.use("/db",DaoRouter)


connectToDatabase().then(() => {
    server.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
})


