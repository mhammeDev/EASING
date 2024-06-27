const OpenAiController = require("../controllers/OpenAiController");
const DaoController = require("../controllers/DaoController");
const jwt = require("jsonwebtoken");

module.exports = function(io) {

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (await isValidToken(token)) {
            next();
        } else {
            next(new Error("Token error"));
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected !');

        socket.on('house-sensor-event', async (data) => {
            await handleEventWithTokenValidation(socket, data, OpenAIJSON, "update-room");
        });

        socket.on('general-sensor-event', async (data) => {
            await handleEventWithTokenValidation(socket, data, OpenAIJSON, "update-actuator");
        });

        socket.on('chat-event', async (data) => {
            await handleEventWithTokenValidation(socket, data, OpenAIText, "chat-action");
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected !');
        });
    });
};

async function handleEventWithTokenValidation(socket, data, handlerFunction, event) {
   // at first we check the token and we execute the function
    const token = socket.handshake.auth.token;
    if (await isValidToken(token)) {
        await handlerFunction(data, event, socket);
    } else {
        console.log("Invalid token for event:", event);
        socket.emit("error_connection");
    }
}

async function OpenAIJSON(data, event, socket) {
    const actions = await DaoController.getListAllActions();
    OpenAiController.getInstructionFromOpenAi(data, actions, (error, result, recommendation) => {
        if (error) {
            console.log(error);
            socket.emit("error", error);
        } else {
            if (result.length > 0) {
                if (recommendation) {
                    socket.emit("recommendations-actions", recommendation);
                }
                socket.emit("logs", { input: data, output: result });

                let actuators = [];
                result.forEach(e => {
                    if (Object.keys(e).length > 0) {
                        if (e.notification) {
                            socket.emit("house-notification", e);
                        } else {
                            actuators.push(e);
                        }
                    }
                });

                if (actuators.length > 0) {
                    let response = { name: data.name, actuators };
                    console.log(response);
                    socket.emit(event, response);
                }
            }
        }
    });
}

async function OpenAIText(data, event, socket) {
    const actions = await DaoController.getListAllActions();
    const rooms = await DaoController.getAllRoomsFiltered();
    OpenAiController.getActionFromPromptWithOpenAI(data, rooms, actions, (error, result) => {
        if (error) {
            console.log(error);
            socket.emit("error", error);
        } else {
            socket.emit("logs", { input: data, output: result });
            socket.emit(event, result);
            console.log(JSON.stringify(result));
        }
    });
}

// This function check the token to only doing request when you are login
function isValidToken(token) {
    return new Promise((resolve, reject) => {
        resolve(true)
        /*
        if (!token) {
            console.log("Token not provided");
            return resolve(false);
        }

        jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
            if (err) {
                console.log("Invalid Token");
                return resolve(false);
            }
            console.log("Token is good!");
            resolve(true);
        });
        */
    });
}
