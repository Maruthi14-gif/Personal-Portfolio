import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Cpu, 
  Sparkles,
  TrendingUp,
  ChevronDown
} from "lucide-react";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceRow = ({ exp, index, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 py-6 last:border-0 transition-colors">
      {/* Header Row (Always Visible) */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none group"
        onClick={onClick}
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Calendar Badge */}
          <div className="flex items-center gap-1.5 text-xs text-white/50 font-semibold bg-white/5 px-3 py-1.5 rounded-full border border-white/5 h-fit mt-1">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>{exp.date}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {exp.title}
              </h3>
              <span className="text-secondary/30 hidden sm:inline">•</span>
              <span className="text-purple-400 font-bold text-sm md:text-base">
                {exp.company_name}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-white/40 text-xs mt-1 font-medium">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          {/* Status Badge */}
          {exp.status === "current" && (
            <span className="px-2.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/15 border border-purple-500/30 text-purple-400 uppercase tracking-wider">
              Current
            </span>
          )}
          {exp.status === "ongoing" && (
            <span className="px-2.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
              Ongoing
            </span>
          )}
          
          {/* Chevron Toggle Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/5 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 flex items-center justify-center text-white/70 group-hover:text-purple-300 transition-all"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Details Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { height: { duration: 0.35, ease: "easeOut" }, opacity: { duration: 0.25, delay: 0.1 } } 
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.3, ease: "easeIn" }, opacity: { duration: 0.15 } } 
            }}
            className="overflow-hidden"
          >
            <div className="pt-6 pl-0 md:pl-6 max-w-[800px] flex flex-col gap-6">
              
              {/* Highlights */}
              {exp.highlights && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 opacity-40">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[9px] text-white uppercase tracking-widest font-bold">Key Accomplishments</span>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-400 leading-relaxed">
                        <span className="text-purple-500 font-extrabold mt-0.5">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact Box */}
              {exp.impact && (
                <div className="bg-purple-950/15 border border-purple-900/20 rounded-xl p-4 shadow-inner">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider">Measurable Impact</span>
                  </div>
                  <p className="text-xs md:text-sm text-purple-100/90 font-medium leading-relaxed">
                    {exp.impact}
                  </p>
                </div>
              )}

              {/* Tech Stack Badges */}
              {exp.technologies && (
                <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1.5 opacity-40">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[9px] text-white uppercase tracking-widest font-bold">Technologies Used</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-1 rounded bg-white/5 border border-white/5 text-purple-300 hover:border-purple-500/30 transition-colors"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Experience = () => {
  const [openIndex, setOpenIndex] = useState(0); // Open first one by default

  return (
    <div className="relative py-16">
      {/* Background Aurora Blurs */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={textVariant()} className="text-center mb-16 md:mb-20">
          <p className={`${styles.sectionSubText}`}>My professional journey</p>
          <h2 className={`${styles.sectionHeadText}`}>Work Experience.</h2>
        </motion.div>

        {/* Elegant Accordion List Wrapper */}
        <div className="bg-[#0d0f1b]/30 backdrop-blur-xl border border-white/[0.04] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <ExperienceRow 
                key={`experience-${index}`}
                exp={exp}
                index={index}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");