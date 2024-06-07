import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
import Buy from './components/Buy.jsx';
import Change_password from "./components/Change_password";
import Class6 from './components/Class6.jsx';
import Contact from "./components/Contact";
import Courses from "./components/Courses.jsx";
import Extra from './components/Extra.jsx';
import Forget_password from "./components/Forget_password";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Custom from './components/Custom.jsx';
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/forgot-password/:token" Component={Forget_password} />
      <Route path="/change-password" Component={Change_password}/>
      <Route path="/signup" Component={Signup} />
      <Route path="/signin" Component={Signin} />
      <Route path="/popup" Component={Popup} />
      <Route path="/contact" Component={Contact} />
      <Route path="/course-register" Component={Admission} />
      <Route path="/About" Component={About}/>
      <Route path='/courses' Component={Courses}/>
      <Route path='/extra' Component={Extra}/>
     <Route path='/class6' Component={Class6}/>
     <Route path='/custom' Component={Custom}/>
     <Route path='/dashboard' Component={Dashboard}/>
     <Route path='/buy' Component={Buy}/>
    
    </Routes>
  );
}
export default App;
