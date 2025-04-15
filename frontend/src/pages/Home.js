import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Contact from "../components/contact";
import Services from "../components/service";
import CookieContent from "../components/cookies";
import SideContactNavbar from "../components/SideContactDialogue";
import TechStack from "../pages/techused";

// CSS for global scrollbar styling
const scrollbarStyle = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    width: 0.5rem;
    background: transparent;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 255, 0.3);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 255, 0.5);
  }
  
  /* Hide scrollbar for Firefox */
  html {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 255, 0.3) transparent;
  }
  
  /* For IE and Edge */
  body {
    -ms-overflow-style: none;
  }
`;

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  // Show scroll button when user scrolls down 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Clean up 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add scrollbar style on mount
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyle;
    document.head.appendChild(styleElement);

    // Setup mouse idle detection to show/hide scrollbar
    let timeout;
    const handleMouseMove = () => {
      setScrollbarVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollbarVisible(false);
      }, 1500); // Hide scrollbar after 1.5 seconds of inactivity
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial hide
    setTimeout(() => {
      setScrollbarVisible(false);
    }, 1500);

    return () => {
      document.head.removeChild(styleElement);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <div className="scrollbar-container">
      {/* Conditional style for scrollbar visibility */}
      <style>
        {`
          ::-webkit-scrollbar-thumb {
            opacity: ${scrollbarVisible ? '1' : '0'};
            transition: opacity 0.3s ease;
          }
          html {
            scrollbar-color: ${scrollbarVisible ? 'rgba(0, 0, 255, 0.3) transparent' : 'transparent transparent'};
            transition: scrollbar-color 0.3s ease;
          }
        `}
      </style>
      
      <Services/>
      <TechStack/>
      <Contact/>
      <SideContactNavbar/>
      <Footer/>
      <CookieContent/>
      
      {/* Advanced Scroll up button */}
      {showScrollButton && (
        <button
          className="animate-bounce"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "blue",
            color: "white",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            opacity: scrollbarVisible ? "1" : "0.6", // Match scrollbar visibility
          }}
          aria-label="Scroll to top"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.opacity = scrollbarVisible ? "1" : "0.6";
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: "all 0.3s ease"
            }}
          >
            <path 
              d="M12 5L12 19" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M5 12L12 5L19 12" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;