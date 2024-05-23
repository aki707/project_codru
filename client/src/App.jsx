import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Signin from "./components/Signin";
<<<<<<< HEAD
import Popup from "./components/Popup";
=======
import Signup from "./components/Signup";
>>>>>>> 044bc67b66d142b65ac4d610d61660993adfb390


function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup}/>
      <Route path="/signin" Component={Signin}/>
<<<<<<< HEAD
      <Route path="/popup" Component={Popup}/>
      
=======
      <Route path="/Contact" Component={Contact}/>
>>>>>>> 044bc67b66d142b65ac4d610d61660993adfb390
    </Routes>
  );
}
export default App;
