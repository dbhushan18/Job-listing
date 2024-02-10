const mongoose = require("mongoose")

const jobSchema  = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },

    logoUrl:{
        type: String,
        required: true
    },

    position:{
        type:String,
        required : true
    },

    salary:{
        type: String,
        required : true
    },

    jobtype:{
        type: String,
        required: true
    },

    remoteoffice:{
        type: String,
        required: true
    },

    location:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    about:{
        type: String,
        required: true
    },

    refUserId:{
        type: mongoose.Types.ObjectId,
        // required: true
    },

    skills:{
        type: [String],
        required :true
    },

    information:{
        type: String,
        required: true
    },

    createdAt:{
        type: String
    },

    // _id:{
    //     type: String,
    // }
})

module.exports = mongoose.model("job", jobSchema);