import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
export default function HeroSection({ onAdopt }) {
  return (
    <section className="hero" id="home">
      <div className="hero-headline">
        <motion.span
          style={{ display: "inline-block", marginRight: 6 }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, -8, 10, -8, 1, 0],
          }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-label="Mascot wiggle"
        >
          <svg width="40" height="36" viewBox="0 0 32 32">
            <circle cx="16" cy="22" r="10" fill="#FFB6B6"/>
            <circle cx="7" cy="12" r="5" fill="#B6E1FF"/>
            <circle cx="25" cy="13" r="4" fill="#FFD9B6"/>
            <circle cx="12" cy="6" r="3" fill="#B6FFDE"/>
            <circle cx="21" cy="6.5" r="2.6" fill="#FFB6B6"/>
          </svg>
        </motion.span>
        Adopt, Love, Smile!<br /><span style={{ fontSize: "0.64em", color: "var(--primary)", fontFamily: "'Quicksand',sans-serif" }}>Pexels Edition</span>
      </div>
      <div className="hero-description">
        Swipe through a world of adorable pets<br />
        Collect favorites, earn badges & adopt with joy!<br />
        Every photo powered by Pexels.
      </div>
      <button
        className="hero-btn bouncy"
        style={{
          background: "linear-gradient(94deg, var(--blush-pink), var(--sky-blue) 82%, var(--soft-sage) 95%)",
          color: "var(--deep-cocoa)",
          fontWeight: 800,
          fontSize: "1.18em",
          boxShadow: "0 6px 32px var(--blush-pink), 0 1.5px 12px var(--sky-blue)"
        }}
        onClick={onAdopt}
      >Start Swiping!</button>
    </section>
  );
}
