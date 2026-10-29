

const OrganizationMiddleware=(req,resp,next)=>{
    if(!req.user){
         return resp.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }
     if (!req.user.organizationId) {
        return resp.status(403).json({
            success: false,
            message: "User is not associated with any organization"
        });
    }
    req.organizationId=req.user.organizationId;
    next()
}

module.exports={
    OrganizationMiddleware
}