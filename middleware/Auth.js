
const Auth=async(req,resp,next)=>{
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new Error("incorrect format")
    }
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,process.env.AccSecKey)
    req.user=decoded
    return next()
}


module.exports={
    Auth
}