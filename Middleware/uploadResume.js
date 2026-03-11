// const { error } = require('console');
const multer=require('multer')
const path= require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb)=>{
        cb(null, 'uploads/resumes');
    },
    filename:(req, file, cb)=>{

        const uniqueSuffix =Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,uniqueSuffix+path.extname(file.originalname));

    }
})


const fileFilter=(req,file,cb)=>{
    const allowedTypes=['application/pdf'];
    if(allowedTypes.includes(file.mimetype)){
            cb(null,true)
    }else{
        cb(new error('only pdf can allowed'), false)
    }
}

const upload=multer({
    storage,
    fileFilter
})

module.exports=upload;