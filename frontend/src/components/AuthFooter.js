import React from 'react';

const AuthFooter = ({ isLogin, toggleAuthMode }) => (
  <div className="text-center text-sm text-gray-600">
    {isLogin ? (
      <>
        Don't have an account?{' '}
        <button
          onClick={toggleAuthMode}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign up
        </button>
      </>
    ) : (
      <>
        Already have an account?{' '}
        <button
          onClick={toggleAuthMode}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </button>
      </>
    )}
  </div>
);

export default AuthFooter;