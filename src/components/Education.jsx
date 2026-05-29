import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Sparkles,
  CheckCircle,
  Clock
} from "lucide-react";

import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const EducationCard = ({ edu, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col lg:flex-row ${isEven ? "lg:flex-row-reverse" : ""} justify-between items-center w-full mb-12 lg:mb-16`}>
      {/* Spacer for desktop */}
      <div className="hidden lg:block w-[45%]" />

      {/* Progressive Node Dot */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="absolute left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0c16] border-2 border-purple-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)] hover:border-purple-400 transition-all"
        style={{
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 8px rgba(139, 92, 246, 0.2)"
        }}
      >
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-950/40 flex items-center justify-center">
          <img
            src={edu.icon}
            alt={edu.company_name}
            className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-80"
          />
        </div>
      </motion.div>

      {/* Card Content Body */}
      <motion.div
        variants={fadeIn(isEven ? "left" : "right", "spring", index * 0.2, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="w-[calc(100%-48px)] ml-12 md:ml-16 lg:ml-0 lg:w-[45%] rounded-2xl p-5 md:p-6 bg-[#0d0f1b]/60 backdrop-blur-xl border border-white/[0.06] hover:border-purple-500/20 hover:bg-[#111326]/60 transition-all duration-400 shadow-2xl relative group overflow-hidden"
        style={{
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)"
        }}
        whileHover={{
          y: -5,
          boxShadow: "0 15px 35px rgba(139, 92, 246, 0.08), 0 0 20px rgba(139, 92, 246, 0.04)"
        }}
      >
        {/* Glow Overlay */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

        {/* Card Header Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {edu.status === "ongoing" ? (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
              <Clock className="w-3 h-3 animate-pulse" />
              <span>Ongoing</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
              <CheckCircle className="w-3 h-3" />
              <span>Completed</span>
            </span>
          )}

          {/* CGPA / Percentage Pill */}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/20 text-purple-300">
            {edu.cgpa}
          </span>
        </div>

        {/* Title / Degree */}
        <h3 className="text-lg md:text-xl font-extrabold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
          {edu.title}
        </h3>

        {/* Institution / College */}
        <div className="flex flex-wrap items-center gap-3 text-secondary text-xs md:text-sm font-semibold mb-3">
          <span className="text-purple-400 font-bold">{edu.company_name}</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1 text-white/50 font-medium">
            <MapPin className="w-3 h-3 text-white/40" />
            {edu.location}
          </span>
        </div>

        {/* Duration / Calendar */}
        <div className="flex items-center gap-1.5 text-xs text-white/40 font-semibold mb-4 bg-white/5 w-fit px-2.5 py-1 rounded-md border border-white/5">
          <Calendar className="w-3 h-3 text-purple-400" />
          <span>{edu.date}</span>
        </div>

        {/* Relevant Coursework */}
        {edu.coursework && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2 opacity-40">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[9px] text-white uppercase tracking-widest font-bold">Key Coursework</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.map((course, idx) => (
                <span 
                  key={idx}
                  className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-300 hover:border-purple-500/30 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements / Points */}
        {edu.achievements && (
          <div className="border-t border-white/5 pt-3">
            <div className="flex items-center gap-1.5 mb-2 opacity-40">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[9px] text-white uppercase tracking-widest font-bold">Key Milestones</span>
            </div>
            <ul className="space-y-1.5">
              {edu.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-400 leading-normal">
                  <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </motion.div>
    </div>
  );
};

const Education = () => {
  const containerRef = useRef(null);
  
  // Track scroll position of timeline container to draw line progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.002
  });

  return (
    <div ref={containerRef} className="relative py-16">
      
      {/* Background Aurora Blur Orbs */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10">
        
        {/* Header Section */}
        <motion.div variants={textVariant()} className="text-center mb-16 md:mb-20">
          <p className={`${styles.sectionSubText}`}>What I have studied so far</p>
          <h2 className={`${styles.sectionHeadText}`}>Education.</h2>
        </motion.div>

        {/* Vertical Timeline container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col">
          
          {/* Static Background Timeline Line */}
          <div className="absolute left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06] pointer-events-none z-0" />

          {/* Active / Glowing Scroll Timeline Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 origin-top pointer-events-none z-10"
            animate={{
              boxShadow: ["0 0 10px rgba(139,92,246,0.3)", "0 0 16px rgba(139,92,246,0.6)", "0 0 10px rgba(139,92,246,0.3)"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Render Education Cards */}
          <div className="flex flex-col w-full relative z-10">
            {education.map((edu, index) => (
              <EducationCard 
                key={`education-${index}`}
                edu={edu}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");