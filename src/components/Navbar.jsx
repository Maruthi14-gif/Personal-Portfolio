import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Styling for the menu button and navicon
  const menuIconStyle = {
    position: 'relative',
    width: '28px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const barCommonStyle = {
    background: 'white',
    display: 'block',
    height: '2px',
    width: '18px',
    borderRadius: '2px',
    position: 'absolute',
    transition: 'all 0.2s ease-out',
  };

  const topBarStyle = {
    ...barCommonStyle,
    top: toggle ? '50%' : '5px',
    transform: toggle ? 'rotate(-45deg)' : 'none',
  };

  const middleBarStyle = {
    ...barCommonStyle,
    opacity: toggle ? 0 : 1,
    top: '50%',
    transition: 'opacity 0.2s ease-out',
  };

  const bottomBarStyle = {
    ...barCommonStyle,
    top: toggle ? '50%' : '15px',
    transform: toggle ? 'rotate(45deg)' : 'none',
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-3 group'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo Icon */}
          <div className="w-11 h-11 border-[2.5px] border-white rounded-xl flex items-center justify-center group-hover:border-blue-400 transition-colors duration-300">
            <span className="text-white font-black text-[22px] tracking-tighter group-hover:text-blue-400 transition-colors duration-300">
              PM
            </span>
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col justify-center">
            <span className="text-white font-extrabold text-[22px] tracking-[0.15em] leading-none mb-[4px] group-hover:text-blue-100 transition-colors duration-300">
              MARUTHI
            </span>
            <span className="text-gray-400 text-[9px] font-bold tracking-[0.15em] leading-none uppercase">
              Full-Stack Web Developer
            </span>
          </div>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10 items-center'>
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={`#${nav.id}`}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="ml-2"
          >
            <a
              href="/P_Maruthi_Resume.pdf"
              download="Maruthi_Resume.pdf"
              className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-[15px] font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-sm flex items-center gap-2 group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Resume
            </a>
          </motion.li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          {/* Menu Icon Toggle */}
          <div style={menuIconStyle} onClick={() => setToggle(!toggle)}>
            <span style={topBarStyle}></span>
            <span style={middleBarStyle}></span>
            <span style={bottomBarStyle}></span>
          </div>

          {/* Menu Items */}
          <motion.div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: toggle ? 1 : 0, scale: toggle ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="w-full mt-2 pt-4 border-t border-white/10"
              >
                <a
                  href="/P_Maruthi_Resume.pdf"
                  download="Maruthi_Resume.pdf"
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white text-[15px] font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
