import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppStoreImg from "../assets/app_store.png";
import PlayStoreImg from "../assets/play_store.png";
import pattern from "../assets/pattern.jpeg";

const bannerImg = {
    backgroundImage: `url(${pattern})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};


const Sectioninstall = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className="container">
    
            <div
                className="text-black py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl"
                style={bannerImg}
            >
                <div>
                    <div className="space-y-6 max-w-xl mx-auto">
                        <h1
                            data-aos="fade-up"
                            className="text-2xl text-center sm:text-4xl font-semibold font-serif"
                        >
                            Get Started with our app
                        </h1>
                        <p data-aos="fade-up" className="text-center sm:px-20">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
                            magnam harum accusantium odit?
                        </p>
                        <div
                            data-aos="fade-up"
                            className="flex flex-wrap justify-center items-center gap-4"
                        >
                            <a target="_blank" href="https://play.google.com/store">
                                <img
                                    src={PlayStoreImg}
                                    alt="Play Store"
                                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                                />
                            </a>
                            <a target="_blank" href="https://www.apple.com/app-store/">
                                <img
                                    src={AppStoreImg}
                                    alt="App Store"
                                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sectioninstall;
