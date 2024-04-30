const OpenAiService = require('../services/OpenAiService');

async function getInstructionFromOpenAi(content, actions, callback){
    let table = [];
    let new_actions = [];

    if(typeof content !== 'object'){
        callback("Invalid data.")
        return;
    }
    try{
        /* At the begining we sent all actuators dependecies to help gpt bu tit's useless
        if (content.actuators) {

            type_actuors.forEach(type => {
                if (content.actuators.some(actuator => type.id === actuator.typeId)) {
                    table.push(type);
                }
            });
        }*/
        new_actions = await getActionsList(actions, content);
        let train_case = await getRightCase(content);
        const result = await OpenAiService.getInstructionFromOpenAI(content, new_actions, train_case);
        callback(null, result);
    } catch (error){
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
                new_actions.push(a.action)
            }
        })
        return new_actions;
}

async function getRightCase(content) {
    let table = [];
    table.push({"role": "system", "content": "Evaluate sensor data and issue commands for actuators or notifications. Responses should be formatted as JSON ([{...},...]), be concise, and logically derived from the input."})

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

const train_1 = [
    {
        "cases": ["connected-light"],
        "examples":[
            {"role": "user", "content":`data : [{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": ["Turn on the light", "Turn off the light"]}]`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on; the internal light sensor records a low luminosity, and a presence is detected (sensor presence is true), necessitating artificial lighting to ensure visibility and safety for the individual present."}]`},
        
          {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "high_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "explanations" : "Even if sensor presence is true, the internal light sensor indicates a high_luminosity. This suggests there is enough natural light, and turning on the light is unnecessary, promoting energy conservation."}]`},
      
          {"role": "user", "content": `data : [{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}]`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on; the internal light sensor records a low luminosity, and a presence is detected (sensor presence is true), necessitating artificial lighting to ensure visibility and safety for the individual present."}]`},   
        ]

    },
    {
        "cases": ["smart-connected-light", "smart-tv"],
        "examples":[
            {"role": "user", "content": `data : {"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": false}]}], actions: ["Turn on the light", "Turn off the light", "Turn on the television", "Turn off the television"]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "explanations": "The smart socket of the smart-connected-light is true (activated), so the smart connected light is turned on."}, {"name": "connected-tv", "action": "Turn off the television", "explanations": "The smart socket of the smart-connected-tv is false (off), so the TV is turned off"}]`},      

            {"role": "user", "content": `data : {"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], actions: ["Turn on the light", "Turn off the light"]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "explanations": "The smart socket of the smart-connected-light is true (activated), so the smart connected light is turned on."}]`},
            
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-light"],
        "examples":[
            {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": "low_luminosity"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": ["Turn on the light", "Turn off the light"]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "explanations": "The connected light is turned off because sensor presence is false, so nobody in the room."}, {"name": "smart-connected-light", "action": "Turn on the light", "explanations": "The smart socket of the smart-connected-light is true, so the smart connected light is turned on"}]`},      
        ]

    },
    {
        "cases": ["sensor-water-leak"],
        "examples":[                
      {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId":"sensor-water-leak", "value": true}], "actions": ["Water leak notification"]}`},
      {"role": "assistant", "content": `[{"notification": "Water leak notification", "explanations": "A water leak notification is issued because the water leak sensor detected leakage, triggering immediate alerts to prevent potential damage and conserve water."}]`},
  
      {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-water-leak", "value": false}], "actions": ["Water leak notification"]}`},
      {"role": "assistant", "content": "{}"},
        ]

    },
    {
        "cases": ["temperature"],
        "examples":[                
      {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId":"temperature", "old_value": 20, "new_value": 16}], "actions": ["Temperature increase notifaction", "Temperature drop notifaction"]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature drop notifaction", "explanations": "A temperature drop notifaction is issued because the old temperature value is less than the new one."}]`},
  
      {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId":"temperature", "old_value": 18, "new_value": 25}], "actions": ["Temperature increase notifaction", "Temperature drop notifaction"]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature increase notifaction", "explanations": "A temperature increase notifaction is issued because the old temperature value is greater than the new one."}]`},
  
      {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId":"temperature", "old_value": 15, "new_value": 15}], "actions": ["Temperature increase notifaction", "Temperature drop notifaction"]}`},
      {"role": "assistant", "content": `{}`},
  
        ]

    },
    {
        "cases": ["motorized-blind"],
        "examples":[                
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": "high_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Raise the blind", "explanations": "The blind is raised to allow more natural light into the room because the external light value indicate a high luminosity."}]`},
        
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "explanations": "The blind is lowered to make use of available artificial light because the external light value indicate a low luminosity."}]`},
        
        ]

    },
    {
        "cases": ["motorized-blind", "connected-light"],
        "examples":[                
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 420}], "actuators": [{"typeId": "connected-light"}, {"typeId": "motorized-blind"}], "actions": ["Turn on the light", "Turn off the light", "Lower the blind", "Raise the blind"]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on because the internal light sensor records a low luminosity and there is someone in the room,  necessitating artificial lighting to ensure visibility and safety for the individual present.."}, {"name": "motorized-blind", "action": "Raise the blind", "explanations": "The blind is raised, allowing in natural light as the external light value indicate a high luminosity"}]`},      
        ]

    },
      //{"role": "system", "content": "Evaluate sensor data and issue commands for actuators or notifications. Responses should be formatted as JSON ([{...},...]), be concise, and logically derived from the input."},
  ];

module.exports = {
    getInstructionFromOpenAi
}