const {AzureChatOpenAI} = require("@langchain/azure-openai");

const model = new AzureChatOpenAI({
    azureOpenAIEndpoint: process.env.aiEndpoint,
    apiKey: process.env.apiKey,
    azureOpenAIApiDeploymentName: process.env.aiApiDeploymentName,
    model: process.env.model,
 prefixMessages: [
        {
          role: "system",
         content: `You are a smart home assistant specializing in managing sensor data to control actuators.`,
        }
    ],
    maxTokens: 1200
});


async function getInstructionFromOpenAI(content, actions, type_actuors) {

    try {
        let current_case = {
            "role": "user", 
            "content": `data: ${JSON.stringify(content)}, actions: ${JSON.stringify(actions)}`
        };
        train_1.push(current_case)
        const prompt = train_1.map(p => `${p.role}: ${p.content}`).join("\n");
        const res = await model.invoke(prompt)
        try{
            const JSONRes = JSON.parse(res.content)
            console.log(JSONRes)
            return JSONRes;

        }catch (e) {
            console.log("erreur : " + e)
            console.log(res.content)
            return res

        }
    } catch (error) {
        console.error('Error invoking the AI model:', error);
        throw error;
    }
}

const train_1 = [
    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 210}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}`},
    {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "explanations" : "The connected light is turned off because the internal light sensor reports 210 lux, which is greater than the 200 lux threshold. Presence is detected, but the high lux level indicates sufficient natural light, making artificial lighting unnecessary, thus conserving energy."}]`},


    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : [{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 10}], "actuators": [{"typeId": "connected-light"}], "actions": ["Turn on the light", "Turn off the light"]}]`},
    {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on; the internal light sensor records only 10 lux, substantially below the comfort lighting threshold of 200 lux, and presence is detected (sensor presence is true), necessitating artificial lighting to ensure visibility and safety for the individual present."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": false}]}], actions: ["Turn on the light", "Turn off the light", "Turn on television", "Turn off television"]}`},
    {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "explanations": "The smart socket of the smart-connected-light is true (activated), so the smart connected light is turned on."}, {"name": "connected-tv", "action": "Turn off the television", "explanations": "The smart socket of the smart-connected-tv is false (off), so the TV is turned off"}]`},
    
    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": 100, "unit": "lux"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": ["Turn on the light", "Turn off the light"]}`},
    {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "explanations": "The connected light is turned off because sensor presence is false, so nobody in the room."}, {"name": "smart-connected-light", "action": "Turn on the light", "explanations": "The smart socket of the smart-connected-light is true, so the smart connected light is turned on"}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 1000}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
    {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "explanations": "EXTERNAL light intensity of 1000 lux is less than the 1900 lux threshold, requiring the blinds to be lowered."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 2000}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
    {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Raise the blind", "explanations": "EXTERNAL light intensity of 2000 lux is greater than the 1900 lux threshold, necessitating the blinds to be raised."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-water-leak", "value": true}], "actions": ["Water leak notification"]}`},
    {"role": "assistant", "content": `[{"notification": "Water leak notification", "explanations": "A water leak notification is issued because the water leak sensor detected leakage, triggering immediate alerts to prevent potential damage and conserve water."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "sensors": [{"typeId": "sensor-water-leak", "value": false}], "actions": ["Water leak notification"]}`},
    {"role": "assistant", "content": "{}"},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 2500}], "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 80}], "actuators": [{"typeId": "connected-light"}, {"typeId": "motorized-blind"}], "actions": ["Turn on the light", "Turn off the light", "Lower the blind", "Raise the blind"]}`},
    {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "explanations": "The connected light is turned on because the internal light sensor records only 80 lux, substantially below the comfort lighting threshold of 200 luxand there is someone in the room."}, {"name": "motorized-blind", "action": "Raise the blind", "explanations": "EXTERNAL light intensity of 2500 lux is greater than the 1900 lux threshold, requiring the blinds to be raised."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."},
    {"role": "user", "content": `data : {"name": "", "externals_sensors": [{"external-light-sensor": 400}], "actuators": [{"typeId": "motorized-blind"}], "actions": ["Raise the blind", "Lower the blind"]}`},
    {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "explanations": "EXTERNAL light intensity of 400 lux is less than the 1900 lux threshold, requiring the blinds to be lowered."}]`},

    {"role": "system", "content": "Based on sensor inputs, issue the appropriate notifications or actuator commands (for each actuors if there is) in JSON format ([{...},...]). Ensure responses are concise, logical, and based on the provided sensor data."}
];

module.exports = {getInstructionFromOpenAI};