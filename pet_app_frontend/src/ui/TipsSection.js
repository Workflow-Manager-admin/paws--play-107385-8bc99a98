import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * TipsSection: Vibrant, accessible scrollable carousel of lively, animated tip cards.
 * Responsive, mobile-friendly horizontal scroll with blush-pink (#F9C6C9) backgrounds,
 * large emoji/pet/icon, big modern font, delightful microinteractions. Fully accessible.
 * 
 * - Mobile-first: uses horizontal scroll and scroll snap.
 * - Desktop: wraps as a grid.
 * - Each card uses blush pink background, big illustration, and modern readable font.
 */
const TIP_CARDS = [
  {
    emoji: "🐾",
    label: "Greet your pet each morning—silly voices encouraged!"
  },
  {
    emoji: "💧",
    label: "Fresh water bowls = happy, healthy pets!"
  },
  {
    emoji: "🎾",
    label: "Play every day—fetch, chase, string, or lasers!"
  },
  {
    emoji: "📷",
    label: "Save goofy pet pics—derp moments become gold forever."
  },
  {
    emoji: "🧼",
    label: "Gentle brush time makes cuddles extra soft."
  },
  {
    emoji: "😺",
    label: "Cat-proof windows! Curiosity is a full-time job."
  },
  {
    emoji: "🆕",
    label: "Celebrate all new tricks—even the silly almosts!"
  },
  {
    emoji: "🏆",
    label: "Dance when your pet wins (even if just 'best snoozer')."
  },
  {
    emoji: "🛏️",
    label: "Sunbeam beds = maximum naps, minimum grumps."
  },
  {
    emoji: "🔊",
    label: "Try playing their favorite music while you're away!"
  }
];

export default function TipsSection() {
  const scrollRef = useRef();

  return (
    <section
      className="tips-section"
      id="tips"
      aria-label="Pet Tips Carousel"
      ref={scrollRef}
      tabIndex={0}
      role="region"
      aria-roledescription="horizontal tips list"
      style={{
        width: "100vw",
        maxWidth: 730,
        margin: "2.2em auto 2.7em auto",
        overflowX: "auto",
        display: "flex",
        flexWrap: "nowrap",
        gap: "0.87em",
        scrollbarWidth: "thin",
        WebkitOverflowScrolling: "touch",
        scrollSnapType: "x mandatory"
      }}
    >
      {TIP_CARDS.map((tip, i) => (
        <motion.div
          key={tip.label}
          className="tip-card"
          tabIndex={0}
          aria-label={`Tip: ${tip.label}`}
          role="group"
          style={{
            background: "#F9C6C9",
            color: "var(--deep-cocoa)",
            fontWeight: 700,
            fontFamily: "'Quicksand','Poppins','Baloo 2',sans-serif",
            fontSize: "1.15em",
            borderRadius: "1.28em",
            minWidth: 210,
            maxWidth: 288,
            flex: "0 0 83vw", // mobile: nearly full width, snappable horizontal
            margin: "0 2px",
            padding: "1.14em 1.3em 1.05em 0.94em",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 3.9px 18px #E87A4190, 0 0.5px 3px #f9c6c9a1",
            scrollSnapAlign: "center",
            outline: "none",
            border: "2.5px solid #F9C6C9",
            cursor: "grab",
            transition: "background 0.24s, box-shadow 0.22s"
          }}
          whileHover={{ scale: 1.07, boxShadow: "0 7px 36px #F9C6C9" }}
          whileFocus={{
            borderColor: "var(--secondary)",
            outline: "4px solid var(--secondary)"
          }}
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.08 * i, duration: 0.52 + i * 0.07 }}
        >
          <motion.span
            role="img"
            aria-hidden="true"
            style={{
              fontSize: "2.62em",
              marginRight: 15,
              display: "inline-block",
              background: "rgba(255,255,255,0.67)",
              borderRadius: "1.7em",
              minWidth: 56,
              minHeight: 56,
              boxShadow: "0 6px 24px #E87A4122",
              outline: "3.2px solid #f2cad2",
              outlineOffset: "-1.2px",
              textAlign: "center",
              alignSelf: "flex-start"
            }}
            animate={{
              scale: [1, 1.15, 0.95, 1.15, 1],
              rotate: [0, -11, 9, -4, 0]
            }}
            transition={{
              duration: 2.2 + (i % 3) * 0.41,
              repeat: Infinity,
              repeatType: "reverse",
              ease: [0.48, 0.11, 0.31, 1],
              delay: 0.05 * i
            }}
          >
            {tip.emoji}
          </motion.span>
          <span
            style={{
              color: "var(--deep-cocoa)",
              textShadow: "0 2.5px 10px #fff9, 0 1px 5px #f9c6c9b1",
              letterSpacing: ".02em",
              fontWeight: 800,
              fontFamily: "'Quicksand','Poppins','Baloo 2',sans-serif",
              fontSize: "clamp(1.05em, 4vw, 1.17em)",
              lineHeight: 1.43,
              wordBreak: "break-word",
              flex: 1
            }}
          >
            {tip.label}
          </span>
        </motion.div>
      ))}
    </section>
  );
}
