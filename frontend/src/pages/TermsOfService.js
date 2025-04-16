import React, { useState, useEffect } from 'react';

const TermsOfService = () => {
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
      title: "Acceptance of Terms",
      content: "By accessing or using services provided by Tech HiKE, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      id: 2,
      title: "Services Description",
      content: "Tech HiKE provides web development, mobile application development, UI/UX design, and other digital services as outlined in our service agreements. The specific deliverables, timelines, and costs will be detailed in individual project proposals."
    },
    {
      id: 3,
      title: "Project Timeline & Delivery",
      content: "All project timelines are estimates based on the scope defined in the agreement. Tech HiKE commits to reasonable efforts to meet agreed deadlines. Delays caused by client feedback, change requests, or factors outside our control may affect the final delivery date."
    },
    {
      id: 4,
      title: "Payment Terms",
      isComplex: true,
      content: [
        "4.1 Our standard payment schedule is:",
        ["50% upfront payment before project initiation", "25% upon completion of development milestones", "25% prior to final delivery/launch"],
        "4.2 All invoices are payable within 14 days of receipt unless otherwise specified.",
        "4.3 Late payments may result in work suspension until accounts are settled."
      ]
    },
    {
      id: 5,
      title: "Intellectual Property Rights",
      content: "Upon full payment of all invoices, the client will own all rights to the final deliverables, except for third-party components which may be subject to their own licenses. Tech HiKE reserves the right to showcase the work in our portfolio unless explicitly agreed otherwise."
    },
    {
      id: 6,
      title: "Confidentiality",
      content: "Tech HiKE agrees to keep all client information confidential and will not disclose any proprietary information to third parties without explicit permission. This includes business strategies, user data, and proprietary technologies."
    },
    {
      id: 7,
      title: "Limitation of Liability",
      content: "Tech HiKE's liability is limited to the total amount paid for the specific services. We are not liable for indirect, consequential, or incidental damages arising from the use of our services."
    },
    {
      id: 8,
      title: "Termination",
      content: "Either party may terminate the service agreement with 30 days written notice. The client remains responsible for payment of services rendered up to the termination date. Early termination fees may apply as outlined in the service agreement."
    },
    {
      id: 9,
      title: "Changes to Terms",
      content: "Tech HiKE reserves the right to modify these Terms of Service at any time. Changes will be effective upon posting to our website. Continued use of our services after such modifications constitutes acceptance of the updated terms."
    },
    {
      id: 10,
      title: "Governing Law",
      content: "These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 via-blue-950/30 to-black text-white min-h-screen relative overflow-hidden">
      {/* Background Mesh Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8cGF0aCBkPSJNMzAgMzBDMTUgMzAgMCAxNSAwIDAgMTUgMCAzMCAxNSA2MCAxNSA2MCAwIDQ1IDAgMzAgMHoiIGZpbGw9IiMwMDM3ODAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPgo8L3N2Zz4=')] opacity-10"></div>
      
      {/* Blurred Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* Navigation Dots */}
        <nav className="fixed top-1/2 left-4 transform -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4">
          {[...Array(10)].map((_, i) => (
            <a 
              key={i}
              href={`#section-${i+1}`}
              onClick={() => setActiveSection(i+1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === i+1 ? 'bg-blue-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Jump to section ${i+1}`}
            />
          ))}
        </nav>
        
        {/* Header */}
        <header className="mb-20 pl-4">
          <div className="relative inline-block">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <div className="absolute -bottom-3 left-0 h-1 w-3/4 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <div className="absolute -bottom-6 left-0 h-1 w-1/2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
          </div>
          <p className="mt-8 text-lg text-gray-300 max-w-2xl">
            Please review our terms carefully. These guidelines govern your use of Tech HiKE services and establish the framework for our professional relationship.
          </p>
        </header>
        
        {/* Table of Contents */}
        <div className="mb-16 p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-800/30 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a 
                key={section.id} 
                href={`#section-${section.id}`}
                className="py-2 px-4 rounded-md hover:bg-blue-800/30 text-gray-300 hover:text-cyan-200 transition-all duration-300 flex items-center"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-blue-800/50 rounded-full text-sm mr-3 text-cyan-300 font-medium">{section.id}</span>
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
            <div className="bg-gradient-to-r from-blue-900/70 to-blue-800/40 py-2 px-6">
              <h2 className="text-2xl font-semibold text-cyan-300">Contact Information</h2>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border-t border-blue-800/30">
              <p className="text-gray-300 mb-4">
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <a 
                href="mailto:techike@gmail.com" 
                className="group inline-flex items-center text-blue-400 hover:text-cyan-300 transition-colors duration-300 text-lg font-medium"
              >
                <span className="mr-2">techike@gmail.com</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Back to Home Button */}
        <div className="mt-24 flex justify-center">
          <a 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out rounded-full shadow-md"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-800 to-blue-900"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-cyan-500 opacity-30 group-hover:rotate-90 ease"></span>
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
      <div className="bg-gradient-to-r from-blue-900/70 to-blue-800/40 py-2 px-6 flex items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full text-black font-bold mr-4">
          {id}
        </span>
        <h2 className="text-2xl font-semibold text-cyan-300">{title}</h2>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border-t border-blue-800/30">
        {isComplex ? (
          <div className="space-y-4 text-gray-300">
            <p>{content[0]}</p>
            <ul className="list-disc pl-8 space-y-2">
              {content[1].map((item, idx) => (
                <li key={idx} className="pl-2">{item}</li>
              ))}
            </ul>
            <p>{content[2]}</p>
            <p>{content[3]}</p>
          </div>
        ) : (
          <p className="text-gray-300">{content}</p>
        )}
      </div>
    </div>
  );
};

export default TermsOfService;