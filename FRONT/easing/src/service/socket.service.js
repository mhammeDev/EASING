import {io} from "socket.io-client"
const API_URL = "http://localhost:3000"

export function connectToSocket(){
    let socket = io(API_URL);

    socket.on("connect", () => {
        console.log("connected to the server with socket !")
    });

    socket.on("disconnect", () => {
        console.log("disconnected from the server with socket !")
    });

    return socket;
}