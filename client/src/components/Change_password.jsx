import '../styles/Change_password.css';


function Change_password() {
  return (
    <div>
        <div className='cp_main'>
        <img src='/image/BackgroundImage.png' alt=''></img>
          <div className='cp_box'>
          <img src='/image/cp.png' alt=''></img>
          <h2>Change Password</h2>
          <form className='cp_form'>
            <div className='cp_form-group'>
            <label className='cp_label' htmlFor='Password'>Old Password</label>
            <input type="password" id="password" name="password" required></input>
            </div>

            <div className='cp_form-group'>
            <label className='cp_label' htmlFor='Password'>New Password</label>
            <input type="password" id="password" name="password" required></input>
            </div>

            <div className='cp_form-group'>
            <label className='cp_label' htmlFor='Password'>Confirm New Password</label>
            <input type="password" id="password" name="password" required></input>
            </div>

            <div className="cp_buttonWrapper">
           <button type="submit" id="cp_submitButton" className="cp_submitButton pure-button pure-button-primary">
        <span>Update Password</span>
        <span id="cp_loader"></span>
      </button>
    </div>
          </form>
          </div>
        </div>
    </div>
  )
}

export default Change_password
