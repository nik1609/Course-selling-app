import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import Appbar from './Appbar'
import Signin from './Signin'
import Signup from './Signup'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import axios from "axios"
import {useEffect, useState} from 'react';



function App() {
 

  return (
    <div style ={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#eeeeee"
    }}>
      <Router>
        <Appbar/>
        <Routes>
          <Route path = {"/signin"} element={<Signin/>}/>
          <Route path = {"/signup"} element = {<Signup/>}/>
          <Route path = {"/addcourse"} element = {<AddCourse/>}/>
          <Route path = {"/courses"}  element = {<Courses/>}/>
          <Route path={"/course/:courseId"} element = {<Course/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
