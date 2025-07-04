import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons per badge
const ICONS = {
  first_favorite: "💖",
  swipe_star: "🌟",
  adopted: "🏆",
  trial: "🏡",
};

/**
 * Badges section: big, round, cozy, bouncy (Lottie placeholder ready), with ample whitespace.
 */
// PUBLIC_INTERFACE
export default function BadgeSection({ badges = [] }) {
  // If missing, fallback to all badge slots unearned
  const fallback = [
    { key: "first_favorite", label: "First Favorite", icon: "💖" },
    { key: "swipe_star", label: "Swipe Star", icon: "🌟" },
    { key: "adopted", label: "Adopter!", icon: "🏆" },
    { key: "trial", label: "Home Trial", icon: "🏡" },
  ];
  badges = badges && badges.length ? badges : fallback;
  const allLocked = badges && badges.every(b => !b.earned);

  return (
    <section className="badge-section" aria-label="Badges Earned" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "3em",
      background: "var(--soft-sage)",
      borderRadius: "2.1em",
      minHeight: 80,
      boxShadow: "var(--shadow-softer)",
      width: "97%",
      margin: "2.2em auto 1.1em auto",
      padding: "1.21em 1em"
    }}>
      {allLocked && (
        <div
          style={{
            color: "var(--coral-red)",
            textAlign: "center",
            width: "100%",
            fontWeight: 900,
            fontSize: "1.19em",
            margin: "0 13px",
            opacity: 0.94,
            fontFamily: "'Quicksand','Baloo 2', cursive",
            letterSpacing: "0.1em"
          }}
        >
          🎯 Earn badges by favoriting, swiping, adopting, and trying the <b>Virtual Home Trial</b>!
        </div>
      )}
      {badges.map((badge, i) =>
        <AnimatePresence key={badge.key || i}>
          {badge.earned ? (
            <motion.span
              className="badge-earned"
              // LOTTIE placeholder: Add bounce-on-unlock here
              initial={{ scale: 0.32, opacity: 0, rotate: -45 }}
              animate={{ scale: 1.13, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.32, opacity: 0, rotate: -10 }}
              transition={{ type: "spring", stiffness: 320, damping: 11 }}
              style={{
                width: 62,
                height: 62,
                borderRadius: "30em",
                background: "var(--blush-pink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.18em",
                boxShadow: "0 4px 32px var(--soft-sage), 0 1.5px 8px var(--coral-red)",
                color: "var(--coral-red)",
                position: "relative",
                margin: "0 10px",
                outline: "3.2px solid var(--sky-blue)",
                outlineOffset: "0px",
                filter: "drop-shadow(0 0 17px var(--coral-red))"
              }}
              title={badge.label}
            >
              {badge.icon || ICONS[badge.key] || "🏆"}
            </motion.span>
          ) : (
            <span
              className="badge-placeholder"
              style={{
                width: 58,
                height: 58,
                background: "var(--soft-sage)",
                opacity: 0.19,
                borderRadius: "29px",
                color: "var(--walnut-gray)",
                fontSize: "2em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 10px"
              }}
              title={`Locked: ${badge.label}`}
            >
              {(badge.icon || ICONS[badge.key] || "🏆")}
            </span>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
