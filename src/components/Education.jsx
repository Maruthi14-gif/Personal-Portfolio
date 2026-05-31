import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  BookOpen, 
  Sparkles,
  Award
} from "lucide-react";

import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const EducationItem = ({ edu, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col lg:grid lg:grid-cols-[180px_20px_1fr] gap-0 items-start w-full group pb-12 last:pb-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 1. Date Column (Desktop Only) */}
      <div className="hidden lg:block text-right pr-8 pt-1 text-sm font-bold text-purple-300/60 font-mono uppercase tracking-wider group-hover:text-purple-400 transition-colors duration-300">
        {edu.date}
      </div>

      {/* 2. Timeline Line & Node Dot */}
      <div className="absolute left-[9px] md:left-[13px] lg:static lg:h-full lg:flex lg:justify-center lg:items-start lg:pt-1">
        <motion.div 
          animate={{
            scale: hovered ? 1.3 : 1,
            borderColor: hovered ? "#a855f7" : "#5b21b6",
            boxShadow: hovered 
              ? "0 0 16px rgba(168, 85, 247, 0.8)" 
              : "0 0 8px rgba(139, 92, 246, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-4 h-4 rounded-full bg-[#0a0c16] border border-purple-800 flex items-center justify-center relative z-20"
        >
          <motion.div 
            animate={{
              scale: hovered ? 1.2 : 1,
              backgroundColor: hovered ? "#c084fc" : "#915eff"
            }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500" 
          />
        </motion.div>
      </div>

      {/* 3. Description Column (Card/Content) */}
      <div className="pl-10 md:pl-16 lg:pl-8 w-full flex-1">
        <motion.div
          variants={fadeIn("up", "spring", index * 0.15, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full max-w-[780px] rounded-2xl p-5 md:p-6 bg-[#0d0f1b]/40 backdrop-blur-xl border border-white/[0.04] hover:border-purple-500/20 hover:bg-[#111326]/40 transition-all duration-400 shadow-xl relative overflow-hidden"
          whileHover={{
            y: -4,
            boxShadow: "0 15px 35px rgba(139, 92, 246, 0.06), 0 0 20px rgba(139, 92, 246, 0.02)"
          }}
        >
          {/* Glow Overlay */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

          {/* Header row (Mobile date + Status) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* Mobile-only Date */}
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-semibold bg-white/5 px-2.5 py-1 rounded-md border border-white/5 lg:hidden">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{edu.date}</span>
            </div>

            {/* CGPA Badge */}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/20 text-purple-300">
              {edu.cgpa}
            </span>
          </div>

          {/* Title / Degree */}
          <h3 className="text-lg md:text-xl font-extrabold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
            {edu.title}
          </h3>

          {/* Institution / College */}
          <div className="flex flex-wrap items-center gap-3 text-secondary text-xs md:text-sm font-semibold mb-4">
            <span className="text-purple-400 font-bold">{edu.company_name}</span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1 text-white/50 font-medium">
              <MapPin className="w-3 h-3 text-white/40" />
              {edu.location}
            </span>
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
    </div>
  );
};

const Education = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.002
  });

  const heightPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
        <div className="relative w-full max-w-4xl mx-auto flex flex-col px-4">
          
          {/* Static Background Timeline Line */}
          <div className="absolute left-5 md:left-9 lg:left-[189px] top-0 bottom-0 w-[2px] bg-white/[0.06] pointer-events-none z-0" />

          {/* Active / Glowing Scroll Timeline Line */}
          <motion.div 
            style={{ height: heightPercent }}
            className="absolute left-5 md:left-9 lg:left-[189px] top-0 w-[2px] bg-gradient-to-b from-[#915EFF] via-purple-500 to-[#804dee] origin-top pointer-events-none z-10 shadow-[0_0_8px_rgba(145,94,255,0.4)]"
          />

          {/* Render Education Cards */}
          <div className="flex flex-col w-full relative z-10">
            {education.map((edu, index) => (
              <EducationItem 
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