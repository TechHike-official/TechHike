import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, ArrowRight } from 'lucide-react';

const SignupStep1Form = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  handleGoogleSuccess,
  handleGoogleError,
}) => (
  <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="text-gray-400" size={20} />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
      >
        {loading ? 'Processing...' : (
          <>
            Continue <ArrowRight className="ml-2" size={18} />
          </>
        )}
      </button>
    </form>

    <div className="my-6 flex items-center">
      <div className="flex-1 border-t border-gray-200"></div>
      <span className="px-3 text-gray-500 text-sm">OR</span>
      <div className="flex-1 border-t border-gray-200"></div>
    </div>

    <div className="flex justify-center mb-6">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        shape="pill"
        size="large"
        text="signup_with"
      />
    </div>
  </>
);

export default SignupStep1Form;