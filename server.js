const express = require("express")
const app = express();
const mongoose = require("mongoose")
const authRoute =require("./route/auth")
const jobRoute = require("./route/jobs")
const cors = require("cors")

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to the DB!!");
}).catch(()=>{
    console.log("Error connecting to the DB!")
})

app.use(express.json());
app.use(cors())

app.get('/',(req, res)=>{
    res.json({message : "this is home route"})
})
app.get('/health', (req, res) => {
    // console.log("you are in the Health API")
    res.json({
        service: "Job listing server",
        status: "Active",
        time : new Date()
})
})

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", jobRoute);

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`🔥🔥 app is connected to the port ${port}🔥🔥`)
})