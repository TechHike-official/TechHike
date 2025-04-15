import React from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const SignupStep2Form = ({
  isGoogleSignup,
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  handleSubmit,
  loading,
  skipAdditionalInfo,
}) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    {!isGoogleSignup && (
      <>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" size={20} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isGoogleSignup}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="text-gray-400" size={20} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="text-gray-400" size={20} />
            ) : (
              <Eye className="text-gray-400" size={20} />
            )}
          </button>
        </div>
      </>
    )}

    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="text-gray-400" size={20} />
        </div>
        <select
          name="howHeard"
          value={formData.howHeard}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">How did you hear about us?</option>
          <option value="Social Media">Social Media</option>
          <option value="Friend">Friend</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          name="occupation"
          placeholder="Occupation (optional)"
          value={formData.occupation}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <div className="space-y-4">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
      >
        {loading ? 'Processing...' : 'Create Account'}
      </button>
      <button
        type="button"
        onClick={skipAdditionalInfo}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200"
      >
        Skip and Continue
      </button>
    </div>
  </form>
);

export default SignupStep2Form;