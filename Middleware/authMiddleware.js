const jwt=require('jsonwebtoken')

const authmiddleware=async(req,res,next)=>{

    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(400).json({message:"token not provided"})
    }
    try {

        const decoded= jwt.verify(token, 'apple')
        req.user=decoded
        next()
        
    } catch (error) {
        return res.status(500).json({message:'Invalid token'})
    }

}
module.exports= authmiddleware