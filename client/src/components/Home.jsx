import Navbar from "./Navbar";
import Start1 from "./Start1";
import Start2 from "./Start2";
import Start3 from "./Start3";
import Login from "./Login";

function Home() {
  return (
    <div>
      <Navbar />
      <hr />
      <Start1 />
      <hr />
      <Start2 />
      <hr />
      <Start3 />
      <hr />
      <Login/>
    </div>
  );
}

export default Home;
