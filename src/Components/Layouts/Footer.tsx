
import Logo from "../../assets/AceLogo.png";
import facebook from "../../assets/icons/facebook.png";
import youtube from "../../assets/icons/youtube.png";
import linkedin from "../../assets/icons/linkedin.png";
import instagram from "../../assets/icons/instagram.png";
import './Footer.css';
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
    <div className="container1">
      <div className="footer-icons">
        <div className="footer-logo">
          <Image src={Logo} alt="logo" width={50} height={40} />  <span>ACE Software Solutions Pvt. Ltd.</span>
        </div>
        <div className="footer-media">
        <a href="https://www.facebook.com/people/Ace-Software-Solutions-Pvt-Ltd/61565550617223/?sk=about" target="facebook" >
        <Image src={facebook} alt="icons" width={60} height={30} />
        </a>
        <a href="https://youtube.com/@acesoftwaresolutions?si=KqZ0BFZg5pNmGBqk" target="youtube">
        <Image src={youtube} alt="icons" width={60} height={30} />
        </a>
        <a href="https://in.linkedin.com/company/ace-software-solutions-private-limited" target="linkedin" >
        <Image src={linkedin} alt="icons" width={60} height={30} />
        </a>
        <a href="https://www.instagram.com/ace_software_solutions/" target="instagram">
        <Image src={instagram} alt="icons" width={60} height={30} />
        </a>
        </div>
      </div>
 <div className="footer-details">
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>
          #306, 2nd Floor NSIC - Software Technology Business Park B 24, Guindy
          Industrial Estate Ekkaduthangal, Chennai - 600032
        </p>
      </div>

      <div className="footer-about">
  <h3>COMPANY</h3>
  <ul>
    <li><a href="#about">About Us</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#">Talk to Us</a></li>
    <li><a href="#">know more</a></li>
  </ul>
</div>

      <div className="footer-help">
        <h3>HELP</h3>
        <li>Customer Support</li>
        <li>Blogs</li> 
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </div>

      </div>
      <hr />
      <div className="copyright">
        <p>© Copyright 2025, All Rights Reserved by  ACE Software Solutions Private Limited.</p>
       </div>
      </div>
    </div>

  );
};

export default Footer;
