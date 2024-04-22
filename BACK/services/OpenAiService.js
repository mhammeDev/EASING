const {AzureChatOpenAI} = require("@langchain/azure-openai");

const model = new AzureChatOpenAI({
    azureOpenAIEndpoint: process.env.aiEndpoint,
    apiKey: process.env.apiKey,
    azureOpenAIApiDeploymentName: process.env.aiApiDeploymentName,
    model: process.env.model,
    /*prefixMessages: [
        {
            role: "system",
            content: "You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. "+
                "Your responses should be in JSON format, focusing on smart home management, "},
    ],*/
    maxTokens: 1200
});

async function getInstructionFromOpenAI(content, actions, type_actuors) {
    let prompt = [];
    const train_1 = [
        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','sensors': [{'typeId': 'security', 'value':false},{'typeId': 'sensor-presence','value' : 'true'},{'typeId': 'internal-light-sensor','value' : 10,'unit' : 'lux'}],'actuators':[{'typeId': 'connected-light'}]}, actions : [Turn on the light, Turn off the light, 'Intrusion notification']"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn on the light', 'explanations' : 'The internal light sensor's value indicates a poor brightness ( value of the internal-ligh-sensor < 200 lux) and the sensor presence indicate someone is in the room '}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','sensors': [{'typeId': 'security', 'value':true},{'typeId': 'sensor-presence','value' : 'true'},{'typeId': 'internal-light-sensor','value' : 210,'unit' : 'lux'}],'actuators':[{'typeId': 'connected-light'}]}, actions : [Turn on the light, Turn off the light, Intrusion notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn off the light', , 'explanations' : 'The sensor presence indicate someone is in the room but the internal light sensor's value indicates a good brightness ( value of the internal-ligh-sensor > 200 lux)'}," +
                "{'notification' : 'Intrusion notification'}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','actuators':[{'typeId': 'smart-connected-light', 'dependencies:[{'typeId: smart-socket, value:false}]},{'typeId': 'connected-tv', 'dependencies:[{'typeId: smart-socket, value:false}]} ]}, actions : [Turn on the light, Turn off the light, Turn on television, Turn off television]"},
        {"role": "assistant", "content": "[{'name': 'smart-connected-light', 'action': 'Turn on the light', 'explanations': 'The smart socket of the smart-connected-light is true (activate)'},{'name': 'connected-tv', 'action': 'Turn off the television', 'explanations': 'The smart socket of the smart-connected-tv is false (off), so the tv is turned off'}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','sensors': [{'typeId': 'security', 'value':false},{'typeId': internal-light-sensor','value' : 100,'unit' : 'lux'},{'typeId': 'sensor-presence','true': true },{'typeId': 'sensor-water-leak','value': false }],'actuators':[{'typeId': 'connected-light'},{'typeId': 'smart-connected-light', 'dependencies:[{'typeId: smart-socket, value:false}]}]}, actions : [Turn on the light, Turn off the light, Intrusion notification, Water leak notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn on the light', 'explanations':'poor brightness and a presence'}, {'name': 'smart-connected-light', 'action': 'Turn off the light', , 'explanations': 'The smart socket of the smart-connected-light is false, so the light is turned off'} ]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{'external-light-sensor': 1000 ,'unit':'lux'}],,'sensors':[{'typeId': 'security', 'value':false},{'typeId': 'sensor-presence', 'value':true}],'actuators':[{'typeId': 'motorized-blind'}]}, actions : ['Raise the blind', 'Lower the blind', 'Intrusion notification']"},
        {"role": "assistant", "content": "[{'name': 'motorized-blind', 'action': 'Lower the blind', 'explanations': 'The external light value is poor (external light value < 1900)}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},
        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{'external-light-sensor': 2000 ,'unit':'lux'}],'sensors':[{'typeId': 'security', 'value':true},{'typeId': 'sensor-presence', 'value':false}] ,'actuators':[{'typeId': 'motorized-blind'}]}, actions : ['Raise the blind', 'Lower the blind', 'Intrusion notification']"},
        {"role": "assistant", "content": "[{'name': 'motorized-blind', 'action': 'Raise the blind', 'explanations': 'The external light value is good (external light value > 1900)}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management. Decide the most logical single actions for each actuators (or notification) and if no actions is needed leave a blank (for notifications check always the sensor's value if there is nothing do send it leave a blank and do not invent value check always sensor's value)`},



        /*

     {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management (if sensors don't need action leave a blank, Do not send notifications unless all conditions for the notification are clearly met (e.g., do not notify about water leaks unless the sensor explicitly detects a leak etc))`},
        {"role": "user", "content": "data :{'nom': '''sensors': [{'typeId': 'water-leak-sensor','value' : false}], actions : [Water leak notification]"},
        {"role": "assistant", "content": "[{'notification': '', 'explanations' : 'No water leak detected so nothing}]"},

        {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management (if sensors don't need action leave a blank)`},
        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{security: true}],'sensors': ['typeId': 'sensor-presence','value': false },{'typeId': 'sensor-water-leak','value': true }], actions : [Intrusion notification, Water leak notification]"},
        {"role": "assistant", "content": "[{'notification': 'Water leak notification', 'explanations' : 'The water leak's sensors is true'}]"},





                {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management (if sensors don't need action leave a blank)`},
        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{security: false}],'sensors': [{'typeId': internal-light-sensor','value' : 80,'unit' : 'lux'},{'typeId': 'sensor-presence','value': true }],'actuators':[{'typeId': 'connected-light'}]}, actions : [Turn on the light, Turn off the light, Intrusion notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn on the light', 'explanations' : 'The internal light sensor's value indicates a poor brightness (80 (value of the internal-ligh-sensor) < 200 lux) and the sensor presence indicate someone is in the room '}]"},



                {"role":"system", 'content': `You are a smart home ecologic assistant designed to analyze sensor data and determine actions for actuators in a smart home. Your responses should be in JSON format, focusing on smart home management (if sensors don't need action leave a blank)`},
        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{security: false}],'sensors': [{'typeId': internal-light-sensor','value' : 110,'unit' : 'lux'},{'typeId': 'sensor-presence','value': true }],'actuators':[{'typeId': 'connected-light'}]}, actions : [Turn on the light, Turn off the light, Intrusion notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn off the light'}, {'notification':'', explanations : 'there is a presence, but the security is false, for a notification we need security === true and presence === true'}]"},

        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{security: true}],'sensors': [{'typeId': internal-light-sensor','value' : 10,'unit' : 'lux'},{'typeId': 'sensor-presence','false': true },{'typeId': 'sensor-water-leak','value': true }],'actuators':[{'typeId': 'connected-light'}]}, actions : [Turn on the light, Turn off the light, Intrusion notification, Water leak notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn off the light'}, {'notification': 'Water leak notification'}]"},

        {"role": "user", "content": "data :{'nom': '','actuators':[{'typeId': 'smart-connected-light', 'dependencies:[{'typeId: smart-socket, value:false}]},{'typeId': 'connected-tv', 'dependencies:[{'typeId: smart-socket, value:true}]} ]}, actions : [Turn on the light, Turn off the light, Turn on television, Turn off television]"},
        {"role": "assistant", "content": "[{'name': 'smart-connected-light', 'action': 'Turn on the light'},{'name': 'connected-tv', 'action': 'Turn on television'}]"},

        {"role": "user", "content": "data :{'nom': '','externals_sensors':[{security: false}],'sensors': [{'typeId': internal-light-sensor','value' : 100,'unit' : 'lux'},{'typeId': 'sensor-presence','true': true },{'typeId': 'sensor-water-leak','value': false }],'actuators':[{'typeId': 'connected-light'},{'typeId': 'smart-connected-light', 'dependencies:[{'typeId: smart-socket, value:false}]}]}, actions : [Turn on the light, Turn off the light, Intrusion notification, Water leak notification]"},
        {"role": "assistant", "content": "[{'name': 'connected-light', 'action': 'Turn on the light'}, {'name': 'connected-light', 'action': 'Turn off the light'} ]"}

      */
    ]
    try {
        let current_case = {"role": "user", "content": "data :"+ JSON.stringify(content)+ ",\n actions : " + JSON.stringify(actions)};
        train_1.push(current_case)
        const prompt = train_1.map(p => `${p.role}: ${p.content}`).join("\n");
        const res = await model.invoke(prompt)
        console.log(res.content)
       return res;
    } catch (error) {
        console.error('Error invoking the AI model:', error);
        throw error;
    }
}

module.exports = {getInstructionFromOpenAI};