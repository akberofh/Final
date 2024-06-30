import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import ContactUsDetails from './ContactUsDetails'
import Footer from '../../Components/Footer/Footer'
import './ContactUs.css'
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUsCompliment = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div  className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden" style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'30px'}}>
        <Header theme={theme} setTheme={setTheme}  />
        <ContactUsDetails theme={theme}  />
        <Footer/>
    </div>
  )
}

export default ContactUsCompliment