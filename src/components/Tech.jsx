import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";

import {
  cplusplus,
  python,
  javascript,
  reactjs,
  tailwind,
  html,
  css,
  backend,
  mongodb,
  mysql,
  git,
  kalilinux,
  aws,
  photoshop,
  premiere,
} from "../assets";

const skillCategories = [
  {
    title: "Languages",
    subtitle: "// Core logic",
    skills: [
      { name: "Python", icon: python },
      { name: "C++", icon: cplusplus },
      { name: "JavaScript", icon: javascript },
    ],
  },
  {
    title: "Frontend",
    subtitle: "// UI & Client",
    skills: [
      { name: "React", icon: reactjs },
      { name: "Tailwind", icon: tailwind },
      { name: "HTML5", icon: html },
      { name: "CSS3", icon: css },
    ],
  },
  {
    title: "Backend",
    subtitle: "// Server & Auth",
    skills: [
      { name: "Node.js", icon: backend },
      { name: "Express", icon: backend },
      { name: "Spring Boot", icon: backend },
    ],
  },
  {
    title: "Databases",
    subtitle: "// Storage & VCS",
    skills: [
      { name: "MongoDB", icon: mongodb },
      { name: "MySQL", icon: mysql },
      { name: "Firebase", icon: backend },
      { name: "Supabase", icon: backend },
      { name: "Git", icon: git },
    ],
  },
  {
    title: "Exploration",
    subtitle: "// Beyond code",
    skills: [
      { name: "Cybersecurity", icon: kalilinux },
      { name: "Cloud (AWS)", icon: aws },
      { name: "Data (AI)", icon: python },
      { name: "DSA", icon: cplusplus },
      { name: "Video Edit", icon: premiere },
      { name: "Photoshop", icon: photoshop },
    ],
  },
];

const SkillCard = ({ title, subtitle, skills, index }) => (
  <Tilt
    options={{
      max: 15,
      scale: 1.02,
      speed: 400,
    }}
    className="w-full md:w-[calc(50%-10px)] xl:w-[calc(20%-16px)] flex"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="w-full flex flex-col bg-gradient-to-b from-[#0a0c14] to-[#0f121b] border border-white/[0.04] rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-500 shadow-2xl relative overflow-hidden group"
    >
      {/* Background glow effect on hover */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-white font-bold text-[20px] tracking-wide mb-1 group-hover:text-blue-200 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#8ec5ff]/70 text-[11px] mb-6 font-mono tracking-tight uppercase">
          {subtitle}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-9 h-9 object-contain mb-3 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-white/85 text-[10px] font-semibold tracking-wider uppercase text-center leading-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What I know</p>
        <h2 className={`${styles.sectionHeadText}`}>Skills.</h2>
      </motion.div>

      <div className="mt-14 flex flex-wrap gap-5 justify-center items-stretch">
        {skillCategories.map((category, index) => (
          <SkillCard key={index} index={index} {...category} />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="w-full flex justify-center mt-12"
      >
        <p className="text-secondary/60 italic text-[14px] md:text-[16px] tracking-wide font-light text-center max-w-2xl px-4">
          "First, solve the problem. Then, write the code." <br className="sm:hidden" /> 
          <span className="not-italic font-medium text-[#8ec5ff]/80 block sm:inline sm:ml-2 mt-2 sm:mt-0">— John Johnson</span>
        </p>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");