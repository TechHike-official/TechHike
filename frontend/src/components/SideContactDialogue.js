import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const SideContactNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  
  // Contact information
  const email = "techhike@gmail.com";
  const whatsapp = "+91 8075920705";
  const phone = "+91 8075920705";
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  // Toggle navbar expansion
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine collapse width and size based on screen size
  const collapseWidth = windowWidth < 640 ? "-180px" : "-240px";
  const navbarWidth = windowWidth < 640 ? "w-44" : "w-60";

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 z-50 flex transition-all duration-300 ease-in-out drop-shadow-xl`}
      style={{
        right: isExpanded ? "0" : collapseWidth,
      }}
    >
      {/* Toggle Button */}
      <div
        className="relative bg-blue-600 text-white p-2 sm:p-5 rounded-l-xl cursor-pointer flex flex-col items-center justify-center gap-4 sm:gap-6 shadow-lg transition-all duration-300 hover:bg-blue-700"
        onClick={toggleNavbar}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Arrow Animation */}
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
            {isExpanded ? (
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" />
            )}
          </div>
          
          <div className="w-full h-px bg-blue-400 my-3 sm:my-4 opacity-70"></div>
          
          {/* Vertical Text */}
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest writing-vertical-lr whitespace-nowrap">
            TECH
          </span>
        </div>
        
        {/* Pulse Effect */}
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
          <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-red-500"/>
          </span>
        </div>
      </div>

      {/* Contact Options */}
      <div
        className={`${navbarWidth} bg-white p-3 sm:p-5 rounded-r-xl flex flex-col gap-3 sm:gap-4`}
      >
        <h3 className="m-0 mb-3 sm:mb-4 text-center text-gray-800 text-sm sm:text-lg font-semibold">
          Contact Us
        </h3>
        
        {/* Email Option */}
        <a 
          href={`mailto:${email}`}
          className="group flex items-center p-2 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-2 sm:gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a86ff] transition-transform duration-300 group-hover:scale-110" />
          <div>
            <div className="font-semibold text-[10px] sm:text-sm">Email</div>
            <div className="text-[9px] sm:text-xs text-gray-600 mt-1">techhikeofficial@gmail.com</div>
          </div>
        </a>

        {/* WhatsApp Option */}
        <a 
          href={`https://wa.me/${whatsapp.replace(/\+|\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-2 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-2 sm:gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
          <div>
            <div className="font-semibold text-[10px] sm:text-sm">WhatsApp</div>
            <div className="text-[9px] sm:text-xs text-gray-600 mt-1">{whatsapp}</div>
          </div>
        </a>

        {/* Call Option */}
        <a 
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="group flex items-center p-2 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-2 sm:gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a86ff] transition-transform duration-300 group-hover:scale-110" />
          <div>
            <div className="font-semibold text-[10px] sm:text-sm">Call Us</div>
            <div className="text-[9px] sm:text-xs text-gray-600 mt-1">{phone}</div>
          </div>
        </a>
        
        {/* Quick Contact Banner */}
        <div className="mt-3 sm:mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-2 sm:p-3 text-white text-center hidden sm:block">
          <p className="text-[10px] sm:text-xs mb-2 font-medium">Need immediate help?</p>
          <a 
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-white text-blue-600 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#3a86ff]" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideContactNavbar;