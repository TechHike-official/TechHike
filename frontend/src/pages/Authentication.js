// src/AuthPage.js
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Import auth service functions
import { checkEmailExists, login, signup, googleLogin } from '../services/authService'

// Import components (assumed to exist)
import AuthHeader from '../components/AuthHeader'
import ErrorMessage from '../components/ErrorMessage'
import LoginForm from '../components/LoginForm'
import SignupStep1Form from '../components/SignupStep1Form'
import SignupStep2Form from '../components/SignupStep2Form'
import EmailExistsMessage from "../components/EmailExistsMessage"
import AuthFooter from '../components/AuthFooter'
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';



const AuthPage = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    howHeard: '',
    occupation: '',
    googleId: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate()

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSignUpStep(1);
    setIsGoogleSignup(false);
    setEmailExists(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      try {
        setLoading(true);
        const data = await login(formData.email, formData.password);
        localStorage.setItem('token', data.token); // Still store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(loginUser({ token: data.token, user: data.user })); // Update Redux state
        console.log('Login successful', data);
        navigate('/dashboard')
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (signUpStep === 1) {
        try {
          setLoading(true);
          const data = await checkEmailExists(formData.email);
          setEmailExists(data.exists);
          setSignUpStep(2);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const payload = isGoogleSignup
            ? {
                email: formData.email,
                name: formData.name,
                howHeard: formData.howHeard,
                occupation: formData.occupation,
                googleId: formData.googleId,
              }
            : {
                email: formData.email,
                name: formData.name,
                password: formData.password,
                howHeard: formData.howHeard,
                occupation: formData.occupation,
              };
          const data = await signup(payload, isGoogleSignup);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch(loginUser({ token: data.token, user: data.user })); // Update Redux state
          console.log('Registration successful', data);
          navigate('/dashboard')
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, sub: googleId, name } = decoded;
      setFormData({
        ...formData,
        email,
        name: name || '',
        googleId,
      });
      setLoading(true);

      const emailCheck = await checkEmailExists(email);
      if (emailCheck.exists) {
        if (isLogin) {
          const loginData = await googleLogin(googleId, email);
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('user', JSON.stringify(loginData.user));
          dispatch(loginUser({ token: loginData.token, user: loginData.user })); // Update Redux state
          console.log('Google login successful', loginData);
          navigate('/dashboard')
        } else {
          setEmailExists(true);
          setSignUpStep(2);
        }
      } else {
        setIsGoogleSignup(true);
        setSignUpStep(2);
        if (isLogin) {
          setIsLogin(false);
        }
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setError(error.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.log('Google auth failed');
    setError('Google authentication failed');
  };

  const skipAdditionalInfo = async () => {
    const payload = isGoogleSignup
      ? {
          email: formData.email,
          name: formData.name,
          googleId: formData.googleId,
        }
      : {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        };
    try {
      const data = await signup(payload, isGoogleSignup);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(loginUser({ token: data.token, user: data.user })); // Update Redux state
      console.log('Registration successful', data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              {/* Your logo here */}
            </div>

            <AuthHeader isLogin={isLogin} signUpStep={signUpStep} emailExists={emailExists} />
            <ErrorMessage error={error} />

            {emailExists && !isLogin ? (
              <EmailExistsMessage toggleAuthMode={toggleAuthMode} />
            ) : isLogin ? (
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleSubmit={handleSubmit}
                loading={loading}
                handleGoogleSuccess={handleGoogleSuccess}
                handleGoogleError={handleGoogleError}
              />
            ) : signUpStep === 1 ? (
              <SignupStep1Form
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                loading={loading}
                handleGoogleSuccess={handleGoogleSuccess}
                handleGoogleError={handleGoogleError}
              />
            ) : (
              <SignupStep2Form
                isGoogleSignup={isGoogleSignup}
                formData={formData}
                handleInputChange={handleInputChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleSubmit={handleSubmit}
                loading={loading}
                skipAdditionalInfo={skipAdditionalInfo}
              />
            )}

            <AuthFooter isLogin={isLogin} toggleAuthMode={toggleAuthMode} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthPage;