const OpenAiService = require('../services/OpenAiService');
const {train_1} = require("../databases/train_case")

async function getInstructionFromOpenAi(content, actions, callback){
    let table = [];
    let new_actions = [];

    if(typeof content !== 'object'){
        callback("Invalid data.")
        return;
    }
    try{
        new_actions = await getActionsList(actions, content);
        let train_case = await getRightCase(content);
        const result = await OpenAiService.getInstructionFromOpenAI(content, new_actions, train_case);
        const recommendation = await OpenAiService.getRecommendationFromOPenAI(content)
       callback(null, result, recommendation);
    } catch (error){
       callback('Failed to process the instruction request: ' + error.message)
    }
}

async function getActionFromPromptWithOpenAI(content, action, callback){
    let table = [];

    try{

    }catch (error){
        callback('Failed to process the instruction request: ' + error.message)


    }
}

async function getActionsList(actions, content){
    let new_actions = [];
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
    getInstructionFromOpenAi
}