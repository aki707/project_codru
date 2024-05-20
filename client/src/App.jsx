import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup}/>
      
    </Routes>
  );
}
export default App;
