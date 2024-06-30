import React, { useEffect } from "react";
import CarPng from "../assets/car2.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Sectiontwo.css"; // CSS dosyasını içe aktarıyoruz

const Sectiontwo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: false, // Animasyon her seferinde tetiklensin
    });
  }, []);

  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <div className="image-container">
              <img
                src={CarPng}
                alt=""
                className="mb-10 mt-10 sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] hover:scale-150 transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <div className="mb-10 mt-10 space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, magnam! Tenetur odio quo et maxime?
              </p>
              <p data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                tempora.
              </p>
              <button
                data-aos="fade-up"
                className="button-outline bg-transparent border-2 border-primary text-primary py-2 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sectiontwo;
