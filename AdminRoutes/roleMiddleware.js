

const verfiyAdmin=(req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({message:'access define:only admin can access this'})
    }
        next()
    }   

module.exports= {verfiyAdmin};