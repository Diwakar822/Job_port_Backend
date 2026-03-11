// import { param } from '../router/authrouter';

const Job= require('../model/jobModel')

exports.createJob=async(req,res)=>{

    try {
        const {title,company,location,jobType,salary,description,skillsRequired}=req.body;

        const newJob= await Job.create({
            title,
            company,
            location,
            jobType,
            salary,
            description,
            skillsRequired,
            createdBy: req.user.id
        })


        res.status(201).json({message: " Job created successfully", job: newJob})
        
    } catch (error) {

        console.log(error.message)
        res.status(400).json({message: `something went worng ${error.message}` })
        
    }

}

exports.getalljobs=async(req,res)=>{

    try {

        const {search}=req.query;
        let filter={}

        if(search){
            filter={
                $or:[
                    {title:{ $regex: search, $options: 'i'}}
                ]
            }
        }
        
        const jobs= await Job.find(filter)
        .populate('createdBy')
        .sort({createdAt:-1}); // newest first

        res.status(200).json({message: 'Job fetched successfully', totaljobs: jobs.length, jobs})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: `error occurs ${error.message}`})
    }

}

exports.getJobById= async(req, res)=>{

    try {

        const {id}= req.params;
        
        const jobs= await Job.findById(id).populate('createdBy');
         if(!jobs){
           return res.status(400).json({message: 'Job not found'})
         }

         res.status(200).json({message: 'Got the Job', jobs})
    } catch (error) {
         res.status(400).json({ message: error.message });
    }

}

exports.updatejobs=async(req,res)=>{
     
    try {
        const {id}=req.params;
    const updates=req.body;

    const job= await Job.findById(id)

    if(!job){
       return res.status(400).json({message: 'Job Not found'})
    }

    // if(job.createdBy.toString()!== req.user.id){
    //    return res.status(404).json({message: 'only Admin can able to edit'})
    // }

    Object.assign(job, req.body)

    await job.save()

    res.status(200).json({message: 'job Updated successfully ', job })
    } catch (error) {
     
         res.status(400).json({message: `error updating job ${error.message}`})
    }
}

exports.Deletejob=async(req,res)=>{
    try {

        const {id}= req.params;
        // console.log('id is :', id)

        const job= await Job.findById(id)

        if(!job){
           return res.status(404).json({message: 'Job not found'})
        }

    //    if(job.createdBy.toString()!== req.user.id){
    //     res.status(404).json({message: 'only Admin can able to edit'})
    // }
        await job.deleteOne()

        return res.status(200).json({message: 'job deleted successfully'})
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: `error while deleting ${error.message}`})
    }
}