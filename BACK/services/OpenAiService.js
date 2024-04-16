import {AzureOpenAI} from "@langchain/azure-openai";

const model = new AzureOpenAI({
    azureOpenAIEndpoint : process.env.aiEndpoint,
    apiKey: process.env.apiKey,
    azureOpenAIApiDeploymentName: process.env.aiApiDeploymentName,
    model : process.env.model,
    prefixMessages: [
        {
            role : "system",
            content: "You are a helpful smart home assistant"
        },
    ],
    maxTokens: 100
});

async function getInstructionFromOpenAI(content){
    let request = "I will provide a JSON object detailing each room's sensors and actuators, for a smart home sytem."+
        "Process the sensor data to determine actions for the actuators, outputting results as 'sensor_type: action'.";
    request += "\nHere the JSON object : "+content;

    const res = await model.invoke(
        request
    )

    console.log(res)
    return res;
}

module.exports = getInstructionFromOpenAI;