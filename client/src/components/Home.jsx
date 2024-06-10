import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Start1 from "./Start1";
// import Start2 from "./Start2";
import Start3 from "./Start3";
import Start4 from "./Start4";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token"); // Retrieve the token from localStorage
      console.log(token);

      if (token) {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("Photo", data.user.photo);
          localStorage.setItem("Name", data.user.name);
        } else {
          console.error("Failed to fetch user data", data.error);
        }
      }
    };

    fetchData();
  }, []);

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
