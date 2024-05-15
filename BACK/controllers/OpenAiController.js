const OpenAiService = require('../services/OpenAiService');

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

async function getRightReturn(result){
    if(result.lenght === 0) return result
    result.f

}


const train_1 = [
    {
        "cases": ["connected-light"],
        "examples":[
            {"role": "user", "content":`{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},
        
          {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "high_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "result" : "bulb_off"}]`},
      
 //         {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
   //       {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},   
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-tv"],
        "examples":[
            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": false}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Turn on the television", "result": "tv_on"}, {"action" : "Turn off the television", "result" : "tv_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"name": "connected-tv", "action": "Turn off the television", "result": "tv_off"}]`},      

            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-light"],
        "examples":[
            {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": "low_luminosity"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "result" : "bulb_off"}, {"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},      
        ]

    },
    {
        "cases": ["sensor-water-leak"],
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"sensor-water-leak", "value": true}], "actions": [{"action": "Water leak notification", "result" : "water-leak"}]}`},
      {"role": "assistant", "content": `[{"notification": "Water leak notification", "result" : "water-leak"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-water-leak", "value": false}], "actions": [{"action": "Water leak notification", "result" : "water-leak"}]}`},
      {"role": "assistant", "content": `{}`},
        ]

    },
    {
        "cases": ["security"],
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"security" :true},{"typeId":"sensor-presence", "value": true}], "actions": [{"action": "Intrusion notification", "result" : "intrusion"}]}`},
      {"role": "assistant", "content": `[{"notification": "Intrusion notification", "result" : "intrusion"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"security", "value":true},{"typeId":"sensor-presence", "value": false}], "actions": [{"action": "Intrusion notification", "result" : "intrusion"}]}`},
      {"role": "assistant", "content": `{}`},
        ]

    },
    {
        "cases": ["temperature"],
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": 20, "new_value": 16}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature drop notifaction", "action": "temp_down"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": 18, "new_value": 25}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature increase notifaction", "result" : "temp_up"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": 15, "new_value": 15}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `{}`},
  
        ]

    },
    {
        "cases": ["motorized-blind"],
        "examples":[                
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "high_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": [{"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Raise the blind", "result" : "blind_up"}]`},
        
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": [{"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "result" : "blind_down"}]`},
        
        ]

    },
    {
        "cases": ["connected-light", "security"],
        "examples":[
            {"role": "user", "content":`{"name": "", "sensors": [{"security":true},{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action": "Intrusion notification", "result" : "intrusion"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"notification": "Intrusion notification", "result":"intrusion"}]`},

           {"role": "user", "content":`{"name": "", "sensors": [{"security":true},{"typeId": "sensor-presence", "value": false}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action": "Intrusion notification", "result" : "intrusion"}]}`},
           {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_off"}]`},
        ]

    }
   /* {
        "cases": ["motorized-blind", "connected-light"],
        "examples":[                
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 420}], "actuators": [{"typeId": "connected-light"}, {"typeId": "motorized-blind"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"name": "motorized-blind", "action": "Lower the blind", "result": "blind_dpwn"}]`},      
        ]

    },*/
  ];


module.exports = {
    getInstructionFromOpenAi
}