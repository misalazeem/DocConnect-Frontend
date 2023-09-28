import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doctorsFetchData } from '../redux/doctors/doctorSlice';
import '../style/style.css';
import Sidebar from './Sidebar';
import facebookIcon from '../assests/facebook.png';
import twitterIcon from '../assests/twitter.png';
import linkedinIcon from '../assests/linkedin.png';
import farwordIcon from '../assests/forward.png'

const Doctors = () => {
  const doctorsDispatch = useDispatch();
  const { allDoctors } = useSelector((store) => store.doctors);

  useEffect(() => {
    doctorsDispatch(doctorsFetchData());
  }, [doctorsDispatch]);

  const forwardArrow = () => {
    const container = document.querySelector('.doctors-listing');
    
    if (container) {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (currentScroll + 200 > maxScroll) {
        // If scrolling exceeds the maximum scroll position, reset to the beginning
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        // Scroll by 250 pixels to the left
        container.scrollBy({
          left: 200,
          behavior: 'smooth',
        });
      }
    }
  };
  
  const backArrow = () => {
    const container = document.querySelector('.doctors-listing');
    
    if (container) {
      const currentScroll = container.scrollLeft;
      
      if (currentScroll - 200 < 0) {
        // If scrolling would go before the beginning, scroll to the end
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        // Scroll 250 pixels to the left (backward)
        container.scrollBy({
          left: -200,
          behavior: 'smooth',
        });
      }
    }
  };
  

  return (
    <>
      <div className="doctor-container">
        <Sidebar />
        <button onClick={backArrow}>
            <img src={farwordIcon} alt="Farword Icon" className="forward-button retrun-back-btn"></img>
          </button>
        <div className="doctor-list-container">
          <div className="doctor-text-container">
            
            <h2 className="doctor-title-text">Meet Our Physicians</h2>
            <p className="doctor-paragraph-text">Please select a doctor for an appointment</p>
          </div>
        
          <div className="doctors-listing">
            {allDoctors.map(item => (
              <div className="doctor-box" key={item.id}>
                <img src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg" className="doctor-image" alt={item.name} />
                <h3 className="doctor-name">{item.name}</h3>
                <p className="doctor-bio">{item.bio}</p>
                <div className="social-icon-container">
                  <img src={facebookIcon} alt="Facebook Icon" className="social-icon" />
                  <img src={twitterIcon} alt="Twitter Icon" className="social-icon" />
                  <img src={linkedinIcon} alt="Linkedin Icon" className="social-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={forwardArrow}>
            <img src={farwordIcon} alt="Farword Icon" className="forward-button"></img>
          </button>
      </div>
    </>
  );
};

export default Doctors;
