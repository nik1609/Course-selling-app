import { Button, Card, Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'


function Courses(){

    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        fetch("https://course-selling-app-coursera-4pjz.vercel.app/admin/courses", {
            method: "GET",
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        }).then((res)=>{
            res.json().then((data)=>{
                setCourses(data.courses);
            })
        })
    },[])

    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }}>
        {courses.map(course=>{
            return <Course course = {course}/>
        })}
        
    </div>
}

export function Course({course}){
    const navigate = useNavigate();
    return <Card 
            variant= {"outlined"} 
            style={{
                width: 300,
                minHeight: 200,
                paddin: 20,
                margin: 10
            }}>
                <Typography textAlign={"center"} variant={'h6'}>{course.title}</Typography>
                <Typography textAlign={"center"} variant={'subtitle1'}>{course.description}</Typography>
                <img src= {course.imageLink} style={{
                    width: 300,
                }} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 10 
                    
                }}>
                    <Button
                    variant={"contained"}
                    size={"large"}
                    
                    onClick={()=>{
                        // console.log("/course/"+ course._id)
                        navigate("/course/"+ course._id)
                    }}
                    >Edit</Button>
                </div>
            </Card>
}
export default Courses;
