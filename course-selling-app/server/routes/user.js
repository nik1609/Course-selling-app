// handles the route of the index.js of the parent folder

const express = require('express');
const {authenticateJwt, SECRET} = require("../middleware/auth");
const {User, Admin, Course} = require("../db")
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
router.post('/signup', async (req,res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(user){
        res.status(403).json({msg: " User already exists"})
    }
    else{
        const newUser = new User({username, password});
        await newUser.save();
        const token =  jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.json({msg: " user created successfully", token});
    }
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.headers;
    const user = await User.findOne({username});
    if(user){
        const token =  jwt.sign({username, role: 'user'}, SECRET, {expiresIn: '1h'});
        res.json({msg: " user logged in successfully", token});
    }
    else{
        res.status(403).json({msg: " user does not exists"})
    }
})

router.get('/courses', authenticateJwt, async (req,res)=>{
    const courses =  await Course.find({published: true});
    res.json({courses});
})

router.post('/courses/:courseId', authenticateJwt, async( req,res)=>{
    const course = await Course.findById(req.params.courseId);
    if(course){
        // if the course is found find the user and flag the purchased courses with the course id
        const user = await User.findOne({username: req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save();
            res.status(200).json({msg: "Course purchased successfully"});
        }
        else{
            res.status(403).json({'msg': 'User not found'});
        }
    }
    else{
        res.status(404).json({msg: "course not found"});
    }
})

router.get('/purchasedCourses', authenticateJwt, async(req,res)=>{
    const user = await User.findOne({username: req.user.username}).populate('purchasedCourses');
    if(user){
        res.status(200).json({
            purchasedCourses: user.purchasedCourses || []
        })
    }
    else{
        res.status(404).json({msg: 'User not found'});
    }
})
module.exports = router;