const OpenAiController = require("../controllers/OpenAiController");
const DaoController = require("../controllers/DaoController");

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('Client connected !');

        socket.on('house-sensor-event', async (data) => {
            const actions = await DaoController.getListAllActions()
            const type_actuors = await DaoController.getListAllActuorsDependecies()
            OpenAiController.getInstructionFromOpenAi(data, actions, type_actuors, (error, result) => {
                if(error){
                    socket.emit("error", error);
                } else {
                    socket.emit("update", result);
                }

            })
        });

        socket.on('external-sensor-event', (data) => {
            console.log('Evenement personnalisé externe reçu :', data)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected !');
        });
    });
}
