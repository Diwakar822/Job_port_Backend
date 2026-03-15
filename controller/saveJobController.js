const SavedJob = require("../model/SavedJobmodel")


exports.saveJob = async(req,res)=>{
      try{

        const userId =req.user.id
        const jobId = req.params.jobId

        const alreadySaved  = await SavedJob.findOne({userId, jobId})

        if(alreadySaved){
            return res.status(400).json({message:'Job already saved'})
        }

        const saved = await SavedJob.create({userId, jobId})

        return res.status(200).json({message: "Job saved successfully", saved})

      }catch(error){
        console.error(error)
        res.status(400).json({message: error.message})

      }
} 


exports.getSavedJobs = async(req,res)=>{

    try {

        const userId =req.user.id
        const jobs = await SavedJob.find({userId}).populate("jobId")

        res.status(200).json(jobs)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
        
    }

}

exports.unsaveJob =async(req,res)=>{

    try {
          const userId = req.user.id
          const jobId =req.params.jobId;

          await SavedJob.findOneAndDelete({userId, jobId})

          res.status(200).json({message:"Job removed from saved list"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }

}