import React, { useState } from 'react';
import '../styles/BotEnroll.css'; 
import Muialert from "./Muialert";

const BotEnroll = ({ course }) => { // Accept course as a prop
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        countryCode: '+91', // Default country code
        course: course || '', // Set the default value for course
        duration: '',
        idea: '', // New field for the "Idea" section
    });

    const [alert, setAlert] = useState({
        show: false,
        severity: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        // Allow only numbers and ensure the length is 10
        if (/^\d{0,10}$/.test(phoneValue)) {
            setFormData({ ...formData, phone: phoneValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }
        console.log('Form Submitted:', formData);
        // Add your form submission logic here
        const res = await fetch('https://codru-server.vercel.app/botenroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(res.ok);
        // Handle the response from the server
        if (res.ok) {
            setAlert({
              show: true,
              severity: "success",
              message: "Message sent successfully!",
            });
            // setValue({ formData.name: "", email: "", phone: "", city: "", message: "" });
          } else {
            setAlert({
              show: true,
              severity: "error",
              message: "Failed to send message",
            });
          }
    };

    return (
        <div>
            <div className='bot-enroll-container'>
                <h2 className='bot-enroll-header'>Student Enrollment Form</h2>
                <form className='bot-enroll-form' onSubmit={handleSubmit}>
                    <div className='bot-enroll-row-container'>
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="name">Name:</label>
                        </div>
                        <input
                            className='bot-enroll-input'
                            type="text"
                            placeholder='Enter your name'
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bot-enroll-row-container'> 
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="age">Age:</label>
                        </div>
                        <input
                            className='bot-enroll-input'
                            type="number"
                            placeholder='Enter your age'
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bot-enroll-row-container'>
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="email">Email:</label>
                        </div>
                        <input
                            className='bot-enroll-input'
                            type="email"
                            placeholder='Enter your email'
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bot-enroll-row-container'>
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="phone">Phone:</label>
                        </div>
                        <div className='bot-enroll-phone-container'>
                            <select
                                className='bot-enroll-country-code'
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                required
                            >
                                <option value="+91">+91 (India)</option>
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+81">+81 (Japan)</option>
                            </select>
                            <input
                                className='bot-enroll-input'
                                type="tel"
                                placeholder='Enter your phone number'
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='bot-enroll-row-container'>
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="course">Course:</label>
                        </div>
                        <select
                            className='bot-enroll-input'
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="Bot Explorer">Bot Explorer</option>
                            <option value="Bot Engineer">Bot Engineer</option>
                            <option value="Bot Inventor">Bot Inventor</option>
                        </select>
                    </div>
                    <div className='bot-enroll-row-container'>
                        <div className='bot-enroll-label-container'>
                            <label className='bot-enroll-label' htmlFor="duration">Duration:</label>
                        </div>
                        <select
                            className='bot-enroll-input'
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Duration</option>
                            <option value="30 Days (8 Lectures)">30 Days (8 Lectures)</option>
                            <option value="45 Days (12 Lectures)">45 Days (12 Lectures)</option>
                            <option value="90 Days (24 Lectures)">90 Days (24 Lectures)</option>
                        </select>
                    </div>
                    {/* New Idea Section */}
                    <div className='bot-enroll-row-container idea'>
                        <div className='bot-enroll-label-container idea-label'>
                            <label className='bot-enroll-label' htmlFor="idea">Idea:</label>
                        </div>
                        <textarea
                            className='bot-enroll-textarea'
                            id="idea"
                            name="idea"
                            placeholder="Share your idea of what you want to build. (Optional)"
                            value={formData.idea}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='bot-enroll-button' type="submit">Enroll</button>
                </form>
                {alert.show && (
                    <Muialert
                      severity={alert.severity}
                      onClose={() => setAlert({ ...alert, show: false })}
                    >
                      {alert.message}
                    </Muialert>
                  )}
            </div>
        </div>
    );
};

export default BotEnroll;