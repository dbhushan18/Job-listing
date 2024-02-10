const express = require("express")
const router = express.Router();
const job = require("../models/job")
const verifyJwt = require("../Middleware/authMiddleware")
const mongoose = require("mongoose")

router.post("/jobs", verifyJwt, async (req, res) => {
    try {
        const { companyName, description, logoUrl, position, jobtype, salary, remoteoffice, location, about, information, skills, createdAt, duration  } = req.body;
        if (!companyName || !description || !logoUrl || !jobtype || !salary || !remoteoffice || !location || !about || !information  || !position || !skills ) {
            return res.status(400).json({ message: "bad request" });
        }
        const jobDetail = new job({
            companyName,
            description,
            logoUrl,
            jobtype,
            position,
            salary,
            duration,
            remoteoffice,
            location,
            about,
            information,
            skills,
            refUserId: req.body.userId,
            createdAt
        })
        await jobDetail.save();
        return res.status(200).json({ message: "Job details added successfully!!" });
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "Something went wrong" })
    }
})

router.put("/edit/:Id", verifyJwt, async (req, res) => {
    try {
        const { companyName, description, logoUrl, jobtype, salary, remoteoffice, location, about, information, skills, position, duration } = req.body;
        const jobId = req.params.Id;

        if (!companyName || !description || !logoUrl || !position || !jobtype || !salary || !remoteoffice || !location || !about || !information || !skills) {
            return res.status(400).json({ message: "bad request" });
        }
        await job.updateOne(
            
            { _id: jobId },
            {
                $set: {
                    companyName,
                    description,
                    logoUrl,
                    jobtype,
                    position,
                    salary,
                    duration,
                    remoteoffice,
                    location,
                    about,
                    information,
                    skills,
                }
            }
        )
        return res.status(200).json({ message: "Job details Updated successfully!!" });
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "Something went wrong" })
    }
})

router.get("/job-details/:jobId", async (req, res) => {
    try {
        const jobId = req.params.jobId;
        if (!jobId) {
            return res.status(400).json({ message: "bad request" });
        }
        const jobDetails = await job.findById(jobId);

        res.json({ data: jobDetails });
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "Something went wrong" })
    }
})

router.get("/all", async (req, res) => {
    try {
        const position = req.query.position || "";
        const skills = req.query.skills;

        let filterSkills = skills?.split(",");

        let filter = {};

        if (filterSkills) {
            filter = { skills: { $in: [...filterSkills] } };
        }

        const joblist = await job.find(
            {
                position: { $regex: position, $options: "i" },
                ...filter
            }
        )

        // { companyName:1 });
        res.json({ data: joblist });
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "Something went wrong" })
    }
})

module.exports = router;

