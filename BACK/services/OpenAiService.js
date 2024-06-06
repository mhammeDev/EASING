const {AzureChatOpenAI} = require("@langchain/azure-openai");
const logsDao = require("../DAO/logsDao")


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



async function getInstructionFromOpenAI(content, actions, train_1) {

    try {
        let current_case = {
            "role": "user", 
            "content": `${JSON.stringify(content)}, actions: ${JSON.stringify(actions)}`
        };
        train_1.push(current_case)
        const prompt = await train_1.map(p => `${p.role}: ${p.content}`).join("\n");
        // const prompt = JSON.stringify(train_1)
        const res = await model.invoke(prompt)
        console.log(train_1)
        try{
          const JSONRes = JSON.parse(res.content)
          logsDao.insertHistory(prompt, JSONRes)
          return JSONRes;

        }catch (e) {
          console.log("erreur : " + e)
          return res

        }
    } catch (error) {
        console.error('Error invoking the AI model:', error);
        throw error;
    }
}

async function getInstructionFromChatOpenAI(content, train) {

  try {
      let current_case = {
          "role": "user", 
          "content": `${JSON.stringify(content)}`
      };
      train.push(current_case)
      const prompt = await train.map(p => `${p.role}: ${p.content}`).join("\n");
    //const prompt = JSON.stringify(train).replace(/\\/g, '');
      const res = await model.invoke(prompt)
      //console.log(prompt)
      try{
        const JSONRes = JSON.parse(res.content)
        logsDao.insertHistory(prompt, JSONRes)
        return JSONRes;

      }catch (e) {
        console.log("erreur : " + e)
        return res

      }
  } catch (error) {
      console.error('Error invoking the AI model:', error);
      throw error;
  }
}

async function getFilteredInstructions(content) {

  try {
      //const prompt = await train.map(p => `${p.role}: ${p.content}`).join("\n");
     const res = await model.invoke(JSON.stringify(content).replace(/\\/g, ''))
     //console.log(content)
      try{
      const JSONRes = JSON.parse(res.content)
      return JSONRes;

      }catch (e) {
        console.log("erreur : " + e)
        return res
      }
  } catch (error) {
      console.error('Error invoking the AI model:', error);
      throw error;
  }
}

async function getRecommendationFromOPenAI(content){
  try {
    let train_1 = [];
    train_1.push({"role": "system", "content": "Evaluate sensor data and deduce one or many logical action. Responses should be formatted as simple and short sentences for each actions, and logically derived from the input, see each sensor's value and be logic. "})
    let current_case = {
        "role": "user", 
        "content": `${JSON.stringify(content)}}`
    };
    train_1.push(current_case)
    const prompt = train_1.map(p => `${p.role}: ${p.content}`).join("\n");
    const res = await model.invoke(prompt)
    try{
      const JSONRes = JSON.stringify(res.content)
      return JSONRes;
    }catch (e) {
      console.log("erreur : " + e)
      return res

    }
} catch (error) {
    console.error('Error invoking the AI model:', error);
    throw error;
}
}

module.exports = {getInstructionFromOpenAI, getRecommendationFromOPenAI, getInstructionFromChatOpenAI,getFilteredInstructions};