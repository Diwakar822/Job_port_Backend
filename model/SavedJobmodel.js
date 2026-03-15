const mongoose = require("mongoose")


const savedJobSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", require: true},
    jobId:{type: mongoose.Schema.Types.ObjectId, ref:"Job", require:true}
})

module.exports = mongoose.model("SavedJob", savedJobSchema)