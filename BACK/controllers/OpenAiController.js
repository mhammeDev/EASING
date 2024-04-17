const OpenAiService = require('../services/OpenAiService');

async function getInstructionFromOpenAi(content, actions, callback){
    if(typeof content !== 'object'){
        callback("Invalid data.")
        return;
    }
    try{
        const result = await OpenAiService.getInstructionFromOpenAI(content, actions);
        callback(null, result);
    } catch (error){
        callback('Failed to process the instruction request: ' + error.message)
    }
}

module.exports = {
    getInstructionFromOpenAi
}