import React, { useState } from 'react';
import "./ContactUs.css";
import Footer from "./Footer"; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailClick = () => {
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:hiranya.20220472@iit.ac.lk?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
    <div className='contactUs'>
      <div className='contactImage'>
        <img src="/ContactImage.png" alt="Contact" />
      </div>
      <div className='contact'>
        <h2>Contact Us</h2>
        <form className='contactForm'>
          <label>
            Name:
              <input
                type="text"
                name="name"
                value={formData.name}
               onChange={handleChange}
               required
              />
          </label>
          <br />
          <label>
            Email :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Subject :
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Message :
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleEmailClick}>
          Submit via Email
        </button>
      </form>
    </div>
    </div>
    <div>
        <Footer />
    </div>
    </div>
  );
};

export default ContactUs;
