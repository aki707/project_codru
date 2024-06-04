import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
// import Buy from './components/Buy.jsx';
import Change_password from "./components/Change_password";
// import Class6 from './components/Class6.jsx';
import Contact from "./components/Contact";
import Courses from './components/Courses.jsx';
// import Extra from './components/Extra.jsx';
import Forget_password from "./components/Forget_password";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
<<<<<<< HEAD
import Profile from "./components/Profile";
// import Login from "./components/Login";
=======
>>>>>>> d39f582d681eb883e9aa63b0c8b7ea230b7cdaa0

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      {/* <Route path="/" Component={Home} /> */}
=======
      <Route path="/" Component={Home} />
      <Route path="/forgot-password" Component={Forget_password} />
      <Route path="/change-password" Component={Change_password}/>
>>>>>>> d39f582d681eb883e9aa63b0c8b7ea230b7cdaa0
      <Route path="/signup" Component={Signup} />
      <Route path="/signin" Component={Signin} />
      <Route path="/popup" Component={Popup} />
      <Route path="/contact" Component={Contact} />
      <Route path="/course-register" Component={Admission} />
<<<<<<< HEAD
      <Route path="/About" Component={About} />
      <Route path="/" Component={Profile} />
=======
      <Route path="/About" Component={About}/>
      <Route path='/courses' Component={Courses}/>
      {/* <Route path='/extra' Component={Extra}/> */}
     {/* <Route path='/class6' Component={Class6}/> */}
     {/* <Route path='/buy' Component={Buy}/> */}
    
>>>>>>> d39f582d681eb883e9aa63b0c8b7ea230b7cdaa0
    </Routes>
  );
}
export default App;
