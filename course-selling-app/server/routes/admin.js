// handles the route of the index.js of the parent folder
const express = require('express');
const {authenticateJwt, SECRET} = require("../middleware/auth");
const {User, Admin, Course} = require("../db")
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router =  express.Router();

router.post('/signup', async (req,res)=>{
    const {username, password} = req.body;
    const admin =  await Admin.findOne({username, password});
    if(admin){
        res.status(409).json({msg: " Admin already exists"});
    }
    else{
        const newAdmin = new Admin({username: username, password: password});
        await newAdmin.save();
        // await console.log(newAdmin);
        const token =  jwt.sign({username, role: "admin"}, SECRET, {expiresIn: '1h'});
        res.json({msg: " Admin created successfully", token});
    }
})

router.post('/login', async (req,res)=>{
    const {username, password}= req.body;
    const admin = await Admin.findOne({username,password});
    // console.log(admin)
    if(admin){
        const token = jwt.sign({username, role: "admin"}, SECRET, {expiresIn:'1h'});
        res.json({msg: "logged in successfully", token});
    }
    else{
        res.status(409).json({msg: "admin does not exists"});
    }
})

router.post('/courses', authenticateJwt, async( req, res)=>{
    const course = new Course(req.body);
    await course.save();
    res.json({msg: " course saved successfully", courseId: course.id});
})

router.put('/courses/:courseId', authenticateJwt, async( req, res)=>{
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if (course){
        res.json({msg: "course saved successfully"});
    }
    else{
        res.status(404).json({msg:"course not found"});
    }
})

router.get("/courses", authenticateJwt, async( req, res)=>{
    const courses = await Course.find({});
    
    res.json({courses});
})



router.get('/course/:courseId', authenticateJwt, async( req, res)=>{
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course});
})

router.get("/me", authenticateJwt, async (req,res)=>{
    const admin = await Admin.findOne({username: req.user.username});
    if(!admin){
        res.status(403).json({msg: " admin dosent exists"});
        return
    }
    // console.log(admin)
    res.json({
        username: admin.username
    })
})





module.exports = router;    