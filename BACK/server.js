require("dotenv").config();
const express = require("express");
const socketEvents = require("./sockets/socketEvents");
const {connectToDatabase} = require("./databaseConfig")
const DaoRouter = require("./router/DaoRouter");
const UserRouter = require("./router/userRouter");
const path = require("path")

const cors = require("cors");

const app = express();
app.use(cors())

console.log("test")
console.log(process.env.PORT)


const port = process.env.PORT || 3000;
var server = require("http").createServer(app);
var io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

console.log("test2")


socketEvents(io);

console.log("test3")


app.use(express.json());

app.use("/api/db",DaoRouter)
app.use("/api/user",UserRouter)

const frontendDistPath = path.join(__dirname, '/dist/');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

console.log("test4")



connectToDatabase().then(() => {
    server.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
}).catch(e => {
    console.log(e)
})


