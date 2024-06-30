import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo1 from '../assets/bmwlogo.png';
import logo3 from '../assets/bmwlogo3.png';
import logo5 from '../assets/bmwlogo5.png';
import logo6 from '../assets/bmwlogo6.png';
import styles from './Sectionlogo.module.scss';
import { useNavigate } from 'react-router-dom';

const Sectionlogo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

 const naviget = useNavigate()

 const bmw = () => {
  naviget('/bmw')
 }
 const chv = () => {
  naviget('/chevrolet')
 }
 const lada = () => {
  naviget('/lada')
 }
 const nss = () => {
  naviget('/nissan')
 }
 const mrc = () => {
  naviget('/mercedes')
 }
 const tot = () => {
  naviget('/toyota')
 }



  return (
    <div className={styles.logodiv}>
      <div className={styles.container}>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="0">
          <img style={{cursor:'pointer'}} onClick={bmw} src={logo1} alt="BMW" />
          <h1>BMW</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="100">
          <img style={{cursor:'pointer'}}  onClick={chv} src="https://cdn.worldvectorlogo.com/logos/chevrolet-logo.svg" alt="Chevrolet" />
          <h1>Chevrolet</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="200">
          <img style={{cursor:'pointer'}}  onClick={nss} src={logo3} alt="Nissan" />
          <h1>Nissan</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="300">
          <img style={{cursor:'pointer'}}  onClick={lada} src="https://static.wixstatic.com/media/f2bf43_6fd3da301b054e4f8fdb2f219dc44f90~mv2.png" alt="Lada" />
          <h1>Lada</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="400">
          <img style={{cursor:'pointer'}}  onClick={tot} src={logo5} alt="Toyota" />
          <h1>Toyota</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="500">
          <img style={{cursor:'pointer'}}  onClick={mrc} src={logo6} alt="Mercedes-Benz" />
          <h1>Mercedes-Benz</h1>
        </div>
      </div>
    </div>
  );
};

export default Sectionlogo;
