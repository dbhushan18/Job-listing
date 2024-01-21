const express = require("express")
const app = express();
const mongoose = require("mongoose")
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to the DB!!");
}).catch(()=>{
    console.log("Error connecting to the DB!")
})

app.use(express.json());

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

const user =require("./route/auth")
app.use("/register", user);

port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`🔥🔥 app is connected to the port ${port}🔥🔥`)
})