import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons per badge
const ICONS = {
  first_favorite: "💖",
  swipe_star: "🌟",
  adopted: "🏆",
  trial: "🏡",
};

// PUBLIC_INTERFACE
export default function BadgeSection({ badges = [] }) {
  // If missing, fallback to all badge slots unearned
  const fallback = [
    { key: "first_favorite", label: "First Favorite", icon: "💖" },
    { key: "swipe_star", label: "Swipe Star", icon: "🌟" },
    { key: "adopted", label: "Adopter!", icon: "🏆" },
    { key: "trial", label: "Home Trial", icon: "🏡" },
  ];
  if (!badges.length) {
    badges = fallback;
  }
  // All badges unearned?
  const allLocked = badges && badges.every(b => !b.earned);

  return (
    <section className="badge-section" aria-label="Badges Earned">
      {allLocked && (
        <div
          style={{
            color: "var(--secondary)",
            textAlign: "center",
            width: "100%",
            fontWeight: 700,
            fontSize: "1em",
            marginRight: 10,
            marginLeft: 10,
            opacity: 0.84,
            fontFamily: "'Quicksand','Baloo 2', cursive"
          }}
        >
          🎯 Earn badges by favoriting, swiping, adopting, and trying the Virtual Home Trial!
        </div>
      )}
      {badges.map((badge, i) =>
        <AnimatePresence key={badge.key || i}>
          {badge.earned ? (
            <motion.span
              className="badge-earned"
              initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
              animate={{ scale: 1.07, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 12 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.9em",
                boxShadow: "0 2px 14px var(--primary), 0 0.5px 3px var(--secondary)",
                color: "var(--pop-sky)",
                position: "relative",
                marginRight: 6,
                marginLeft: 6,
                outline: "3px solid var(--mint)",
                outlineOffset: "-2px",
                filter: "drop-shadow(0 0 10px var(--lavender))"
              }}
              title={badge.label}
            >
              {badge.icon || ICONS[badge.key] || "🏆"}
            </motion.span>
          ) : (
            <span
              className="badge-placeholder"
              style={{
                filter: "blur(0.2px) grayscale(97%) opacity(0.38)"
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
