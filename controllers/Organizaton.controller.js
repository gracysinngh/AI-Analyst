const { User } = require("../models/Auth.models");
const { Organization } = require("./OrganizationSchema");

const OrganizationControllers=async(req,resp)=>{
    try{
        const{name,description}=req.body
        if(!name){
             return resp.status(400).json({
                success: false,
                message: "Organization name is required"
            });
        }
        const existingOrganizaiton=await Organization.findOne({name})
        if(existingOrganizaiton){
             return resp.status(409).json({
                success: false,
                message: "Organization already exists"
            });
        }
        const organization=await Organization.create({
            name,
            description
    })
        const user=await User.findById(req.user.id)
          if (!user) {
            return resp.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.organizationId=organization._id
        await user.save()
        return resp.json({
             success: true,
            message: "Organization created successfully",
            organization
        })
    }catch(err){
        return resp.status(500).json({
            success: false,
            message: err.message
        });
    }
}
const GetOrganization=async(req,resp)=>{
    try{
    const organization=await Organization.findById(req.organizationId)
     if (!organization) {
            return resp.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }
         return resp.status(200).json({
            success: true,
            organization
        });
    }catch(err){
         return resp.status(500).json({
            success: false,
            message: err.message
        });
    }
    

}
module.exports={
    OrganizationControllers,
    GetOrganization
}