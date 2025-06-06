import About from "../Components/AboutSection/About";
import HeroSection from "../Components/HeroSection/HeroSection";
import ContactForm from "../Components/Layouts/ContactForm";
import Footer from "../Components/Layouts/Footer";
import ServiceHeader from "../Components/ServiceSection/ServiceSection";

function Home() {
  return (
    <>
      <HeroSection />
      <ServiceHeader />
      <About />
      <ContactForm/>
      <Footer/>
      
    </>
  );
}

export default Home;
