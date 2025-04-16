import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectPercentageSelector({ initialPercentage = 65, onUpdate }) {
  const [percentage, setPercentage] = useState(initialPercentage);
  const [isEditing, setIsEditing] = useState(false);
  
  const percentageOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === 'admin';

  const handleChange = (e) => {
    setPercentage(parseInt(e.target.value));
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(percentage);
    }
    setIsEditing(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${percentage}%`,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="bg-gray-50 p-4 rounded-lg mb-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium text-gray-900">Project Completion</h3>
        <AnimatePresence mode="wait">
          {!isEditing && isAdmin && (
            <motion.button 
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              Change
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-4">
              <motion.select
                value={percentage}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                whileFocus={{ scale: 1.02 }}
              >
                {percentageOptions.map(value => (
                  <option key={value} value={value}>{value}%</option>
                ))}
              </motion.select>
              <motion.button
                onClick={handleUpdate}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <motion.span 
                className="font-medium"
                key={percentage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {percentage}%
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                className={`${getProgressColor(percentage)} h-2.5 rounded-full`}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
                key={percentage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper function to determine progress bar color based on percentage
function getProgressColor(percentage) {
  if (percentage < 25) return 'bg-red-500';
  if (percentage < 50) return 'bg-yellow-500';
  if (percentage < 75) return 'bg-blue-600';
  return 'bg-green-600';
}