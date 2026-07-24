import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const { theme } = useSelector((state) => state.general);
  const isDark = theme === 'dark';

  const technologies = [
    { name: 'React', category: 'Frontend', color: 'from-cyan-500 to-blue-500' },
    { name: 'JavaScript', category: 'Language', color: 'from-amber-400 to-yellow-500' },
    { name: 'Node.js', category: 'Backend', color: 'from-emerald-500 to-green-600' },
    { name: 'Express.js', category: 'Framework', color: 'from-slate-600 to-slate-800' },
    { name: 'MongoDB', category: 'Database', color: 'from-emerald-600 to-teal-700' },
    { name: 'Flutter', category: 'Mobile', color: 'from-blue-400 to-cyan-600' },
    { name: 'Next.js', category: 'Fullstack', color: 'from-slate-700 to-slate-900' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'from-cyan-400 to-blue-600' }
  ];

  return (
    <section className={`py-16 sm:py-20 border-t border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
            <span>Modern Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Powered by Cutting-Edge Technologies
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            We leverage industry-proven tools and frameworks to build resilient, scalable software applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className={`p-5 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center cursor-pointer ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br ${tech.color} text-white font-bold text-lg shadow-md`}>
                {tech.name.charAt(0)}
              </div>
              <h3 className="font-bold text-base">{tech.name}</h3>
              <span className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
