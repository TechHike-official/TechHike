import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white border-l-4 border-blue-600 pl-3">
              Tech<span className="text-blue-500">Hike</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional Web Development, Custom Software Engineering, and Mobile App solutions tailored to elevate and transform digital enterprises.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
            >
              Learn more about us 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white border-l-4 border-blue-600 pl-3">Services</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Web Development', path: '/services' },
                { name: 'Mobile Applications', path: '/services' },
                { name: 'UI/UX Design', path: '/services' },
                { name: 'Tech Consulting', path: '/services' },
              ].map((svc, idx) => (
                <li key={idx}>
                  <Link to={svc.path} className="flex items-center group">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                    <span className="group-hover:text-blue-400 transition-colors">{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white border-l-4 border-blue-600 pl-3">Contact Us</h3>
            <address className="not-italic space-y-3 text-sm">
              <a href="tel:+918075920705" className="flex items-center hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                <span>(+91) 8075920705</span>
              </a>
              <a href="mailto:techhikeofficial@gmail.com" className="flex items-center hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
                <span>techhikeofficial@gmail.com</span>
              </a>
            </address>
            
            <div className="pt-2">
              <h4 className="font-semibold mb-3 text-white text-sm">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} TECH HIKE. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
