const { AzureChatOpenAI } = require("@langchain/azure-openai");

const model = new AzureChatOpenAI({
    azureOpenAIEndpoint : process.env.aiEndpoint,
    apiKey: process.env.apiKey,
    azureOpenAIApiDeploymentName: process.env.aiApiDeploymentName,
    model : process.env.model,
    prefixMessages: [
        {
            role : "system",
            content: "You are a helpful smart ecological home assistant. Analyze sensor and actuator data to provide specific action recommendations in JSON format for smart home management.",
        },
    ],
    maxTokens: 300
});

async function getInstructionFromOpenAI(content, actions) {

    //Analyze the following JSON data and determine the appropriate actions for each actuator, take also in consideration extern_captor and give most logic action. Output the results as a JSON object in the format '{" +
    //                 "actuator_type : recommended_action, actuator_type_2: recommended_action_2, ...}. " +
    //                 "These are the possible actions: "+JSON.stringify(actions) +
    //                 "Do not provide explanations or code, only the JSON output of recommended actions." + JSON.stringify(content));

        try {

            const res = await model.invoke(
                "Analyze the following JSON data and determine the appropriate actions for each actuator, take also in consideration extern_sensor and give most logic action. Output the results as a JSON object in the format '{" +
                "actuator_type : recommended_action, actuator_type_2: recommended_action_2, ...}. " +
                "These are the possible actions: "+JSON.stringify(actions) +
                "Do not provide explanations or code, only the JSON output of recommended actions." + JSON.stringify(content));
            console.log(res.content);
            return res;
        } catch (error) {
            console.error('Error invoking the AI model:', error);
            throw error;
        }
}

module.exports = {getInstructionFromOpenAI};