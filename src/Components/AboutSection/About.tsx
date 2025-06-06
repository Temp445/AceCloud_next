'use client'

import React from "react";
import './About.css'
import aboutimg from '../../assets/About.png'
import { TiArrowForward } from "react-icons/ti";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
const About = () => {
  const about = "https://in.linkedin.com/company/ace-software-solutions-private-limited"
  return (
    <>
      <div className="heading " id="about">
        <div className="our-about-container">
          <div className="our-about-box">
            <h2 className="our-about-title">
              <span>About</span> Us
            </h2>
            <div className="corner-decoration-about left-bottom"></div>
            <div className="corner-decoration-about right-top"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-left">
          <h2>
            <span className="highlight">Company</span> Overview
          </h2>
          <Image src={aboutimg} alt="aboutimage" width={300} height={300}  className="about-img1"/>
    
          <div className="para">
          <p>
          <TiArrowForward  className="arrow"/> <span className="highlight">ACE Software Solutions Pvt. Ltd. </span>(established in 2001) is
            headquartered in Chennai with an R&D center.
          </p>
          <p>
          <TiArrowForward className="arrow" /> Founded by professionals with extensive experience in the
            manufacturing sector, the company specializes in <span className="highlight">ERP systems,
            Industry 4.0 & IIoT solutions, and SaaS products</span> for businesses of
            all sizes.
          </p>
          </div>
          <button className="about-button"  onClick={() => window.open(about, "_blank")}>Know more<MdOutlineKeyboardArrowRight  className="arrow1"/></button>
        </div>
        <div className="about-right">
        <Image src={aboutimg} width={600} height={600} alt="About Image" />
      </div>
      </div>

     
    </>
  );
};

export default About;
