import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
import Buy from './components/Buy.jsx';
import Change_password from "./components/Change_password";
import Class6 from "./components/Class6.jsx";
import Contact from "./components/Contact";
import Courses from "./components/Courses.jsx";
import Extra from "./components/Extra.jsx";
import Forget_password from "./components/Forget_password";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Form from "./components/Form";
import Commentpage from "./components/Commentpage.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Blogpage from "./components/Blogpage.jsx";
import Notification from "./components/Notification";
// import Custom from './components/Custom.jsx';
// import Profile from "./components/Profile";
import Custom from './components/Custom.jsx';
import Dashboard from "./components/Dashboard";
// import FinalBuy from "./components/FinalBuy.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/forgot-password/:token" Component={Forget_password} />
      <Route path="/change-password" Component={Change_password} />
      <Route path="/signup" Component={Signup} />
      <Route path="/signin" Component={Signin} />
      <Route path="/form" Component={Form} />
      <Route path="/popup" Component={Popup} />
      <Route path="/courses" Component={Courses} />
      
      <Route path="/contact" Component={Contact} />
      <Route path="/course-register" Component={Admission} />
      <Route path="/About" Component={About} />
      <Route path="/custom" Component={Custom} />
      <Route path="/extra" Component={Extra} />
      <Route path="/class6" Component={Class6} />
      <Route path="/commentpage" Component={Commentpage} />
      <Route path="/blog" Component={BlogForm} />
      <Route path="/blogdata" Component={Blogpage} />
      {/* <Route path="/profile" Component={Profile} /> */}
      <Route path="/admission" Component={Admission} />
      <Route path="/notification" Component={Notification} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/buy" Component={Buy} />
      {/* <Route path="/finalBuy" Component={FinalBuy} /> */}


      {/* <Route path='/buy' Component={Buy}/> */}
    </Routes>
  );
}
export default App;
