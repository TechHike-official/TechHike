import React from "react";
import { Wrench, Clock, Mail } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="lg:min-h-screen h-[80vh] bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl  p-6 sm:p-8 md:p-10 text-center">
        {/* Maintenance Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <Wrench className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-600 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          We're Under Maintenance
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
          Our team is working hard to improve your experience. Some services are
          temporarily unavailable, but we'll be back soon with exciting updates!
        </p>

        {/* Status Message */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm md:text-base text-blue-700 font-medium">
            Estimated completion: <span className="font-semibold">May 17, 2025</span>
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Need assistance? Reach out to us!
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            Contact Support
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Tech Hike. All rights reserved.
        </div>
      </div>

      {/* Custom Animation for Spin */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;