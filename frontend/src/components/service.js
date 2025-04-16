import React from 'react';
import { Globe, Smartphone, Cloud, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/animation/Animation - 1744795112895.json'; 
const Services = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.general);

  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      icon: Globe
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      icon: Smartphone
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment",
      icon: Cloud
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions for business automation",
      icon: Brain
    }
  ];

  const handleSeeOurWork = () => {
    navigate('/works');
  };

  const textVariants = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  return (
    <div className={`lg:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className={`lg:py-20 py-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <motion.h1
                className={`text-4xl font-bold leading-tight mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Building Digital Solutions That <span className="text-blue-600">Drive Growth</span>
              </motion.h1>
              <motion.p
                className={`lg:text-lg text-sm mb-8 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                We're a trusted software development partner for businesses worldwide. 
                Let us transform your ideas into powerful digital solutions.
              </motion.p>
              <div className="flex space-x-4">
                <Link
                  to="#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Get Started
                </Link>
                <Link to='/works'>
                  <button
                    onClick={handleSeeOurWork}
                    className={`border font-bold py-3 px-6 rounded-lg transition duration-300 ${
                      theme === 'dark'
                        ? 'border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-500'
                        : 'border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    See Our Work
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <Lottie 
                animationData={animationData} 
                loop='False'
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
