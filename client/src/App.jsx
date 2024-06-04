import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
// import Login from "./components/Login";

function App() {
  return (
    <Routes>
      {/* <Route path="/" Component={Home} /> */}
      <Route path="/signup" Component={Signup} />
      <Route path="/signin" Component={Signin} />
      <Route path="/popup" Component={Popup} />
      <Route path="/contact" Component={Contact} />
      <Route path="/course-register" Component={Admission} />
      <Route path="/About" Component={About} />
      <Route path="/" Component={Profile} />
    </Routes>
  );
}
export default App;
