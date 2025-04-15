import React, { useState } from 'react';
import { Phone, Mail, Twitter, Linkedin, Instagram, ArrowRight, X } from 'lucide-react';

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const openAboutModal = (e) => {
    e.preventDefault();
    setShowAboutModal(true);
  };

  const closeAboutModal = () => {
    setShowAboutModal(false);
  };

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10">
      <div className="container mx-auto px-4"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-blue-600 pl-3">Tech HiKE</h3>
            <p className="text-gray-400 mb-4">Professional Web Designing and App Development services tailored to transform your digital presence.</p>
            <a 
              href="#" 
              onClick={openAboutModal} 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition duration-300"
            >
              Learn more about us 
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-blue-600 pl-3">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="/services/web-development" className="flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-blue-300 transition duration-300">Web Development</span>
                </a>
              </li>
              <li>
                <a href="/services/mobile-apps" className="flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-blue-300 transition duration-300">Mobile Applications</span>
                </a>
              </li>
              <li>
                <a href="/services/ui-ux" className="flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-blue-300 transition duration-300">UI/UX Design</span>
                </a>
              </li>
              <li>
                <a href="/services/Tech Consulting" className="flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  <span className="group-hover:text-blue-300 transition duration-300">Tech Consulting</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-blue-600 pl-3">Contact Us</h3>
            <address className="not-italic space-y-4">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>(+91) 8075920705</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>techhikeofficial@gmail.com</span>
              </p>
            </address>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-800" />

        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Tech HiKE (All rights reserved).</p>
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-6">
              <li><a href="#" onClick={openTermsModal} className="text-gray-500 hover:text-blue-400 transition duration-300">Terms of Service</a></li>
              <li><a href="#" onClick={openPrivacyModal} className="text-gray-500 hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-blue-400">About Tech HiKE</h2>
              <button 
                onClick={closeAboutModal}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">Our Mission</h3>
                <p className="text-gray-300">
                  At Tech HiKE, we are dedicated to empowering businesses through innovative digital solutions. 
                  We transform ideas into powerful digital experiences that drive growth and success.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">Our Digital Solutions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-5 rounded-lg transition duration-300 hover:bg-gray-700">
                    <h4 className="text-blue-400 font-semibold mb-2">Custom Web Applications</h4>
                    <p className="text-gray-300">Tailor-made web solutions designed to streamline your business processes and enhance user experience.</p>
                  </div>
                  
                  <div className="bg-gray-800 p-5 rounded-lg transition duration-300 hover:bg-gray-700">
                    <h4 className="text-blue-400 font-semibold mb-2">E-Commerce Solutions</h4>
                    <p className="text-gray-300">Robust online stores with secure payment gateways, inventory management, and seamless user journeys.</p>
                  </div>
                  
                  <div className="bg-gray-800 p-5 rounded-lg transition duration-300 hover:bg-gray-700">
                    <h4 className="text-blue-400 font-semibold mb-2">Mobile App Development</h4>
                    <p className="text-gray-300">Native and cross-platform apps that provide exceptional performance across all devices.</p>
                  </div>
                  
                  <div className="bg-gray-800 p-5 rounded-lg transition duration-300 hover:bg-gray-700">
                    <h4 className="text-blue-400 font-semibold mb-2">Digital Transformation</h4>
                    <p className="text-gray-300">Strategic consulting and implementation services to modernize your business operations.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Expert team with industry experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Client-centric approach with transparent communication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Cutting-edge technologies and industry best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Flexible engagement models tailored to your needs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 p-6 flex justify-end">
              <button 
                onClick={closeAboutModal}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-blue-400">Terms of Service</h2>
              <button 
                onClick={closeTermsModal}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">1. Acceptance of Terms</h3>
                <p className="text-gray-300">
                  By accessing or using services provided by Tech HiKE, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">2. Services Description</h3>
                <p className="text-gray-300">
                  Tech HiKE provides web development, mobile application development, UI/UX design, and other digital services 
                  as outlined in our service agreements. The specific deliverables, timelines, and costs will be detailed in individual project proposals.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">3. Project Timeline & Delivery</h3>
                <p className="text-gray-300">
                  All project timelines are estimates based on the scope defined in the agreement. Tech HiKE commits to reasonable efforts 
                  to meet agreed deadlines. Delays caused by client feedback, change requests, or factors outside our control may affect the final delivery date.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">4. Payment Terms</h3>
                <div className="text-gray-300 space-y-2">
                  <p>4.1 Our standard payment schedule is:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>50% upfront payment before project initiation</li>
                    <li>25% upon completion of development milestones</li>
                    <li>25% prior to final delivery/launch</li>
                  </ul>
                  <p>4.2 All invoices are payable within 14 days of receipt unless otherwise specified.</p>
                  <p>4.3 Late payments may result in work suspension until accounts are settled.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">5. Intellectual Property Rights</h3>
                <p className="text-gray-300">
                  Upon full payment of all invoices, the client will own all rights to the final deliverables, 
                  except for third-party components which may be subject to their own licenses. Tech HiKE reserves the right 
                  to showcase the work in our portfolio unless explicitly agreed otherwise.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">6. Confidentiality</h3>
                <p className="text-gray-300">
                  Tech HiKE agrees to keep all client information confidential and will not disclose any proprietary information 
                  to third parties without explicit permission. This includes business strategies, user data, and proprietary technologies.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">7. Limitation of Liability</h3>
                <p className="text-gray-300">
                  Tech HiKE's liability is limited to the total amount paid for the specific services. We are not liable for indirect, 
                  consequential, or incidental damages arising from the use of our services.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">8. Termination</h3>
                <p className="text-gray-300">
                  Either party may terminate the service agreement with 30 days written notice. The client remains responsible for 
                  payment of services rendered up to the termination date. Early termination fees may apply as outlined in the service agreement.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">9. Changes to Terms</h3>
                <p className="text-gray-300">
                  Tech HiKE reserves the right to modify these Terms of Service at any time. Changes will be effective upon posting to our website. 
                  Continued use of our services after such modifications constitutes acceptance of the updated terms.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">10. Governing Law</h3>
                <p className="text-gray-300">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India, 
                  without regard to its conflict of law provisions.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">Contact Information</h3>
                <p className="text-gray-300">
                  For any questions regarding these Terms of Service, please contact us at:
                </p>
                <p className="text-blue-400">techike@gmail.com</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 p-6 flex justify-end">
              <button 
                onClick={closeTermsModal}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-blue-400">Privacy Policy</h2>
              <button 
                onClick={closePrivacyModal}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">1. Introduction</h3>
                <p className="text-gray-300">
                  At Tech HiKE, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">2. Information We Collect</h3>
                <div className="text-gray-300 space-y-2">
                  <p>We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><span className="font-medium">Personal Information:</span> Name, email address, phone number, and other contact details when you communicate with us or sign up for our services.</li>
                    <li><span className="font-medium">Technical Data:</span> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and other technology on the devices you use to access our website.</li>
                    <li><span className="font-medium">Usage Data:</span> Information about how you use our website and services.</li>
                    <li><span className="font-medium">Marketing and Communications Data:</span> Your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">3. How We Use Your Information</h3>
                <div className="text-gray-300 space-y-2">
                  <p>We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To provide and maintain our services</li>
                    <li>To notify you about changes to our services</li>
                    <li>To allow you to participate in interactive features of our services</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information to improve our services</li>
                    <li>To monitor the usage of our services</li>
                    <li>To detect, prevent and address technical issues</li>
                    <li>To provide you with news, special offers and general information about other goods, services and events which we offer</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">4. Data Security</h3>
                <p className="text-gray-300">
                  The security of your data is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. 
                  However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">5. Cookies</h3>
                <p className="text-gray-300">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">6. Third-Party Services</h3>
                <p className="text-gray-300">
                  Our service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. 
                  We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">7. Your Data Protection Rights</h3>
                <div className="text-gray-300 space-y-2">
                  <p>Depending on your location, you may have the following data protection rights:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The right to access, update or delete the information we have on you</li>
                    <li>The right of rectification - the right to have your information rectified if it is inaccurate or incomplete</li>
                    <li>The right to object - the right to object to our processing of your personal data</li>
                    <li>The right of restriction - the right to request that we restrict the processing of your personal information</li>
                    <li>The right to data portability - the right to receive a copy of your personal data in a structured, machine-readable format</li>
                    <li>The right to withdraw consent - the right to withdraw your consent at any time where we relied on your consent to process your personal information</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">8. Changes to This Privacy Policy</h3>
                <p className="text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy. 
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">9. Children's Privacy</h3>
                <p className="text-gray-300">
                  Our services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. 
                  If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">Contact Information</h3>
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-blue-400">techike@gmail.com</p>
                <p className="text-gray-300">(+91) 8075920705</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 p-6 flex justify-end">
              <button 
                onClick={closePrivacyModal}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;