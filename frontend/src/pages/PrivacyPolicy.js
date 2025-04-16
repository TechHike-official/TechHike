import React, { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections data for dynamic rendering
  const sections = [
    {
      id: 1,
      title: "Introduction",
      content: "At Tech HiKE, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services."
    },
    {
      id: 2,
      title: "Information We Collect",
      isComplex: true,
      content: [
        "We may collect the following types of information:",
        [
          "<span class='font-medium'>Personal Information:</span> Name, email address, phone number, and other contact details when you communicate with us or sign up for our services.",
          "<span class='font-medium'>Technical Data:</span> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and other technology on the devices you use to access our website.",
          "<span class='font-medium'>Usage Data:</span> Information about how you use our website and services.",
          "<span class='font-medium'>Marketing and Communications Data:</span> Your preferences in receiving marketing from us and our third parties and your communication preferences."
        ]
      ]
    },
    {
      id: 3,
      title: "How We Use Your Information",
      isComplex: true,
      content: [
        "We use your information for the following purposes:",
        [
          "To provide and maintain our services",
          "To notify you about changes to our services",
          "To allow you to participate in interactive features of our services",
          "To provide customer support",
          "To gather analysis or valuable information to improve our services",
          "To monitor the usage of our services",
          "To detect, prevent and address technical issues",
          "To provide you with news, special offers and general information about other goods, services and events which we offer"
        ]
      ]
    },
    {
      id: 4,
      title: "Data Security",
      content: "The security of your data is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure."
    },
    {
      id: 5,
      title: "Cookies",
      content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
      id: 6,
      title: "Third-Party Services",
      content: "Our service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services."
    },
    {
      id: 7,
      title: "Your Data Protection Rights",
      isComplex: true,
      content: [
        "Depending on your location, you may have the following data protection rights:",
        [
          "The right to access, update or delete the information we have on you",
          "The right of rectification - the right to have your information rectified if it is inaccurate or incomplete",
          "The right to object - the right to object to our processing of your personal data",
          "The right of restriction - the right to request that we restrict the processing of your personal information",
          "The right to data portability - the right to receive a copy of your personal data in a structured, machine-readable format",
          "The right to withdraw consent - the right to withdraw your consent at any time where we relied on your consent to process your personal information"
        ]
      ]
    },
    {
      id: 8,
      title: "Changes to This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"effective date\" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes."
    },
    {
      id: 9,
      title: "Children's Privacy",
      content: "Our services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* Background Mesh Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8cGF0aCBkPSJNMzAgMzBDMTUgMzAgMCAxNSAwIDAgMTUgMCAzMCAxNSA2MCAxNSA2MCAwIDQ1IDAgMzAgMHoiIGZpbGw9IiM0MDQwNDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPgo8L3N2Zz4=')] opacity-10"></div>
      
      {/* Blurred Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gray-500 via-white to-gray-400" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* Navigation Dots */}
        <nav className="fixed top-1/2 left-4 transform -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4">
          {[...Array(9)].map((_, i) => (
            <a 
              key={i}
              href={`#section-${i+1}`}
              onClick={() => setActiveSection(i+1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === i+1 ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Jump to section ${i+1}`}
            />
          ))}
        </nav>
        
        {/* Header */}
        <header className="mb-20 pl-4">
          <div className="relative inline-block">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <div className="absolute -bottom-3 left-0 h-1 w-3/4 bg-gradient-to-r from-gray-600 to-white"></div>
            <div className="absolute -bottom-6 left-0 h-1 w-1/2 bg-gradient-to-r from-gray-700 to-gray-400"></div>
          </div>
          <p className="mt-8 text-lg text-gray-300 max-w-2xl">
            Your privacy matters to us. This policy outlines how Tech HiKE collects, uses, and protects your personal information when you use our services.
          </p>
        </header>
        
        {/* Table of Contents */}
        <div className="mb-16 p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-gray-900/40 to-black/40 border border-gray-800/30 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a 
                key={section.id} 
                href={`#section-${section.id}`}
                className="py-2 px-4 rounded-md hover:bg-gray-800/30 text-gray-300 hover:text-white transition-all duration-300 flex items-center"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-gray-800/50 rounded-full text-sm mr-3 text-white font-medium">{section.id}</span>
                {section.title}
              </a>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="space-y-16">
          {sections.map((section) => (
            <Section 
              key={section.id}
              id={section.id}
              title={section.title}
              content={section.content}
              isComplex={section.isComplex}
              onActive={() => setActiveSection(section.id)}
            />
          ))}
          
          {/* Contact Section */}
          <div id="contact" className="rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-gray-900/70 to-gray-800/40 py-2 px-6">
              <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border-t border-gray-800/30">
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-3">
                <a 
                  href="mailto:techike@gmail.com" 
                  className="group inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="mr-2">techike@gmail.com</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
                <a 
                  href="tel:+918075920705" 
                  className="group inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="mr-2">(+91) 8075920705</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to Home Button */}
        <div className="mt-24 flex justify-center">
          <a 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-md"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-black"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90 ease"></span>
            <span className="relative text-white flex items-center">
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Enhanced Section component with animations and interaction
const Section = ({ id, title, content, isComplex, onActive }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onActive();
        }
      },
      { threshold: 0.3 }
    );
    
    const element = document.getElementById(`section-${id}`);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [id, onActive]);

  return (
    <div 
      id={`section-${id}`}
      className={`rounded-xl overflow-hidden shadow-2xl transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-gradient-to-r from-gray-900/70 to-gray-800/40 py-2 px-6 flex items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gray-300 to-white rounded-full text-black font-bold mr-4">
          {id}
        </span>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border-t border-gray-800/30">
        {isComplex ? (
          <div className="space-y-4 text-gray-300">
            <p dangerouslySetInnerHTML={{ __html: content[0] }}></p>
            <ul className="list-disc pl-8 space-y-2">
              {content[1].map((item, idx) => (
                <li key={idx} className="pl-2" dangerouslySetInnerHTML={{ __html: item }}></li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-300">{content}</p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;