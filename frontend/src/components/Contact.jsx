import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Phone, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Contact = () => {
  const { theme } = useSelector((state) => state.general);
  const isDark = theme === 'dark';

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
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [touched, setTouched] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (submitStatus !== 'loading') {
      setIsModalOpen(false);
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
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setSubmitStatus('loading');
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setSubmitStatus('success');
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
        setSubmitStatus('error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldError = validate({ ...formData, [name]: value })[name];
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validate(formData)[name];
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  return (
    <section id="contact" className={`py-16 sm:py-24 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20 mb-4">
          <span>Let's Connect</span>
        </div>
        
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Have a Project in Mind?
        </h2>
        
        <p className={`max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Whether you need a custom web application, cloud solution, or technical advice, our engineering team is ready to assist.
        </p>

        <button 
          onClick={openModal}
          className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Contact Us Today</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-100 text-slate-800'
          }`}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold">Send Us a Message</h3>
              <button 
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">Message Sent!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Thank you for reaching out. We will respond within 24 hours.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Message *</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your project or inquiry..."
                      className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    {submitStatus === 'loading' ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
