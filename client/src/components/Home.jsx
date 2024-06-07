import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Start1 from "./Start1";
// import Start2 from "./Start2";
import Start3 from "./Start3";
import Start4 from "./Start4";

function Home() {
  useEffect(() => {
    console.log(localStorage.getItem("Token"));
    console.log(localStorage.getItem("Username"));
    console.log(localStorage.getItem("Photo"));
  });
  return (
    <div>
      <Navbar />
      <hr />
      <Start1 />
      <hr />
      <Start3 />
      <hr />
      <Start4 />
      <Footer />
    </div>
  );
}

export default Home;
