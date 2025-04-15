import React from 'react';

const AuthHeader = ({ isLogin, signUpStep, emailExists }) => {
  let title, subtitle;

  if (isLogin) {
    title = "Welcome Back";
    subtitle = "Sign in to continue";
  } else if (signUpStep === 1) {
    title = "Create Account";
    subtitle = "Sign up to get started";
  } else if (emailExists) {
    title = "Account Exists";
    subtitle = "This email is already registered. Please sign in.";
  } else {
    title = "Complete Your Profile";
    subtitle = "Tell us more about yourself (optional)";
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-center mb-8">{subtitle}</p>
    </>
  );
};

export default AuthHeader;