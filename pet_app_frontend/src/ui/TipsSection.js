import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// Fun, playful Duolingo-style tips with icons/animations
const TIP_DATA = [
  {
    icon: "🐾",
    color: "linear-gradient(105deg, var(--mint), var(--secondary) 90%)",
    text: "Greet your pet each morning—silly voices encouraged!",
    animate: { scale: [1, 1.25, 0.95, 1.12, 1], rotate: [0, 12, -9, 7, 0] }
  },
  {
    icon: "💧",
    color: "linear-gradient(92deg, var(--accent), var(--mint) 92%)",
    text: "Hydration hero: fresh water bowls = happy pets!",
    animate: { rotate: [0, 16, -13, 8, 0], scale: [1, 1.2, 1.05, 1] }
  },
  {
    icon: "🎾",
    color: "linear-gradient(93deg, var(--pop-sky), var(--primary) 90%)",
    text: "Five min of play trumps ten treats! Fetch is always in style.",
    animate: { scale: [1, 1.07, 1.15, 1, 1.14, 1], y: [0, -8, 0, 6, 0] }
  },
  {
    icon: "📷",
    color: "linear-gradient(91deg, var(--lavender), var(--petal) 89%)",
    text: "Document the derp! Silly pet selfies = gold forever.",
    animate: { rotate: [0, 15, -15, 0], scale: [1, 1.13, 1] }
  },
  {
    icon: "🆕",
    color: "linear-gradient(97deg, var(--petal), var(--mint) 98%)",
    text: "New trick? Cheer even goofy attempts. Positivity wins.",
    animate: { rotate: [0, 9, -9, 8, 0], scale: [1, 1.1, 0.98, 1.07, 1] }
  },
  {
    icon: "😸",
    color: "linear-gradient(96deg, var(--mint), var(--lavender) 100%)",
    text: "Cat-proof windows before naptime. Curiosity is their job!",
    animate: { y: [0, -10, 0, 3, 0], scale: [1, 1.1, 1] }
  },
  {
    icon: "🏆",
    color: "linear-gradient(100deg, var(--secondary), var(--accent) 90%)",
    text: "Every little win? Celebrate with a silly dance!",
    animate: { rotate: [0, 9, -9, 7, 0], scale: [1, 1.08, 1] }
  },
  {
    icon: "🛏️",
    color: "linear-gradient(90deg, var(--lavender), var(--accent) 90%)",
    text: "Pet beds in sunny spots = maximum naps, minimum grumps.",
    animate: { scale: [1, 1.11, 1], y: [0, -5, 0] }
  },
  {
    icon: "🔊",
    color: "linear-gradient(93deg, var(--accent), var(--pop-sky) 95%)",
    text: "Play favorite music! Pets vibe with tunes & happy energy.",
    animate: { rotate: [0, -15, 10, 0], scale: [1, 1.14, 1] }
  }
];

// PUBLIC_INTERFACE
/** 
 * TipsSection: vibrant scrollable carousel of lively, animated tip cards.
 * Responsive & extra playful; optimized for mobile (scroll-snap) and desktop (card grid).
 */
export default function TipsSection() {
  const scrollRef = useRef(null);

  // Bounce icon when tip is first rendered (or re-focused)
  const makeIcon = (tip, i) => (
    <motion.span
      key={`icon-${i}`}
      role="img"
      aria-label="tip icon"
      style={{
        fontSize: "2.1em",
        background: "#FFFFFF",
        borderRadius: "1.2em",
        padding: "0.1em 0.25em",
        boxShadow: "0 3px 18px var(--pop-sky), 0 1px 6px var(--accent)",
        marginRight: 13,
        minWidth: 38,
        textAlign: "center",
        display: "inline-block",
        verticalAlign: "middle",
        filter: "drop-shadow(0 2px 11px var(--mint))",
        outline: "2.7px solid var(--accent)",
        outlineOffset: "-1.1px"
      }}
      initial={{ scale: 0.85, rotate: 0, y: 0 }}
      animate={tip.animate}
      transition={{
        duration: 1.3 + (i % 4) * 0.21,
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.52, 0.09, 0.44, 0.93],
        delay: (i%3)*0.14 + 0.1
      }}
    >{tip.icon}</motion.span>
  );

  return (
    <section
      className="tips-section"
      id="tips"
      aria-label="Pet Tips Carousel"
      ref={scrollRef}
      style={{
        width: "100vw",
        maxWidth: 730,
        margin: "2.3em auto 2.7em auto",
        overflowX: "auto",
        display: "flex",
        flexWrap: "nowrap",
        gap: "0.87em",
        // Mobile: scroll, Desktop: looks like grid
        scrollbarWidth: "thin",
        WebkitOverflowScrolling: "touch",
        scrollSnapType: "x mandatory"
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="horizontal tips list"
    >
      {TIP_DATA.map((tip, i) => (
        <motion.div
          key={i}
          className="tip-card"
          aria-label={`Tip: ${tip.text}`}
          role="group"
          style={{
            background: tip.color,
            color: "var(--text-primary)",
            fontWeight: 600,
            boxShadow: "0 2px 17px var(--primary), 0 0.5px 3px var(--accent)",
            borderRadius: "1.3em",
            minWidth: 210,
            maxWidth: 285,
            margin: "0 2px",
            flex: "0 0 78vw", // mobile: full width, but snappable
            scrollSnapAlign: "center",
            display: "flex",
            alignItems: "center",
            fontSize: "1.06em",
            transition: "background 0.3s",
            outline: "none",
            cursor: "grab", // hints you can swipe/scroll
            border: "2.5px solid var(--pop-sky)",
            outlineOffset: "-1.2px",
          }}
          tabIndex={0}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 44px var(--mint)" }}
          whileFocus={{ borderColor: "var(--secondary)", outline: "3px solid var(--secondary)" }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1+0.08*i, duration: 0.54 }}
        >
          {makeIcon(tip, i)}
          <span style={{
            fontFamily: "'Quicksand','Poppins',sans-serif",
            color: "var(--text-bright)",
            textShadow: "0 2.5px 18px var(--pop-sky), 0 1px 5px var(--accent)",
            letterSpacing: "0.2px",
            wordBreak: "break-word",
            flex: 1,
          }}>{tip.text}</span>
        </motion.div>
      ))}
    </section>
  );
}
