import { Typography, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from "axios";



function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    
    
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '80vh',
        flexDirection: 'column',
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card 
            variant='outlined'
            style = {{
                width: 400,
                height: "100%",
                padding: 20,
                marginTop: 30,
                
            }}
            >
                <TextField style={{
                    marginBottom: "10px",
                }} 
                variant={'outlined'}
                label={"Title"}
                fullWidth={true}
                onChange={(e)=>{
                    setTitle(e.target.value);
                    
                }}/>
                <TextField style={{
                    marginBottom: "10px",
                }} 
                variant={'outlined'}
                label={"Description"}
                fullWidth={true}
                onChange={(e)=>{
                    setDescription(e.target.value);
                    
                }}/>

                <TextField style={{
                    marginBottom: "10px",
                }} 
                variant={'outlined'}
                label={"Image Link"}
                fullWidth={true}
                onChange={(e)=>{
                    setImage(e.target.value);
                    
                }}/>

                <TextField style={{
                    marginBottom: "10px",
                }} 
                variant={'outlined'}
                label={"Price"}
                fullWidth={true}
                onChange={(e)=>{
                    setPrice(e.target.value);
                    
                }}/>
                <Button
                size={'large'}
                variant={'contained'}
                onClick={async ()=>{
                    await axios.post("http://localhost:3000/admin/courses", {
                        title: title,
                        description: description,
                        price: price,
                        imageLink: image,
                        published: true
                    }, {
                        headers:{
                            Authorization: "Bearer "+ localStorage.getItem("token")
                        }
                    })
                    alert("course created successfully");
                    window.location = "/addcourse"
                }}
                > Add Course</Button>
                
                
            </Card>
        </div>
    </div>
}

export default AddCourse;