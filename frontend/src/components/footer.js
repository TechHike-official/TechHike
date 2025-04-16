import React from 'react';
import { Phone, Mail, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10">
      <div className="container mx-auto px-4"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-blue-600 pl-3">Tech HiKE</h3>
            <p className="text-gray-400 mb-4">Professional Web Designing and App Development services tailored to transform your digital presence.</p>
            <a 
              href="/about" 
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
              <li><a href="/terms" className="text-gray-500 hover:text-blue-400 transition duration-300">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-500 hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;