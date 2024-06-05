import{ useState } from 'react';
import "../styles/Admission.css"


const Admission = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Date_of_birth: '',
    Gender: '',
    Address: '',
    Address1: '',
    Email_id: '',
    Phone_No: '',
    Alternate_Phone_No: '',
    Subject_Choosen: ['', '', '', '', '', ''],
    Class: '',
    Semester: '',
    SchoolName_CollegeName: '',
    Fathers_Name: '',
    Mothers_Name: '',
    Fathers_Occupation: '',
    Mothers_Occupation: '',
    upload_profile: null,
    upload_student_sign: null,
    upload_parent_sign: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });} else if (name.startsWith('Subject_Choosen')) {
      const index = parseInt(name.replace('Subject_Choosen', ''), 10);
      const subjects = [...formData.Subject_Choosen];
      subjects[index] = value;
      setFormData({
        ...formData,
        Subject_Choosen: subjects
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='Admission-form-container'>
      <h1 className='form-heading' align="center">Admission Form</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input type="hidden" name="_id" value={formData._id} />

        <table className="form-table" align="center" cellPadding="20" cellMargin="20" cellSpacing="20">
          <tbody>
            <tr>
              <td><b>Name:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Enter Name" name="Name" value={formData.Name} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Date of Birth:</b></td>
              <td colSpan="3">
                <input type="date" name="Date_of_birth" value={formData.Date_of_birth} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Gender:</b></td>
              <td><input type="radio" name="Gender" value="Male" checked={formData.Gender === 'Male'} onChange={handleChange} /> Male</td>
              <td><input type="radio" name="Gender" value="Female" checked={formData.Gender === 'Female'} onChange={handleChange} /> Female</td>
              <td><input type="radio" name="Gender" value="Other" checked={formData.Gender === 'Other'} onChange={handleChange} /> Other</td>
            </tr>
            <tr>
              <td><b>Address:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Present Address" name="Address" value={formData.Address} onChange={handleChange} required />
              </td>
            </tr>
            
            <tr>
              <td><b>Email id:</b></td>
              <td colSpan="3">
                <input type="email" placeholder="Email id" name="Email_id" value={formData.Email_id} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Phone No.:</b></td>
              <td colSpan="3">
                <input type="tel" placeholder="Phone No." name="Phone_No" value={formData.Phone_No} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Alternate Phone No.:</b></td>
              <td colSpan="3">
                <input type="tel" placeholder="Alternate Phone No." name="Alternate_Phone_No" value={formData.Alternate_Phone_No} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td><b>Subject Choosen:</b></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen0" value={formData.Subject_Choosen[0]} onChange={handleChange} /></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen1" value={formData.Subject_Choosen[1]} onChange={handleChange} /></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen2" value={formData.Subject_Choosen[2]} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen3" value={formData.Subject_Choosen[3]} onChange={handleChange} /></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen4" value={formData.Subject_Choosen[4]} onChange={handleChange} /></td>
              <td><input type="text" placeholder="Subject Choosen" name="Subject_Choosen5" value={formData.Subject_Choosen[5]} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><b>Class:</b></td>
              <td colSpan="3">
                <select name="Class" value={formData.Class} onChange={handleChange}>
                  <option value="" disabled>Select class</option>
                  <option value="6">6th</option>
                  <option value="7">7th</option>
                  <option value="8">8th</option>
                  <option value="9">9th</option>
                  <option value="10">10th</option>
                  <option value="11">11th</option>
                  <option value="12">12th</option>
                  <option value="13">Undergraduate</option>
                </select>
              </td>
            </tr>
            {formData.Class === '13' && (
              <tr>
                <td><b>Semester:</b></td>
                <td colSpan="3">
                  <select name="Semester" value={formData.Semester} onChange={handleChange}>
                    <option value="" disabled>Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </td>
              </tr>
            )}
            <tr>
              <td><b>School Name/College Name:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="School Name/College Name" name="SchoolName_CollegeName" value={formData.SchoolName_CollegeName} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Father's Name:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Enter Father's Name" name="Fathers_Name" value={formData.Fathers_Name} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Mother's Name:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Enter Mother's Name" name="Mothers_Name" value={formData.Mothers_Name} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td><b>Father's Occupation:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Father's Occupation" name="Fathers_Occupation" value={formData.Fathers_Occupation} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td><b>Mother's Occupation:</b></td>
              <td colSpan="3">
                <input type="text" placeholder="Mother's Occupation" name="Mothers_Occupation" value={formData.Mothers_Occupation} onChange={handleChange} />
              </td>
            </tr>
            <tr align="center">
              <td colSpan="4"><b>Declaration</b></td>
            </tr>
            <tr>
              <td colSpan="4">
                <p>I hereby declare that I will obey all the rules and regulations of the institution and be fully responsible for violating the rules.</p>
              </td>
            </tr>
            <tr>
  <td><b>Student's photo:</b></td>
  <td colSpan="3">
    <label className="upload-button" htmlFor="upload_profile">
      Upload File
    </label>
    <input id="upload_profile" style={{ display: 'none' }} type="file" name="upload_profile" onChange={handleChange} />
  </td>
</tr>
<tr>
  <td><b>Student's Signature:</b></td>
  <td>
    <label className="upload-button" htmlFor="upload_student_sign">
      Upload File
    </label>
    <input id="upload_student_sign" style={{ display: 'none' }} type="file" name="upload_student_sign" onChange={handleChange} />
  </td>
  <td><b>Parent's Signature:</b></td>
  <td>
    <label className="upload-button" htmlFor="upload_parent_sign">
      Upload File
    </label>
    <input id="upload_parent_sign" style={{ display: 'none' }} type="file" name="upload_parent_sign" onChange={handleChange} />
  </td>
</tr>

            <tr>
              <td></td>
              <td><input type="submit" className="Submit" name="Submit" /></td>
              <td><input type="reset" className="Reset" name="Reset" onClick={() => setFormData({
                Name: '',
                Date_of_birth: '',
                Gender: '',
                Address: '',
                Address1: '',
                Email_id: '',
                Phone_No: '',
                Alternate_Phone_No: '',
                Subject_Choosen: ['', '', '', '', '', ''],
                Class: '',
                Semester: '',
                SchoolName_CollegeName: '',
                Fathers_Name: '',
                Mothers_Name: '',
                Fathers_Occupation: '',
                Mothers_Occupation: '',
                upload_profile: null,
                upload_student_sign: null,
                upload_parent_sign: null,
              })} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};



export default Admission
