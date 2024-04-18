const express = require('express');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const mongoose = require('mongoose');

// should handle the routes and database connections properly

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.get("/", (req, res)=> {
    res.json({msg: "welcome to the backend of the course-selling-app"});
})

//  connect to MongoDB
mongoose.connect('mongodb+srv://nikhil76503:44170710@cluster0.yeirotb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses"});

app.listen(3000, ()=>{
    console.log("server running on port 3000")
});
