import { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, city, message } = value;

    const res = await fetch("/api/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        city,
        message,
      }),
    });

    if (res.ok) {
      // Handle successful response
      console.log("Message sent successfully");
    } else {
      // Handle error response
      console.error("Failed to send message");
    }
  };

  return (
    <div>
      <nav>
        <div className="Navbarmaindiv">
          <div className="navlogo">
            <img src="/image/codro.png" alt=""></img>
          </div>
          <div className="navbuttons">
            <div className="btn">
              <button>
                <a href="/">About us</a>
              </button>
              <button>
                <a href="/">course</a>
              </button>
              <button>
                <a href="Contact">contact us</a>
              </button>
              <button>
                <a href="/">schedule</a>
              </button>
            </div>
            <div className="Regbtn">
              <button>
                <a href="signup">Register now</a>
              </button>
            </div>
          </div>
        </div>
        <div className="line"></div>
      </nav>
      <div className="page">
        <h1>
          Contact &nbsp;<span>us</span>
        </h1>
        <div className="pic">
          <img src="/image/contact.png" alt=""></img>
        </div>
        <div className="quote">
          <h2>
            <span>Get in touch</span>
          </h2>
        </div>
        <div className="form">
          <div className="form-container">
            <form onSubmit={PostData}>
              <div className="form-group">
                <label htmlFor="Name">
                  <input
                    placeholder="Name"
                    type="text"
                    id="Name"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="City">
                  <input
                    placeholder="City"
                    type="text"
                    id="City"
                    name="city"
                    value={value.city}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="phn">
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    id="phn"
                    name="phone"
                    value={value.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="Email">
                  <input
                    placeholder="Email"
                    type="email"
                    id="Email"
                    name="email"
                    value={value.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="message">
                  <textarea
                    placeholder="Message Query"
                    id="message"
                    name="message"
                    value={value.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </label>
              </div>
              <div className="form-group">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
