const ai = require("../config/ai")
const PDF = require("../models/pdf.models");
const { Reranking } = require("../utility/Reranking");
const { GenerateEmbedding } = require("./pdf.services")
const mongoose = require("mongoose");
const Retrieval=async(query,organizationId)=>{
    const enhancedQueryResponse=await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents: `
Rewrite the user's question into a clear and detailed search query
for retrieving relevant information from a document.

Do not answer the question.
Only return the improved search query.

User question:
${query}
`
    })
    const enhancedQuery = enhancedQueryResponse.text.trim();

console.log("ORIGINAL QUERY:", query);
console.log("ENHANCED QUERY:", enhancedQuery);
    const queryEmbedding=await GenerateEmbedding(enhancedQuery)
     
    const VectorSearch=await PDF.aggregate([
        {
            $vectorSearch:{
                index:"vector_index",
                path:"embedding",
                queryVector:queryEmbedding,
                numCandidates:50,
                limit:5,
                filter:{
                    organizationId:new mongoose.Types.ObjectId(organizationId)
                }
            }
        },{
            $project:{
                text:1,
                metadata:1,
                organizationId:1,
                score:{
                    $meta:"vectorSearchScore"
                }
            }
        }
    ])
    const scoreThreshold=0.70
    const filteredResult=VectorSearch.filter((res)=>res.score>=scoreThreshold)
    const reRankedResult=await Reranking(query,filteredResult)

    const context=reRankedResult.filter((res)=>res.score==1).map((res,index)=>`$${index+1} .${res.text}`).join("\n \n")
    console.log("VECTOR SEARCH RESULT:", VectorSearch);
console.log("CONTEXT:", context);
    const ans=await ai.models.generateContent({
        model:"gemini-3.6-flash",
         contents: `
You are a helpful AI assistant.

Answer the user's question using ONLY the information provided in the context.

CONTEXT:
${context}

USER QUESTION:
${query}

Instructions:
- If the answer is present in the context, answer it clearly.
- Do not use outside knowledge.
- If the answer is not present in the context, respond exactly:
"Could not find the relevant answer from this context."
`
    })
    return ans.text
}


module.exports=Retrieval