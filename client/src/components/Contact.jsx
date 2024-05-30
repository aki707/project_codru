import Alert from '@mui/material/Alert';
import { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
<<<<<<< HEAD
    return (
    <div>
      <nav>
          <div className="Navbarmaindiv">
              <div className="navlogo">
              <img src="/image/c3.png" alt=""></img>
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
                  <a href="/">contact us</a>
                </button>
                <button>
                  <a href="/">schedule</a>
                </button>
            </div>
            <div className="Regbtn">
                <button>
                  <a href="/">Register now</a>
                </button>
            </div>
          </div>
         </div>
            <div className='line1'>
            </div>  
      </nav>
=======
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

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
      setAlert({ show: true, severity: 'success', message: 'Message sent successfully!' });
      setValue({ name: "", email: "", phone: "", city: "", message: "" });
    } else {
      setAlert({ show: true, severity: 'error', message: 'Failed to send message' });
    }
  };

  return (
    <div className='contact-us-page'>
    
>>>>>>> 2d99b8500f8180ac6773ea64d0ec786eeacd3365
      <div className='page'>
        <h1>Contact &nbsp;<span>us</span></h1>
        <div className='cont_all'>
          <div className='cont_all_detail'>
              <h2>How to reach us ?</h2>
              <div className='cont_all_detail_office'>
               <h3>Contact Details:-</h3>
               <ul>
                <li><h4>Please Call:-</h4><p>7300-199-100/8949-775-255</p></li>
                <li><h4>Email:-</h4><p>codrueducation@gmail.com</p></li>
                <li><h4>Office:-</h4><p>Shop No.: 1 & 2, First Floor,Near Ahimsa circle, R.K. Puram (Sector A), Kota (Raj.), 324005</p></li>
                </ul>
                <h5>Please reach on Mon-Sun in between (8AM - 8PM);</h5>
              </div>
             
          </div>
        <div className='pic'>
          <img src="/image/contact.png" alt=""></img>
        </div>
        <div className='quote'>
          <h2><span>Get in Touch</span></h2>
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
            {alert.show && (
              <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
                {alert.message}
              </Alert>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
