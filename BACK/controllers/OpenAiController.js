const OpenAiService = require('../services/OpenAiService');
const {train_1, train_2} = require("../databases/train_case");

// This function is when a socket is emit from the map
async function getInstructionFromOpenAi(content, actions, callback){
    let table = [];
    let new_actions = [];

    if(typeof content !== 'object'){
        callback("Invalid data.")
        return;
    }
    try{
        // We get all actions and case filtered and we sent to our service
        new_actions = await getActionsList(actions, content);
        // same for the train case
        let train_case = await getRightCase(content);
        const result = await OpenAiService.getInstructionFromOpenAI(content, new_actions, train_case);
        const recommendation = await OpenAiService.getRecommendationFromOPenAI(content)
       callback(null, result, recommendation);
    } catch (error){
       callback('Failed to process the instruction request: ' + error.message)
    }
}

async function getActionFromPromptWithOpenAI(content, rooms,action, callback){
    let table = [];
    let filteredRoom = [];
    let filteredActions = [];
    try{
        // at first we filter action's value and only rooms who we uses it
        filteredRoom.push({
            "role": "system",
            "content": `Given a JSON table, analyze the request to return only the room mentioned (filter only by the room's exact name field in the request, without considering actions or actuators). If the room doesn't exist in the provided table, include it as a blank object ({}). Return responses in JSON format including only the mentionned rooms with actuators ({response: ..., content: [{...}, ...]}, be logic and follow the instruction to give the right result).`
        })  

          filteredRoom.push({request : content});
          filteredRoom.push({rooms: JSON.stringify(rooms).replace(/\\/g, '')});
          const filteredRequest = await OpenAiService.getFilteredInstructions(filteredRoom)

          filteredActions.push({
            "role": "system",
            "content": `Given a JSON table, analyze the request to return only the actions mentioned (filter only by the action name field in the request, without considering actuators). If the action doesn't exist in the provided table, include it as a blank object ({}). Return responses in JSON format including only the mentionned actions({actions: [{...}, ...]}, be logic and follow the instruction to give the right result).`
        })  
        filteredActions.push({request : content});

        filteredActions.push({actions: JSON.stringify(action).replace(/\\/g, '')});
        const filteredAction = await OpenAiService.getFilteredInstructions(filteredActions)

          table.push({
            "role": "system",
            "content": "Evaluate the request, deduce commands for actuators based on the rooms table and the actions. If there is no actuator name specified for a particular room, assume the actuator name is the same as the room name, if there isnt just answer {'response': 'not this actuator in the room'}}. Responses should be formatted as JSON ([{...},...]), be concise, and logically derived from the input."
          });
          
        table.push({request : content});
        table.push({rooms: filteredRequest});
        table.push({actions : filteredAction})
        
       const result = await OpenAiService.getInstructionFromChatOpenAI(table, train_2)
        callback(null, result);

    }catch (error){
        callback('Failed to process the instruction request: ' + error.message)


    }
}

async function getActionsList(actions, content){
    let new_actions = [];
    // This allow us to get only the usefull action to reduce the prompt
    actions.forEach(a => {
        let state = false;
        // at first we took the action linked with present actuators
           if(a.actuators && content.actuators){
               a.actuators.forEach(s => {
                   if(content.actuators.some(ax => ax.typeId === s)){
                       state = true
                   }
               })
           }

           // same for sensors 
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
                new_actions.push({action : a.action, result : a.result})
            }
        })
        return new_actions;
}

async function getRightCase(content) {
    let table = [];
    table.push({"role": "system", "content": "Evaluate sensor data and deduce commands for actuators or notifications. Responses should be formatted as JSON ([{...},...]), be concise, and logically derived from the input. "})

    // Check and process sensor data if provided
    if (content.sensors) {
        train_1.forEach(group => {
            // we check the group's name 
            group.cases.forEach(caseType => {
                if (content.sensors.some(sensor => sensor.typeId === caseType)) {
                    //if there is a sensor of content in the exemples cases we add it
                    group.examples.forEach(example => {
                        if (!table.includes(example)) { // Check for duplicates
                            table.push(example);
                        }
                    });
                }
            });
        });
    }

    // The same with the actuators
    if (content.actuators) {
        train_1.forEach(group => {
            group.cases.forEach(caseType => {
                if (content.actuators.some(actuator => actuator.typeId === caseType)) {
                    group.examples.forEach(example => {
                        if (!table.includes(example)) { // Check for duplicates
                            table.push(example);
                        }
                    });
                }
            });
        });
    }
    return table; 
}


module.exports = {
    getInstructionFromOpenAi,
getActionFromPromptWithOpenAI

}