import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Popup from "./components/Popup";

import Popup from "./components/Popup";


function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup}/>
      <Route path="/signin" Component={Signin}/>
      <Route path="/popup" Component={Popup}/>
<<<<<<< HEAD
=======
      <Route path="/Contact" Component={Contact}/>
>>>>>>> 64f3b9baeb2635ad57405732339988bd79efb6fb
      
    </Routes>
  );
}
export default App;
