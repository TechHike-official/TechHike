import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieConsent');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-700">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 ml-1 underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded transition-colors duration-300"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;