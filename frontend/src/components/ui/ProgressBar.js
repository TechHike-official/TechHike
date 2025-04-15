import React from 'react';

const ProgressBar = ({ progress, theme = 'light', height = 'h-2', className = '' }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full ${height} ${className}`}>
      <div 
        className={`h-full rounded-full transition-all duration-500 ease-out ${
          progress < 30 ? (theme === 'dark' ? 'bg-red-500' : 'bg-red-400') :
          progress < 70 ? (theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400') :
          (theme === 'dark' ? 'bg-green-500' : 'bg-green-400')
        }`}
        style={{ width: `${normalizedProgress}%` }}
        role="progressbar"
        aria-valuenow={normalizedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="sr-only">{normalizedProgress}% complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;