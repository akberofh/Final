import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import carpg from '../assets/bn.png';
import styles from './Sectionfre.module.scss';

const Sectionfre = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);


  return (
    <div className={styles.secfre}>
      <div className={styles.container}>
        <div className={styles.cards}>
          <p data-aos="fade-right">Find and book the <br /> best car easily</p>
          <span data-aos="fade-right" data-aos-delay="100">
            A peer-to-peer car rental service that allows an <br /> individual to rent his or her car to another individual <br /> for quick cash or for profit in this sharing economy.
          </span>
        </div>
        <div className={styles.card} data-aos="fade-left">
          <img src={carpg} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Sectionfre;
