const OpenAiController = require("../controllers/OpenAiController");
const DaoController = require("../controllers/DaoController");

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('Client connected !');

        socket.on('house-sensor-event', data => {
            OpenAIJSON(data, "update-room", socket)


        });

        socket.on('general-sensor-event', data => {
            OpenAIJSON(data, "update-actuator", socket) 
        })

        socket.on('socket-event', (data) => {

        })

        socket.on('disconnect', () => {
            console.log('Client disconnected !');
        });
    });
}

async function OpenAIJSON(data, event, socket){
    const actions = await DaoController.getListAllActions()
    // console.log(data)
     OpenAiController.getInstructionFromOpenAi(data, actions, (error, result, recommendation) => {
         if(error){
             console.log(error)
             socket.emit("error", error);
         } else {
           // console.log(result)
             if(result.length > 0){
                 if(recommendation){
                     socket.emit("recommendations-actions", recommendation)
                 }
                 socket.emit("logs", {input: data, output : result})

                 let actuators = [];
                 result.forEach(e => {
                     if(Object.keys(e).length > 0 ){
                         // for each notification we sent a notification event
                         if(e.notification){
                             socket.emit("house-notification", e);
                         }else{
                             // in the other case it's an actuators 
                             actuators.push(e)
                         }
                     }
                 });

                 if(actuators.length > 0){
                     let response = {name : data.name, actuators}
                     // console.log(response)
                     socket.emit(event, response)    
                 }
             }

         }

     })

}
