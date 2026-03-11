const JobApplication=require('../model/jobApplicationModel')
const Job=require('../model/jobModel');
const jobApplicationModel = require('../model/jobApplicationModel');

exports.applyJob=async(req,res)=>{
try {

    const {jobId,fullName,email,phone,experience,skills,education,coverLetter }=req.body;

    const job=await Job.findById(jobId)

    if(!job){
       return res.status(404).json({message: 'Job not found'})
    }

    const alreadyApplied=await JobApplication.findOne({jobId, applicantId: req.user.id})

    if(alreadyApplied){
      return  res.status(400).json({message: 'You Already applied for this job'})
    }

    //resume file path
    
    const resumePath = req.file ? req.file.path : null;
    if(!resumePath){
       return res.status(401).json({message: 'Resume file is required'})
    }

    const parsedSkills = Array.isArray(skills)
    ? skills
    : skills.split(',').map(val=>val.trim())

    const newApplication = await JobApplication.create({
            
        jobId,
        applicantId: req.user.id,
        fullName,
        email,
        phone,
        experience,
        skills: parsedSkills,
        education,
        coverLetter,
        resume: resumePath

    })
    res.status(200).json({message: 'Job Applied successfully', application:newApplication})

} catch (error) {
    console.log(error.message)
    res.status(400).json({message: `Error throwed: ${error.message} `})
}
}

exports.getAllApplication=async(req,res)=>{

    try {
        if(req.user.role !== 'admin'){
            res.status(400).json({message: "Only Admin can access this "})
        }
        const applications = await JobApplication.find()
        .populate('jobId', 'title company location jobType salary')
        .populate('applicantId', 'name email')
        .sort({createdAt: -1 })
        const totalcount =applications.length;
        res.status(200).json({message: 'Data fetched successfully', Applications: applications, total:{totalcount}})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:`Error, ${error}`})
    }

}

exports.getMyApplications=async(req,res)=>{
    try {
        const applications  = await JobApplication.find({
            applicantId: req.user.id
        }).populate('jobId').sort({createdAt: -1 })

        res.status(200).json({total: applications.length, applications})

        
    } catch (error) {
        res.status(400).json({message:`error${error}`})
    }
}

exports.getMyApplicationsById=async(req, res)=>{
     
    try {
       const {id}= req.params;

       const ApplicationsId= await JobApplication.findById(id).populate('jobId')

       if(!ApplicationsId){
           return res.status(400).json({message: 'Selected Job Not Found!'})
       }

       res.status(200).json({message:' Getting Job Successfully', appliedJob: ApplicationsId})
        
    } catch (error) {
        res.status(400).json({message:`error accours ${error}`})
        console.log('gettinf error', error)
    }
}