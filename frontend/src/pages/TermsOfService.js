import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Section = ({ id, title, content, isComplex, onActive }) => {
  useEffect(() => {
    const section = document.getElementById(`section-${id}`);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive();
      },
      { threshold: 0.5 }
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, [id, onActive]);

  return (
    <section id={`section-${id}`}>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      {isComplex ? (
        <div className="space-y-4">
          {content.map((item, index) =>
            Array.isArray(item) ? (
              <ul key={index} className="list-disc list-inside ml-4 space-y-1">
                {item.map((li, idx) => (
                  <li key={idx}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={index}>{item}</p>
            )
          )}
        </div>
      ) : (
        <p>{content}</p>
      )}
    </section>
  );
};

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content: "By accessing or using services provided by Tech HiKE, you acknowledge..."
    },
    {
      id: 2,
      title: "Services Description",
      content: "Tech HiKE provides web development, mobile application development..."
    },
    {
      id: 3,
      title: "Project Timeline & Delivery",
      content: "All project timelines are estimates based on the scope defined..."
    },
    {
      id: 4,
      title: "Payment Terms",
      isComplex: true,
      content: [
        "4.1 Our standard payment schedule is:",
        ["50% upfront", "25% on milestones", "25% on final delivery"],
        "4.2 All invoices payable within 14 days.",
        "4.3 Late payments may result in suspension."
      ]
    },
    {
      id: 5,
      title: "Intellectual Property Rights",
      content: "Upon full payment, the client will own all rights to final deliverables..."
    },
    {
      id: 6,
      title: "Confidentiality",
      content: "Tech HiKE agrees to keep all client information confidential..."
    },
    {
      id: 7,
      title: "Limitation of Liability",
      content: "Tech HiKE's liability is limited to the total amount paid for the services..."
    },
    {
      id: 8,
      title: "Termination",
      content: "Either party may terminate the agreement with 30 days written notice..."
    },
    {
      id: 9,
      title: "Changes to Terms",
      content: "Tech HiKE reserves the right to modify these Terms of Service at any time..."
    },
    {
      id: 10,
      title: "Governing Law",
      content: "These Terms shall be governed in accordance with the laws of India..."
    }
  ];

  const isLight = theme === 'light';

  return (
    <div className={`${isLight ? 'bg-white text-gray-900' : 'bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white'} min-h-screen relative overflow-hidden`}>
      {/* Optional background effects for dark mode only */}
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2Zy...')] opacity-10"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Scroll Progress Bar */}
      <div className={`fixed top-0 left-0 h-1 ${isLight ? 'bg-blue-400' : 'bg-gradient-to-r from-gray-700 via-white to-gray-700'}`} style={{ width: `${scrollProgress}%` }}></div>

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* Dots Navigation */}
        <nav className="fixed top-1/2 left-4 transform -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4">
          {[...Array(10)].map((_, i) => (
            <a 
              key={i}
              href={`#section-${i + 1}`}
              onClick={() => setActiveSection(i + 1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === i + 1 ? (isLight ? 'bg-black scale-125' : 'bg-white scale-125') : 'bg-gray-600 hover:bg-gray-400'}`}
            />
          ))}
        </nav>

        {/* Header */}
        <header className="mb-20 pl-4">
          <div className="relative inline-block">
            <h1 className={`text-6xl font-extrabold ${isLight ? 'text-gray-900' : 'bg-gradient-to-r from-gray-400 via-white to-gray-300 bg-clip-text text-transparent'}`}>
              Terms of Service
            </h1>
            <div className={`absolute -bottom-3 left-0 h-1 w-3/4 ${isLight ? 'bg-gray-400' : 'bg-gradient-to-r from-gray-500 to-white'}`}></div>
            <div className={`absolute -bottom-6 left-0 h-1 w-1/2 ${isLight ? 'bg-gray-300' : 'bg-gradient-to-r from-gray-600 to-gray-400'}`}></div>
          </div>
          <p className={`mt-8 text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'} max-w-2xl`}>
            Please review our terms carefully. These guidelines govern your use of Tech HiKE services and establish the framework for our professional relationship.
          </p>
        </header>

        {/* TOC */}
        <div className={`mb-16 p-6 rounded-xl ${isLight ? 'bg-gray-100 border border-gray-300 shadow-md' : 'backdrop-blur-lg bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700/30 shadow-lg'}`}>
          <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a 
                key={section.id}
                href={`#section-${section.id}`}
                className={`py-2 px-4 rounded-md transition-all duration-300 flex items-center ${isLight ? 'hover:bg-gray-200 text-gray-800' : 'hover:bg-gray-800/30 text-gray-300 hover:text-white'}`}
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm mr-3 font-medium ${isLight ? 'bg-gray-300 text-black' : 'bg-gray-800/50 text-white'}`}>
                  {section.id}
                </span>
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
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

          {/* Contact */}
          <div id="contact" className="rounded-xl overflow-hidden shadow-2xl">
            <div className={`py-2 px-6 ${isLight ? 'bg-gray-200' : 'bg-gradient-to-r from-gray-900/70 to-gray-800/40'}`}>
              <h2 className="text-2xl font-semibold">Contact Information</h2>
            </div>
            <div className={`p-6 ${isLight ? 'bg-white border-t border-gray-300' : 'bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border-t border-gray-700/30'}`}>
              <p className={`${isLight ? 'text-gray-700' : 'text-gray-300'} mb-4`}>
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <a 
                href="mailto:techike@gmail.com"
                className={`group inline-flex items-center transition-colors duration-300 text-lg font-medium ${isLight ? 'text-blue-600 hover:text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="mr-2">techike@gmail.com</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-24 flex justify-center">
          <a 
            href="/"
            className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md ${isLight ? 'bg-gray-900 text-white hover:bg-black' : 'text-gray-100'}`}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
