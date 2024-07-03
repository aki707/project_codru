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
import Form from "./components/Form";
import Commentpage from "./components/Commentpage.jsx";
import Admin from "./components/Admin.jsx";
// import Custom from './components/Custom.jsx';
// import Profile from "./components/Profile";
import TaskForm from "./components/TaskForm.jsx";
import EventBoxes from "./components/EventBoxes.jsx";
import PlanetaryPath from "./components/PlanetryPath.jsx";
import FinalBuy from "./components/FinalBuy.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password/:token" element={<Forget_password />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/courses" element={<Courses />} />

      <Route path="/course-register" element={<Admission />} />

      <Route path="/extra" element={<Extra />} />
      <Route path="/class6" element={<Class6 />} />

      <Route path="/blogsdata" element={<Blogpage />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/blog/:blogId" element={<Blogdetail />} />

      <Route path="/change-password" Component={Change_password} />

      <Route path="/form" Component={Form} />

      <Route path="/contact" Component={Contact} />
      <Route path="/About" Component={About} />
      <Route path="/custom" Component={Custom} />
      <Route path="/commentpage" Component={Commentpage} />
      <Route path="/blog" Component={BlogForm} />
      <Route path="/blogdata" Component={Blogpage} />
      <Route path="/notification" Component={Notification} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-task/:username" Component={TaskForm} />
      <Route path="/events" Component={EventBoxes} />
      <Route path="/planetary-path" Component={PlanetaryPath} />
      <Route path="/finalBuy" Component={FinalBuy} />
    </Routes>
  );
}

export default App;
