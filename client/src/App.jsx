import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Popup from "./components/Popup";
import Signin from "./components/Signin";
import Signup from "./components/Signup";



function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup}/>
      <Route path="/signin" Component={Signin}/>
      <Route path="/popup" Component={Popup}/>
      <Route path="/Contact" Component={Contact}/>

    </Routes>
  );
}
export default App;
