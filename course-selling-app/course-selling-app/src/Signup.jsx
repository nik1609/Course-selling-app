import { Typography, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from "axios";

function Signup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div>
        <div style ={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 150,
            marginBottom: 10

        }}> 
            <Typography variant='h6'>
                Welcome To Coursera
            </Typography>
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'center',

        }}>
            <Card variant={"outlined"} style={{
                width: 400,
                padding: 20,
            }}>
                <TextField  
                label="username" 
                variant="outlined"
                fullWidth={true}
                onChange = {(e)=>{
                    setUsername(e.target.value);
                }}
                />
                <br/>
                <br/>
                <TextField
                onChange = {(e)=>{
                    setPassword(e.target.value);
                    // console.log(password)
                }}
                fullWidth={true}
                label="Password" 
                variant="outlined"
                type = {"password"}
                />
                <br/>
                <br/>

                <Button 
                variant="outlined"
                size = {"large"}
                onClick = {
                    async ()=>{
                        try{
                            const response = await axios.post("https://course-selling-app-coursera-4pjz.vercel.app/admin/signup", {
                                username: username,
                                password: password
                            })
                            localStorage.setItem("token", response.data.token);
                            window.location ="/"
                        }
                        catch (error){
                            // console.log(error.response)
                            if (error.response && error.response.status === 409) {
                                alert("Signup failed: Username already exists.");
                            } else {
                                alert("Signup failed: " + (error.response ? error.response.data.msg : "Unknown error"));
                            }
                        }

                    }
                }
                > signup</Button>

            </Card>
        </div>




    </div>
}

export default Signup;
