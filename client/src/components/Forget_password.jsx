import '../styles/Forget_password.css';

const PostData = async (e) => {
  e.preventDefault();
  const { password,cpassword } = value;

  const res = await fetch("/api/reset-password/:token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      cpassword
    }),
  });

  if (res.ok) {
    console.log("User registered successfully");
  } else {
    console.error("Failed to register user");
  }
};

function Forget_password() {
    return (
        <div>
            <div className='fp_main'>
            <img src='/image/fp2.png' alt=''></img>
              <div className='fp_box'>
              <img src='/image/fp_icon.png' alt=''></img>
              <h2>Forget Password</h2>
              <form className='fp_form'>
                <div className='fp_form-group'>
                <label className='fp_label' htmlFor='Password'>New Password</label>
                <input type="password" id="password" name="pass" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required></input>
                </div>
    
                <div className='fp_form-group'>
                <label className='fp_label' htmlFor='Password'>Confirm New Password</label>
                <input type="password" id="password" name="retype_pass" required></input>
                </div>
    
                <div className="fp_buttonWrapper">
               <button type="submit" id="fp_submitButton" className="fp_submitButton pure-button pure-button-primary">
            <span>Update Password</span>
            <span id="fp_loader"></span>
          </button>
        </div>
              </form>
              </div>
            </div>
        </div>
      )
    }

export default Forget_password
