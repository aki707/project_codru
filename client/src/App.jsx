import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
import Buy from "./components/Buy.jsx";
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
import BlogForm from "./components/BlogForm.jsx";
import Blogpage from "./components/Blogpage.jsx";
import Notification from "./components/Notification";
import Custom from "./components/Custom.jsx";
import Dashboard from "./components/Dashboard";
import Blogdetail from "./components/Blogdetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password/:token" element={<Forget_password />} />
      <Route path="/change-password" element={<Change_password />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course-register" element={<Admission />} />
      <Route path="/About" element={<About />} />
      <Route path="/custom" element={<Custom />} />
      <Route path="/extra" element={<Extra />} />
      <Route path="/class6" element={<Class6 />} />
      <Route path="/blog" element={<BlogForm />} />
      <Route path="/blogsdata" element={<Blogpage />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/blog/:blogId" element={<Blogdetail />} />
    </Routes>
  );
}

export default App;
