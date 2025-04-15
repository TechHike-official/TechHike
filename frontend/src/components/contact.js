import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Phone, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [touched, setTouched] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (submitStatus !== 'loading') {
      setIsModalOpen(false);
      // Only reset if we're not in success state already
      if (submitStatus === 'success' || submitStatus === 'error') {
        setSubmitStatus('idle');
      }
    }
  };

  const validate = (data) => {
    const newErrors = {};
    
    if (!data.name.trim()) newErrors.name = "Name is required";
    else if (data.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Please enter a valid email";
    
    if (data.phone && !/^[0-9+\-() ]{10,15}$/.test(data.phone)) newErrors.phone = "Please enter a valid phone number";
    
    if (!data.message.trim()) newErrors.message = "Message is required";
    else if (data.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      // Begin submission
      setSubmitStatus('loading');
      
      // Simulate an API call with a delay
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        // Optional: reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredContact: 'email'
        });
        setTouched({});
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      const fieldError = validate({...formData, [name]: value})[name];
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate just this field
    const fieldError = validate(formData)[name];
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Have a question or want to work together? We'd love to hear from you.
          </p>
          <button 
            onClick={openModal}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <MessageSquare size={20} />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Modal Content - Reduced size */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">Your message has been sent successfully. We'll be in touch soon.</p>
                  <button 
                    onClick={() => {
                      setSubmitStatus('idle');
                      closeModal();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Something Went Wrong</h3>
                  <p className="text-gray-600 mb-4">We couldn't send your message. Please try again later.</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1 text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1 text-sm font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-1 text-sm font-medium">
                        Phone (optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <Phone size={16} />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="(+91)000650326"
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-1 text-sm font-medium">
                        Subject
                      </label>
                      <select
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1 text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-2 left-3 text-gray-500">
                        <MessageSquare size={16} />
                      </div>
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="Your message here..."
                        required
                      ></textarea>
                    </div>
                    {errors.message && touched.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-700 text-sm font-medium mb-1">Preferred Contact Method</p>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="preferredContact" 
                          value="email" 
                          checked={formData.preferredContact === 'email'}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="preferredContact" 
                          value="phone"
                          checked={formData.preferredContact === 'phone'} 
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Phone</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 disabled:bg-blue-400"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-2">
                    By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;