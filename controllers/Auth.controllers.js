const ServiceData=require('../services/Auth.service')

const signup=async(req,resp)=>{
    const ans=await ServiceData.Signup(req.body.email,req.body)
    resp.json({
        success:true,
        data:ans
    })
}
const login=async(req,resp)=>{
    const data=await ServiceData.Login(req.body.email,req.body.password)
    resp.json({
        success:true,
        ans:data
    })
}
const Forgot=async(req,resp)=>{
    const data=await ServiceData.forgot(req.body.email)
    resp.json({
        success:true,
        ans:data
    })
}

const res=async(req,resp)=>{
    const ans=await ServiceData.Reset(req.body.newPassword,req.params.token)
    resp.json({
        success:true,
        ans:ans
    })
}

module.exports={
    signup,
    login,
    Forgot,
    res
}