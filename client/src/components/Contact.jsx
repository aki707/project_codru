
import '../styles/Contact.css';
const Contact = () => {
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
            <div className='line'>
            </div>  
      </nav>
      <div className='page'>
          <h1>Contact &nbsp;
          <span>us</span></h1>
        <div className='pic'>
        <img src="/image/contact.png" alt=""></img>
        </div>
        <div className='text'>
        <h2><span>Get in Touch</span></h2>
        </div>
        <div className='form'>
        <div className="form-container">
          <form action="submit.php" method="POST">
          <div className="form-group">
                  <label for="Name">
                  <input placeholder="Name" type="text" id="Name" name="name" required></input>
                  </label>
          </div>
          <div className="form-group">
                  <label for="City">
                  <input placeholder="City" type="text" id="City" name="City" required></input>
                  </label>
          </div>
          <div className="form-group">
                  <label for="phn">
                  <input placeholder="Phone Number" type="tel" id="phn" name="phn" required></input>
                  </label>
          </div>
          <div className="form-group">
                  <label for="Email">
                  <input placeholder="Email" type="text" id="Email" name="Email" required></input>
                  </label>
          </div>
          <div className="form-group">
                  <label for="message">
                  <textarea placeholder="Message Query" type="message" id="meaaage" name="message" required></textarea>
                  </label>
          </div>
          <div className="form-group">
                  <button type="submit">Send Message</button>
              </div>
         {/* <input type="submit" onclick="alert('meaage has been sent'" value="submit"></input> */}
          
  
          </form>
          </div>
        </div>
        
      </div>
    </div>
    ) 
  }
   
  export default Contact
  