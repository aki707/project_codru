import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Popup from "./components/Popup";


function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup}/>
      <Route path="/signin" Component={Signin}/>
      <Route path="/popup" Component={Popup}/>
      
    </Routes>
  );
}
export default App;
