import React from 'react';
import { motion } from 'motion/react';
import { Rabbit } from 'lucide-react';


export default function BouncingLogo({
  size = 36,
  color = "#ffffff",
  bgPrimary = "#06b6d4",
  bgSecondary = "#0ea5a4",
  ariaLabel = "Rabbit logo",
}) {
const bounceVariant = {
animate: {
y: [0, -18, 0],
scale: [1, 1.06, 1],
transition: {
duration: 1.2,
ease: [0.25, 0.46, 0.45, 0.94],
repeat: 0,
    },
  },
};

  const hoverTap = {
    whileHover: { scale: 1.08, rotate: 6 },
    whileTap: { scale: 0.96, rotate: -2 },
  };

  return (
    <motion.div
      className="inline-block"
      role="img"
      aria-label={ariaLabel}
      initial={false}
      animate="animate"
      variants={bounceVariant}
      {...hoverTap}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        width={size + 24}
        height={size + 24}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" x2="1">
            <stop offset="0" stopColor={bgPrimary} />
            <stop offset="1" stopColor={bgSecondary} />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12"/>
          </filter>
        </defs>

        <g filter="url(#softShadow)">
          <motion.circle
            cx="50"
            cy="44"
            r="34"
            fill="url(#bgGrad)"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          />
        </g>

        <g transform="translate(50,40)">
            <Rabbit/>
        </g>

        <motion.ellipse
          cx="50"
          cy="86"
          rx="28"
          ry="6"
          fill="#000"
          opacity={0.12}
          animate={{ scaleX: [1, 0.85, 1], opacity: [0.12, 0.06, 0.12] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6 }}
        />
      </svg>

      {/* Render the Rabbit icon on top using lucide-react so it scales crisply */}
      <div
        className="absolute left-0 top-0 flex items-center justify-center"
        style={{ width: size + 24, height: size + 24, pointerEvents: 'none' }}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.9, repeat: loop ? Infinity : 0, repeatDelay: 0.6 }}
        >
          <Rabbit size={size} stroke={color} strokeWidth={2.5} />
        </motion.div>
      </div>
    </motion.div>
  )
};