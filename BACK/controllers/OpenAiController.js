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
        let train_case = await getRightCase(content);
        const result = await OpenAiService.getInstructionFromOpenAI(content, new_actions, table, train_case);
        callback(null, result);
    } catch (error){
        callback('Failed to process the instruction request: ' + error.message)
    }
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
            {"role": "user", "content":`data : [{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 10}], "actuators": [{"typeId": "connected-light"}],"actions": ["Turn on the light", "Turn off the light"]}]`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on; the internal light sensor records 10 lux, which is LESS than the comfort lighting threshold of 210 lux (10 < 210), and a presence is detected (sensor presence is true), necessitating artificial lighting to ensure visibility and safety for the individual present."}]`},
        
          {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 250}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "explanations" : "Even if sensor presence is true, the internal light sensor indicates a light level of 250 lux, which greater than the threshold of 210 lux (250 > 210). This suggests there is enough natural light, and turning on the light is unnecessary, promoting energy conservation."}]`},
      
          {"role": "user", "content": `data : [{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 70}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}]`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on; the internal light sensor records 70 lux, which is less than the comfort lighting threshold of 210 lux (70 < 210), and a presence is detected (sensor presence is true), necessitating artificial lighting to ensure visibility and safety for the individual present."}]`},   
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
            {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": 100, "unit": "lux"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": ["Turn on the light", "Turn off the light"]}`},
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
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 5000}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Raise the blind", "explanations": "The blind is raised to allow more natural light into the room because the external light value 5000 lux is greater than the 1900 lux threshold (5000 > 1900 so blind is raised)."}]`},
        
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 1000}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "explanations": "The blind is lowered to make use of available artificial light because the external light value 1000 lux is less than the 1900 lux threshold (1000 < 1900 so blind is lowered)."}]`},
        
                    
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 400}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "explanations": "The blind is lowered to make use of available artificial light because the external light value 400 lux is less than the 1900 lux threshold (1000 < 1900 so blind is lowered)."}]`},
        
        ]

    },
    {
        "cases": ["motorized-blind", "connected-light"],
        "examples":[                
            {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 2500}], "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 420}], "actuators": [{"typeId": "connected-light"}, {"typeId": "motorized-blind"}], "actions": ["Turn on the light", "Turn off the light", "Lower the blind", "Raise the blind"]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on because the internal light sensor records 20 lux, which is below the comfort lighting threshold of 210 lux and there is someone in the room,  necessitating artificial lighting to ensure visibility and safety for the individual present.."}, {"name": "motorized-blind", "action": "Raise the blind", "explanations": "The blind is raised, allowing in natural light as the external light value 2500 lux is greater than the 1900 lux threshold (2500 > 1900 so blind is raised)"}]`},      
        ]

    },
      //{"role": "system", "content": "Evaluate sensor data and issue commands for actuators or notifications. Responses should be formatted as JSON ([{...},...]), be concise, and logically derived from the input."},
  ];

module.exports = {
    getInstructionFromOpenAi
}