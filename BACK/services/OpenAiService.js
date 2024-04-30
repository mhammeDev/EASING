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



async function getInstructionFromOpenAI(content, actions, type_actuors, train_1) {

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

module.exports = {getInstructionFromOpenAI};