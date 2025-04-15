import React from 'react';

const EmailExistsMessage = ({ toggleAuthMode }) => (
  <button
    onClick={toggleAuthMode}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
  >
    Go to Sign In
  </button>
);

export default EmailExistsMessage;