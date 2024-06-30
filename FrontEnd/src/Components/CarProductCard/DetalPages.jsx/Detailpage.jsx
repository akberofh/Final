import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from '../../Header/Header'
import Detalp from './Detalp'
import Footer from '../../Footer/Footer'

const Detailpage = () => {
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

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <Header theme={theme} setTheme={setTheme} />
      <Detalp theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default Detailpage;
