import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { achievements } from "../constants";

const colorMap = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    gradient: "from-emerald-500/10 to-transparent",
    accent: "bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    gradient: "from-blue-500/10 to-transparent",
    accent: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20 group-hover:border-purple-500/40",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    gradient: "from-purple-500/10 to-transparent",
    accent: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20 group-hover:border-amber-500/40",
    text: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    gradient: "from-amber-500/10 to-transparent",
    accent: "bg-amber-500",
  },
};

const renderIcon = (iconName, colorClass) => {
  switch (iconName) {
    case "sports":
      return (
        <svg className={`w-6 h-6 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a4 4 0 0 1 4 4v5c0 1.66-1.34 3-3 3h-2a3 3 0 0 1-3-3V6a4 4 0 0 1 4-4Z" />
        </svg>
      );
    case "coding":
      return (
        <svg className={`w-6 h-6 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case "security":
      return (
        <svg className={`w-6 h-6 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "internship":
      return (
        <svg className={`w-6 h-6 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 3v18h18" />
        </svg>
      );
    default:
      return "🏆";
  }
};

const AchievementCard = ({
  index,
  title,
  category,
  description,
  date,
  icon,
  points,
  color,
}) => {
  const stylesForColor = colorMap[color] || colorMap.blue;

  return (
    <Tilt options={{ max: 15, scale: 1.02, speed: 450 }} className="w-full">
      <motion.div
        variants={fadeIn("up", "spring", index * 0.25, 0.75)}
        className="w-full h-full group"
      >
        <div className={`relative h-full flex flex-col justify-between bg-[#070a13] border ${stylesForColor.border} p-8 rounded-3xl overflow-hidden transition-all duration-300 ${stylesForColor.glow}`}>
          {/* Top colored accent line */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] ${stylesForColor.accent} opacity-60`} />

          {/* Glowing dynamic background element */}
          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${stylesForColor.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />

          <div>
            {/* Header info */}
            <div className="flex justify-between items-center mb-6">
              <div className={`w-12 h-12 rounded-2xl ${stylesForColor.bg} flex items-center justify-center border border-white/[0.03]`}>
                {renderIcon(icon, stylesForColor.text)}
              </div>
              <span className="text-secondary text-[12px] font-mono font-medium py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.06]">
                {date}
              </span>
            </div>

            {/* Title & category */}
            <div className="flex flex-col mb-4">
              <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${stylesForColor.text}`}>
                {category}
              </span>
              <h3 className="text-white font-black text-[22px] tracking-wide leading-tight">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-secondary/90 text-[14.5px] leading-relaxed mb-6 font-medium">
              {description}
            </p>

            {/* Bullet points */}
            <ul className="space-y-3 mt-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13.5px] text-white/70 leading-normal">
                  <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${stylesForColor.accent} shadow-sm`} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Feedbacks = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categoriesList = ["all", "sports", "coding", "security", "internship"];

  const filteredAchievements = activeFilter === "all"
    ? achievements
    : achievements.filter((a) => a.category === activeFilter);

  return (
    <div className="mt-12 bg-gradient-to-b from-[#090b11] to-[#04060b] rounded-[24px] border border-white/[0.02] p-8 md:p-12 overflow-hidden shadow-2xl relative">
      {/* Decorative background grid/dots */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div variants={textVariant()} className="text-center w-full">
          <p className={`${styles.sectionSubText} text-center text-blue-400 font-mono tracking-widest`}>
            My milestones & successes
          </p>
          <h2 className={`${styles.sectionHeadText} text-center mb-6`}>
            Achievements.
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 0.5)}
          className="flex flex-wrap justify-center gap-2 mb-12 bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-2xl relative"
        >
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 text-[13px] font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 relative ${
                activeFilter === cat
                  ? "text-white z-10"
                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeAchievementTab"
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-4 relative z-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full flex"
              >
                <AchievementCard
                  index={index}
                  {...achievement}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "achievements");
