const ai = require("../config/ai")

const GenerateEmbedding=async(text)=>{
    const ans=await ai.models.embedContent({
        model:"gemini-embedding-001",
        contents:text
    })
    return ans.embeddings[0].values
}


module.exports={
    GenerateEmbedding
}