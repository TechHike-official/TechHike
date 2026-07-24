import React from 'react';
import { Globe, Smartphone, Cloud, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/animation/Animation - 1744795112895.json';

const Services = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.general);
  const isDark = theme === 'dark';

  const services = [
    {
      title: "Web Development",
      description: "Custom, high-performance web applications built with modern frontend & backend frameworks.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Mobile Development",
      description: "Seamless cross-platform iOS and Android mobile apps crafted for smooth user experiences.",
      icon: Smartphone,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture, DevOps automation, continuous integration & security.",
      icon: Cloud,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "AI & Automation",
      description: "Intelligent AI models, machine learning, and automated business workflow integration.",
      icon: Brain,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className={`py-12 lg:py-24 transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 lg:mb-24">
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <span>Next-Gen Engineering</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Building Digital Solutions That <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">Drive Growth</span>
            </h1>

            <p className={`text-lg sm:text-xl font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              We are a trusted digital transformation partner for businesses worldwide. 
              We engineer custom software, web platforms, and mobile apps that elevate your brand.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => navigate('/works')}
                className={`px-7 py-3.5 rounded-xl font-semibold border transition-all duration-200 active:scale-95 ${
                  isDark
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-white hover:shadow-md'
                }`}
              >
                Explore Services
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
              <Lottie 
                animationData={animationData} 
                loop={true}
                className="relative z-10 w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700/60 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                    : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-tr ${svc.color} text-white shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {svc.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {svc.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Services;
