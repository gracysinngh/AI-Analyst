const ChunkText=(text,textSize,overlap)=>{
    const res=[]
    for(let i=0;i<text.length;i+=textSize-overlap){
        const ans=text.slice(i,i+textSize)
        res.push(ans)
    }
    return res
}


const ChunkTextByWords=(text,textSize,overlap)=>{
    const words=text.trim().split(/\s+/)
    const res=[]
    for(let i=0;i<words.length;i+=textSize-overlap){
        const ans=words.slice(i,i+textSize).join("\n")
        res.push(ans)
    }
    return res
}

module.exports={
        ChunkText,
        ChunkTextByWords
}