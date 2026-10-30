const ai = require("../config/ai")

const Reranking=async(query,ans)=>{
    const context=ans.map((res,index)=>`candidates ${index+1}  ${res.text}`)
    const result=await ai.models.generateContent({
        model:"gemini-3.6-flash",
                contents: `
You are an AI reranker.

User Query:
${query}

Candidates:
${context.join("\n")}

Task:
Evaluate each candidate against the user's query.

Give a score of:
1 → if the candidate directly and correctly answers the query
0 → if the candidate does not correctly match the query

Return ONLY valid JSON in this exact format:

{
  "scores": {
    "candidate_1": 1,
    "candidate_2": 0
  }
}

Do not provide explanations.
Do not add markdown.
`
    })
    return result
}

module.exports={
    Reranking
}