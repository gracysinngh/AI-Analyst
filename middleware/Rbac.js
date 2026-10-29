const Rbac=(...roles)=>{
    return (req,resp,next)=>{
        if(!roles.includes(req.user.role)){
            return resp.json({
                success:false,
                message:"you dont have permission to access this page or this functionality"
            })
        }else{
            return next()
        }
    }
}


module.exports={
    Rbac
}