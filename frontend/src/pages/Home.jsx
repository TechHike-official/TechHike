import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx";
import Contact from "../components/Contact.jsx";
import Services from "../components/Services.jsx";
import CookieContent from "../components/cookies";
import SideContactNavbar from "../components/SideContactDialogue";
import TechStack from "./TechStack.jsx";
import { ArrowUp } from "lucide-react";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <main className="relative min-h-screen">
      <Services />
      <TechStack />
      <Contact />
      <SideContactNavbar />
      <Footer />
      <CookieContent />
      
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
};

export default Home;
