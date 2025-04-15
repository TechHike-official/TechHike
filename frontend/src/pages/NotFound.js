import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Frown } from 'lucide-react'; // Using a sad face icon from lucide-react

const NotFound = () => {
  const navigate = useNavigate();

  // Animation variants for the looping effect
  const bounceVariants = {
    animate: {
      y: [0, -20, 0], // Moves up and down
      rotate: [0, 5, -5, 0], // Slight wobble
      transition: {
        y: {
          duration: 1.5,
          repeat: Infinity, // Loops forever
          ease: 'easeInOut',
        },
        rotate: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-black">
      {/* Animated 404 Text and Icon */}
      <motion.div
        className="flex flex-col items-center"
        variants={bounceVariants}
        animate="animate"
      >
        <Frown className="w-24 h-24 text-gray-600 mb-4" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
      </motion.div>

      {/* Message */}
      <p className="text-xl text-gray-600 mt-6 mb-8">
        Oops! The page you're looking for can't be found.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;