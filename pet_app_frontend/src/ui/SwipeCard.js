import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SwipeCard - Modern, emotional, accessible pet card for swipe UI.
 * Features: centered, rounded, soft-shadowed, big Pexels image, 
 * bold walnut gray name, muted breed/age, sage tags, warm sand story, emoji,
 * and two playful CTAs with animated heart feedback per UX spec.
 */
// PUBLIC_INTERFACE
export default function SwipeCard({
  pet = {
    name: "Peppy",
    breed: "Corgi",
    mood: "snuggly",
    desc: "Happy go lucky puppy, loves to nap & chew slippers.",
    story: "Dreams of chasing rainbows in the backyard.",
    img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400"
  },
  onFav = ()=>{},
  onAdopt = ()=>{}
}) {
  // Card visual feedback state for heart float
  const [showHeart, setShowHeart] = useState(false);

  // Show heart feedback and call parent's onFav
  function handleFav(e) {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 777);
    if (onFav) onFav(e);
  }

  // Card background: cotton white with soft pastel vignette shadow
  const cardBg = "var(--card-bg)";
  const cardShadow = "0 12px 40px var(--shadow-lg), 0 3px 16px var(--blush-pink)";
  // Soft pastel vignette overlay
  const vignette = "radial-gradient(ellipse at 60% 102%, #F9C6C930 66%, transparent 100%), radial-gradient(circle at 13% 4%, #C9E4CA22 36%, transparent 87%)";

  // Pet tags (mood as sage badge)
  function MoodTag({ mood }) {
    return (
      <span
        style={{
          background: "var(--mint)",
          color: "var(--walnut-gray)",
          borderRadius: "1.45em",
          fontSize: "0.99em",
          padding: "0.17em 1.18em",
          fontWeight: 600,
          margin: "0 0.4em",
          boxShadow: "0 3px 10px var(--mint)",
          display: "inline-block",
          letterSpacing: "0.04em"
        }}
        aria-label={`Mood: ${mood}`}
      >
        {mood}
      </span>
    );
  }

  // Mini muted text for breed/age
  function BreedAndAge({ breed }) {
    return (
      <span
        style={{
          fontWeight: 400,
          color: "var(--text-secondary)",
          fontSize: "0.94em",
          marginLeft: 7,
          opacity: 0.82,
          verticalAlign: "top"
        }}
      >
        {breed}
      </span>
    );
  }

  // Warm sand backstory block
  function Backstory({ story }) {
    return (
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          background: "var(--warm-sand)",
          color: "var(--walnut-gray)",
          opacity: 0.98,
          fontStyle: "italic",
          fontFamily: "'Poppins','Quicksand',sans-serif",
          fontSize: "1.09em",
          borderRadius: "1.15em",
          padding: "0.7em 1.02em 0.73em 1.02em",
          boxShadow: "0 1.4px 17px #FFB6B62B",
          minHeight: 44,
          textAlign: "center",
          lineHeight: 1.37,
        }}
        aria-label="pet backstory"
      >
        <span style={{ marginRight: 5 }} role="img" aria-label="storybook">📖</span> {story}
      </div>
    );
  }

  // Heart Floating Feedback Emoji
  function HeartFloat({ show }) {
    return (
      <AnimatePresence>
        {show &&
          <motion.div
            initial={{ scale: 0.15, opacity: 0, y: 40 }}
            animate={{ scale: [0.7, 1.17, 1], opacity: [0.85, 0.96, 0], y: [-20, -66, -88], rotate: [2, 18, -8, 0] }}
            exit={{ opacity: 0, scale: 0, y: -120 }}
            transition={{ duration: 0.88, type: "spring", stiffness: 77 }}
            style={{
              position: "absolute",
              left: "50%", top: 30,
              transform: "translateX(-50%)",
              zIndex: 29, fontSize: "2.3em",
              pointerEvents: "none",
              filter: "drop-shadow(0 0 22px var(--accent))"
            }}
            aria-label="Favorite feedback"
          >💖</motion.div>
        }
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      className="swipe-card"
      style={{
        background: `${cardBg}, ${vignette}`,
        boxShadow: cardShadow,
        position: "relative",
        borderRadius: "2.5em",
        padding: "2.4em 1.35em 2em 1.35em",
        minHeight: 470,
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
      whileHover={{
        scale: 1.045,
        boxShadow: "0 17px 48px var(--primary), 0 3.5px 24px var(--secondary)",
        filter: "brightness(1.03) saturate(1.13)"
      }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      aria-label={`Pet card for ${pet.name}, a ${pet.breed} (${pet.mood})`}
      role="region"
    >
      {/* Heart float feedback for "save" */}
      <HeartFloat show={showHeart} />

      <img
        src={pet.img}
        alt={pet.name}
        loading="lazy"
        style={{
          border: "5px solid var(--mint)",
          boxShadow: "0 7px 44px var(--blush-pink)",
          transition: "border 0.32s, box-shadow 0.23s",
          marginBottom: 16,
          width: "93%",
          height: 233,
          objectFit: "cover",
          borderRadius: "1.8em",
          outline: "none",
          background: "var(--warm-sand)",
          filter: "saturate(1.08) brightness(1.03)"
        }}
      />
      <div
        className="pet-name"
        style={{
          color: "var(--walnut-gray)",
          textShadow: "0 2px 12px var(--soft-sage), 0 0.5px 7px var(--sky-blue)",
          fontSize: "2em",
          fontWeight: 900,
          letterSpacing: "0.7px",
          marginBottom: 0,
          fontFamily: "'Baloo 2','Quicksand',cursive",
          lineHeight: 1.04
        }}
      >
        {pet.name}
        <BreedAndAge breed={pet.breed} />
      </div>
      <div
        className="pet-desc"
        style={{
          color: "var(--text-secondary)",
          marginBottom: 6,
          marginTop: 0,
          fontSize: "1.12em",
          fontWeight: 500,
          fontFamily: "'Poppins','Lato',sans-serif",
          opacity: 0.87
        }}
      >
        {pet.desc}
      </div>
      <div
        className="swipecard-tags"
        style={{ marginBottom: 5 }}
      >
        <MoodTag mood={pet.mood} />
      </div>
      <Backstory story={pet.story} />
      {/* CTA buttons - Save/Adopt */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.2em",
          marginTop: 15,
          width: "100%"
        }}
      >
        {/* Save (Favorite) */}
        <button
          className="heart-btn"
          title="Save favorite"
          onClick={handleFav}
          style={{
            background: "linear-gradient(109deg, var(--accent) 70%, var(--primary));",
            color: "var(--cotton-white)",
            filter: "drop-shadow(0 0 17px var(--accent))",
            boxShadow: "0 0 0 7px var(--mint)",
            fontSize: "1.45em",
            minWidth: 63, minHeight: 63,
            borderRadius: "50%",
            border: "none",
            fontWeight: 900,
            outline: "none",
            transition: "box-shadow 0.13s, background 0.18s, color .13s"
          }}
          tabIndex={0}
          aria-label={`Save ${pet.name} as favorite`}
        >
          <span role="img" aria-label="heart" style={{ fontSize: "1.36em" }}>💖</span>
        </button>
        {/* Adopt */}
        <button
          className="hero-btn"
          style={{
            fontSize: "1.18em",
            padding: "0.9em 2.24em",
            background: "linear-gradient(110deg,var(--blush-pink) 80%,var(--sky-blue) 100%)",
            color: "var(--deep-cocoa)",
            fontWeight: 800,
            boxShadow: "0 10px 28px var(--primary), 0 2.5px 7px var(--mint)",
            border: "2.5px solid var(--sky-blue)",
            borderRadius: "2.6em"
          }}
          onClick={onAdopt}
          tabIndex={0}
          aria-label={`Adopt ${pet.name}`}
        >
          <span style={{ fontSize: "1.09em", marginRight: 8 }}>🏆</span>
          Adopt
        </button>
      </div>
    </motion.div>
  );
}
