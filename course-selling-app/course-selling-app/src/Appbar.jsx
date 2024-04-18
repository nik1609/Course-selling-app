    import {Typography} from "@mui/material";
    import Button from "@mui/material/Button";
    import {useEffect, useState} from "react";
    import { useNavigate } from "react-router-dom";

    function Appbar(){
        const navigate = useNavigate()
        const [userEmail, setUserEmail] = useState(null)

        useEffect(()=>{
            fetch("http://localhost:3000/admin/me" , {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem("token") 
                }
            }).then((response)=>{
                response.json().then((data)=>{
                    if(data.username){
                        setUserEmail(data.username);
                    }
                })
            })
        },[])
        
        if(userEmail){
            return <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 4,
                zIndex: 1
            }}>
                <div>
                    <Typography variant={"h6"}>
                        Coursera
                    </Typography>
                </div>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{
                        marginRight: 10
                    }}>
                        <Button 
                        variant={"contained"}
                        onClick = {
                            ()=>{
                                navigate("/addcourse")
                            }
                        }
                        >Add Course</Button>
                    </div>
                    <div  style={{
                        marginRight: 10
                    }}>
                        <Button
                        variant={"contained"}
                        onClick={
                            ()=>{
                                navigate("/courses")
                            }
                        }
                        >Courses</Button>
                    </div>
                    <Button
                        variant={"contained"}
                        onClick={
                            ()=>{
                                localStorage.setItem("token", null);
                                window.location = "/"
                            }
                        }
                        >Logout</Button>
                </div>
            </div>
        }
        else{
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div>
                <Typography variant={"h6"}>
                    Coursera
                </Typography>
            </div>
            <div style={{
                display: "flex"
            }}>
                <div style={{
                    marginRight: 10
                }}>
                    <Button 
                    variant={"contained"}
                    onClick = {
                        ()=>{
                            navigate("/signup")
                        }
                    }
                    >Signup</Button>
                </div>
                <div>
                    <Button
                    variant={"contained"}
                    onClick={
                        ()=>{
                            navigate("/signin")
                        }
                    }
                    >Signin</Button>
                </div>
            </div>
        </div>
        }
        
    }

    export default Appbar;