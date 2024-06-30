import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdSubject } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

const ContactUsDetails = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    to_name: "",
    from_name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { to_name, from_name, subject, message } = formData;
    if (!to_name || !from_name || !subject || !message) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    emailjs
      .sendForm(
        "service_4i87mgi",
        "template_mbcbrta",
        form.current,
        "maWLZ_lCIDUPfvYND"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send message, please try again.");
        }
      );
    setFormData({
      to_name: "",
      from_name: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">
      <div className="section-title text-center">
        <h3>Contact Us</h3>
      </div>
      <div className="content">
        <div className="map">
          <iframe
            src="https://satellites.pro/Masally_map.Azerbaijan"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            title="This is Contact Map"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
        <div className="form-container">
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-group">
              <div className="input-field">
                <p className="label">Name</p>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="to_name"
                  value={formData.to_name}
                  onChange={handleChange}
                />
                <FaRegUser className="icon" size={20} />
              </div>
              <div className="input-field">
                <p className="label">Email</p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                />
                <HiOutlineMail className="icon" size={20} />
              </div>
            </div>
            <div className="input-field">
              <p className="label">Subject</p>
              <input
                type="text"
                placeholder="Enter Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
              <MdSubject className="icon" size={20} />
            </div>
            <div className="input-field">
              <p className="label">Message</p>
              <textarea
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <input
              type="submit"
              className="submit-button"
              value="Send Message"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUsDetails;
