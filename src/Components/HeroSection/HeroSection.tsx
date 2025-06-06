'use client'


import React, { useState, useEffect } from "react";
import Landingimg from "../../assets/image.png";
import "./Herosection.css";
import Header from "../Layouts/Header";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  const contact = "#talk-to-us";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 0;

      if (scrollTop > 300 && !isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="hero container-fluid">
        <Header />
        
        <button
          onClick={scrollToTop}
          className={`scroll-to-top ${isVisible ? "show" : ""}`}
        >
          <FaArrowUp size={15} />
        </button>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Manage <span className="hero-highlight">your project</span> in one
              place
            </h1>
            <div className="hero-image">
              <Image src={Landingimg} alt="SaaS Illustration" />
            </div>
            <p>
              We specialize in ERP solutions that enhance productivity and
              streamline operations. Our tailored systems optimize workflows,
              automate tasks, and integrate real-time data to drive growth. With
              our expertise, we help businesses make informed decisions and
              reduce operational costs. Choose us to boost your business's
              efficiency and success.
            </p>
            <button
              className="contact-button mb-5"
              onClick={() =>
                document
                  .querySelector(contact)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Us
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
