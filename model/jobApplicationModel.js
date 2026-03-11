const mongoose=require('mongoose')

const jobApplicationSchema= new mongoose.Schema({
    jobId:{ type: mongoose.Schema.Types.ObjectId, ref:'Job', required: true },
    applicantId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    fullName:{type: String, required: true},
    email: {type: String, required: true},
    phone: {type:String, required: true },
    experience: {type: String, required: true},
    skills:{type: [String], required: true},
    education: { type: String},
    resume:{type: String, required: true},
    coverLetter:{type: String},
    status:{ type: String, enum:['pending', 'reviewed', 'accepted', 'rejected'], default:'pending'}


},{ timestamps: true }) 

jobApplicationSchema.index({jobId: 1, applicantId: 1},{unique: true})

module.exports= mongoose.model('JobApplication', jobApplicationSchema)