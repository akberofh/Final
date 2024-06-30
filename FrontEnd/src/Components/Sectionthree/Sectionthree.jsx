import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const Sectionthree = () => (
  <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px]">
    <div className="container">
      <h1 data-aos="fade-up" className="text-3xl font-semibold text-center sm:text-4xl font-serif pb-12">
        Why Choose Us
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div data-aos="fade-up" data-aos-delay="0" className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg">
          <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
          <h1 className="text-2xl font-bold">Best Price</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <a href="#" className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300">Learn more</a>
        </div>
        <div data-aos="fade-up" data-aos-delay="500" className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg">
          <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
          <h1 className="text-2xl font-bold">Fast and Safe</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <a href="#" className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300">Learn more</a>
        </div>
        <div data-aos="fade-up" data-aos-delay="1000" className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg">
          <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
          <h1 className="text-2xl font-bold">Experience Drivers</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <a href="#" className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300">Learn more</a>
        </div>
      </div>
    </div>
  </div>
);

export default Sectionthree;
