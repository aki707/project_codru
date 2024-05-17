
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/Signin" Component={Signin}/>
    </Routes>
  );

}
export default App;
