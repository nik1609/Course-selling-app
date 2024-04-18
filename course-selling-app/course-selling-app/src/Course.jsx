import {Card, Grid, Typography, TextField, Button} from "@mui/material";
import {useEffect, useState} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"


function Course(){
    let {courseId} = useParams();
    let [course, setCourse] = useState(null);
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/course/"+ courseId, {
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("token")
            }
        }).then(res =>{
            setCourse(res.data.course);
            
        })
    }, [])
    if(!course){
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            loading...
        </div>
    }
    return <div>
        <GreyTopper title ={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
             <CourseCard course = {course}/>
            </Grid>
        </Grid>
    </div>
}


function GreyTopper({title}){
    return <div style={{
        background: "#212121",
        height: 250,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250

    }}>
        <div style={{
            height: 250,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        }}>
            <div>
                <Typography style={{
                    color: "white",
                    fontWeight: 600,
                    variant: "h3",
                    textAlign: "center"
                }}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({course, setCourse}){
const  [title,setTitle] = useState(course.title)
const [description,setDescription] = useState(course.description)
const [image,setImage] = useState(course.imageLink)
const [price,setPrice] = useState(course.price)

return <div style={{
    display: 'flex',
    justifyContent: 'center',
}}>
    <Card variant={"outlined"} style={{
        maxWidth: 600,
        marginTop: 200,
    }}>
        <div style={{padding: 20}}>
            <Typography style={{
                marginBottom: 10,
            }}>Update Course details</Typography>
        <TextField 
        value={title}
        style={{
            marginBottom: 10,
        }} 
        onChange = {(e)=>{
            setTitle(e.target.value)
        }}
        variant={"outlined"}
        label={"Title"}
        fullWidth={true}
        />

        <TextField 
        value={description}
        style={{
            marginBottom: 10,
        }} 
        onChange = {(e)=>{
            setDescription(e.target.value)
        }}
        variant={"outlined"}
        label={"Description"}
        fullWidth={true}
        />

        <TextField 
        value={image}
        style={{
            marginBottom: 10,
        }} 
        onChange = {(e)=>{
            setImage(e.target.value)
        }}
        variant={"outlined"}
        label={"Image Link"}
        fullWidth={true}
        />

        <TextField 
        value={price}
        style={{
            marginBottom: 10,
        }} 
        onChange = {(e)=>{
            setPrice(e.target.value)
        }}
        variant={"outlined"}
        label={"Price"}
        fullWidth={true}
        />
        <Button
        variant="contained"
        onClick={async ()=>{
            axios.put("http://localhost:3000/admin/courses/" + course._id,{
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price: price
            },{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            })
            let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                imageLink: image,
                price: price,
            }
            setCourse(updatedCourse)
        }}>
            Update Course
        </Button>
        </div>
    </Card>
</div>

}




function CourseCard({course}){
    return <div 
    style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        width: '100%',
    }}>
        <Card style={{
            margin:10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
            
        }}>
            <img src={course.imageLink} style={{
                width: 350,
            }}></img>
            <div>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="subtitle2" style={{
                    color: 'gray'
                }}>{course.description}</Typography>
                <Typography variant="subtitle1">Rs {course.price}</Typography>
            </div>
        </Card>
    </div>
}
export default Course;