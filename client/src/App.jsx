import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Admission from "./components/Admission";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Courses from './components/Courses.jsx';
import Class6 from './components/Class6.jsx';
import Extra from './components/Extra.jsx';
import Buy from './components/Buy.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup} />
      <Route path="/signin" Component={Signin} />
      <Route path="/popup" Component={Popup} />
      <Route path="/contact" Component={Contact} />
      <Route path="/course-register" Component={Admission} />
      <Route path="/About" Component={About}/>
      <Route path='/courses' Component={Courses}/>
      <Route path='/extra' Component={Extra}/>
     <Route path='/class6' Component={Class6}/>
     <Route path='/buy' Component={Buy}/>
    
    </Routes>
  );
}
export default App;
