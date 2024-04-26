const OpenAiService = require('../services/OpenAiService');

async function getInstructionFromOpenAi(content, actions, type_actuors, callback){
    let table = [];
    let new_actions = [];

    if(typeof content !== 'object'){
        callback("Invalid data.")
        return;
    }
    try{
        if (content.actuators) {

            type_actuors.forEach(type => {
                if (content.actuators.some(actuator => type.id === actuator.typeId)) {
                    table.push(type);
                }
            });
        }

       actions.forEach(a => {
        let state = false;
           if(a.actuators && content.actuators){
               a.actuators.forEach(s => {
                   if(content.actuators.some(ax => ax.typeId === s)){
                       state = true
                   }
               })
           }

           else if(a.sensors && content.sensors){
                   a.sensors.forEach(s => {
                       if(content.sensors.some(ax => ax.typeId === s)){
                           state = true
                       } else {
                        state = false
                    }

                   })
           }

            if(state){
                new_actions.push(a.action)
            }
        })
        const result = await OpenAiService.getInstructionFromOpenAI(content, new_actions, table);
        callback(null, result);
    } catch (error){
        callback('Failed to process the instruction request: ' + error.message)
    }
}

module.exports = {
    getInstructionFromOpenAi
}