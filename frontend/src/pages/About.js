import React, { useState, useEffect } from "react";
import { GithubIcon, Mail, Globe, Code, Coffee, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.general);

  const developers = [
    {
      name: "Anand",
      role: "Software Developer",
      github: "https://github.com/anandhu-12-boo/",
      email: "anand@example.com",
      website: "https://anand.dev",
      bio: "Full-stack developer with expertise in React and Node.js. Passionate about building scalable applications."
    },
    {
      name: "Sojan",
      role: "Software Developer",
      github: "https://github.com/sojanonelson",
      email: "sojan@example.com",
      website: "https://sojanthomas.com",
      bio: "Backend specialist with extensive experience in database architecture and cloud services."
    },
    {
      name: "Azna",
      role: "UI/UX Designer",
      github: "https://github.com/Aznachang",
      email: "azna@example.com",
      website: "https://azna.design",
      bio: "Creative designer focused on creating intuitive user experiences and beautiful interfaces."
    },
    {
      name: "Jerin",
      role: "Software Tester",
      github: "",
      email: "jerin@example.com",
      website: "https://jerin-testing.com",
      bio: "Quality assurance expert ensuring our products meet the highest standards of reliability."
    }
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology.",
      icon: <Code className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Quality",
      description: "Delivering robust, high-standard solutions.",
      icon: <Award className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Collaboration",
      description: "Teamwork drives our success.",
      icon: <Coffee className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "User-Centered",
      description: "Designed with users at the heart.",
      icon: <Heart className="w-8 h-8 text-blue-500" />,
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -10,
      boxShadow: theme === "dark" ? "0 15px 30px rgba(0, 0, 0, 0.4)" : "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} overflow-x-hidden`}>
      {/* Hero Section */}
      <motion.section
        className={`relative py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
            About Our Team
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-10 max-w-3xl mx-auto leading-relaxed`}>
            Crafting innovative, user-centric web solutions with passion and precision since our inception.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/services')}
              className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              Explore Services
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`${theme === 'dark' ? 'bg-transparent border-blue-500 text-blue-400 hover:bg-blue-900' : 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50'} border-2 px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              Get in Touch
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-20 dark:opacity-10 pointer-events-none" />
      </motion.section>

      {/* Company Values */}
      <motion.section
        className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team - Redesigned */}
      <motion.section
        className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            className={`text-4xl sm:text-5xl font-extrabold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className={`text-lg sm:text-xl ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } mb-16 text-center max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Meet the brilliant minds crafting exceptional digital solutions with creativity and expertise.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={index}
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                } rounded-xl overflow-hidden shadow-lg transition-all duration-300`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className="relative group">
                  <div className={`h-40 ${theme === "dark" ? "bg-blue-900" : "bg-blue-600"} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="relative px-6 pb-8 -mt-16">
                    <div className="flex justify-center">
                      <motion.div
                        className={`h-24 w-24 rounded-full border-4 ${
                          theme === "dark" ? "border-gray-700" : "border-white bg-white"
                        } overflow-hidden shadow-lg poppins-bold flex items-center justify-center`}
                        variants={imageVariants}
                      >
                        <span className="text-4xl font-bold">{dev.name.charAt(0)}</span>
                      </motion.div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {dev.name}
                      </h3>
                      <p className={`text-sm font-medium ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      } mt-1`}>
                        {dev.role}
                      </p>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      } mt-3`}>
                        {dev.bio}
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          theme === "dark"
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        } transition-all duration-300 hover:scale-110`}
                        aria-label={`${dev.name}'s GitHub`}
                      >
                        <GithubIcon size={20} />
                      </a>
                    
                      <a
                        href={dev.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          theme === "dark"
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        } transition-all duration-300 hover:scale-110`}
                        aria-label={`${dev.name}'s Website`}
                      >
                        <Globe size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        className={`${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} py-20 px-6 text-white`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Collaborate</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-blue-300' : 'text-blue-100'} mb-8 max-w-2xl mx-auto`}>
            Ready to turn your ideas into reality? We're excited to partner with you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className={`${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-100' : 'bg-white text-blue-600 hover:bg-blue-50'} px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            Contact Us
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
