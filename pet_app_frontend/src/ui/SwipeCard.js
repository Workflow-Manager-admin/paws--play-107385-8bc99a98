import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SwipeCard - Modern, emotional, accessible pet card for swipe UI.
 * Features: centered, rounded, soft-shadowed, big Pexels image,
 * big walnut gray names, muted breeds/ages, soft sage mood badges,
 * warm sand backstory block in italic, emoji accents, and playful feedback
 * animations (heart float, fade/feedback text), all styled per the new palette.
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
  // Feedback UI states
  const [showHeart, setShowHeart] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  // Playful feedback for heart
  function handleFav(e) {
    setShowHeart(true);
    setFeedbackText("Added to Favorites! 💖");
    setTimeout(() => {
      setShowHeart(false);
      setFeedbackText("");
    }, 900);

    if (onFav) onFav(e);
  }

  // Card background & shadow
  const cardBg = "var(--card-bg)";
  const cardShadow = "var(--shadow-lg)";
  // Soft vignette
  const vignette = "radial-gradient(ellipse at 60% 112%, #F9C6C930 66%, transparent 100%), radial-gradient(circle at 13% 4%, #C9E4CA22 36%, transparent 87%)";

  // Mood tag badge
  function MoodTag({ mood }) {
    return (
      <span
        style={{
          background: "var(--soft-sage)",
          color: "var(--walnut-gray)",
          borderRadius: "1.7em",
          fontSize: "1.03em",
          padding: "0.19em 1.2em",
          fontWeight: 700,
          margin: "0 0.5em",
          boxShadow: "0 3px 10px var(--mint)",
          display: "inline-block",
          letterSpacing: "0.05em",
          opacity: 0.91
        }}
        aria-label={`Mood: ${mood}`}
      >
        {mood} <span aria-label="emoji accent" style={{ fontSize: "1.1em" }}>🌱</span>
      </span>
    );
  }

  // Muted breed text
  function BreedAndAge({ breed }) {
    return (
      <span
        style={{
          fontWeight: 500,
          color: "var(--text-secondary)",
          fontSize: "1.01em",
          marginLeft: 9,
          opacity: 0.80,
          verticalAlign: "middle"
        }}
      >
        {breed}
      </span>
    );
  }

  // Warm sand backstory
  function Backstory({ story }) {
    return (
      <div
        style={{
          marginTop: 17,
          marginBottom: 15,
          background: "var(--warm-sand)",
          color: "var(--walnut-gray)",
          opacity: 0.99,
          fontStyle: "italic",
          fontFamily: "'Poppins','Quicksand',sans-serif",
          fontSize: "1.15em",
          borderRadius: "1.25em",
          padding: "0.74em 1.13em 0.73em 1.13em",
          boxShadow: "0 2.1px 18px #FFB6B62B",
          minHeight: 47,
          textAlign: "center",
          lineHeight: 1.39,
          letterSpacing: "0.01em"
        }}
        aria-label="pet backstory"
      >
        <span style={{ marginRight: 7 }} role="img" aria-label="storybook">📖</span> {story}
      </div>
    );
  }

  // Heart float & feedback animation
  function HeartFloat({ show }) {
    return (
      <AnimatePresence>
        {show &&
          <motion.div
            initial={{ scale: 0.13, opacity: 0, y: 48 }}
            animate={{
              scale: [0.68, 1.15, 1],
              opacity: [0.92, 0.99, 0.6, 0],
              y: [-14, -66, -114],
              rotate: [6, 15, -12, 8, 0]
            }}
            exit={{ opacity: 0, scale: 0, y: -125 }}
            transition={{ duration: 1.1, type: "spring", stiffness: 80 }}
            style={{
              position: "absolute",
              left: "50%", top: 30,
              transform: "translateX(-50%)",
              zIndex: 30, fontSize: "2.6em",
              pointerEvents: "none",
              filter: "drop-shadow(0 0 26px var(--accent))"
            }}
            aria-label="Favorite feedback"
          >💖</motion.div>
        }
      </AnimatePresence>
    );
  }
  // Textual feedback for action
  function FeedbackText({ text }) {
    return (
      <AnimatePresence>
        {text &&
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 19 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.84 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              left: "52%",
              top: 64,
              transform: "translateX(-50%)",
              fontWeight: 700,
              fontSize: "1.12em",
              padding: "0.4em 1.2em",
              color: "var(--favorite)",
              background: "var(--mint)",
              borderRadius: "1.15em",
              boxShadow: "0 1.2px 14px var(--coral-red)",
              letterSpacing: "0.02em",
              zIndex: 31,
              pointerEvents: "none"
            }}
            aria-live="polite"
          >{text}</motion.div>
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
        borderRadius: "2.65em",
        padding: "2.5em 1.35em 2.2em 1.35em",
        minHeight: 480,
        maxWidth: 414,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.16s, background 0.2s"
      }}
      whileHover={{
        scale: 1.055,
        boxShadow: "0 23px 70px var(--primary), 0 8px 44px var(--secondary)",
        filter: "brightness(1.04) saturate(1.13)"
      }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      aria-label={`Pet card for ${pet.name}, a ${pet.breed} (${pet.mood})`}
      role="region"
    >
      {/* Heart float feedback for "save" */}
      <HeartFloat show={showHeart} />
      <FeedbackText text={feedbackText} />

      <img
        src={pet.img}
        alt={pet.name}
        loading="lazy"
        style={{
          border: "5px solid var(--mint)",
          boxShadow: "0 8px 46px var(--blush-pink), 0 2px 32px var(--sky-blue)",
          transition: "border 0.32s, box-shadow 0.23s",
          marginBottom: 19,
          width: "95%",
          height: 240,
          maxHeight: 320,
          objectFit: "cover",
          borderRadius: "1.95em",
          outline: "none",
          background: "var(--warm-sand)",
          filter: "saturate(1.09) brightness(1.04)"
        }}
        style-compliant // for easier theming/future-test
      />
      <div
        className="pet-name"
        style={{
          color: "var(--walnut-gray)",
          textShadow: "0 2px 14px var(--soft-sage), 0 1.5px 9px var(--sky-blue)",
          fontSize: "2.4em",
          fontWeight: 900,
          letterSpacing: "0.73px",
          marginBottom: 0,
          fontFamily: "'Baloo 2','Quicksand',cursive",
          lineHeight: 1.06,
          marginTop: "-0.17em"
        }}
      >
        <span>
          {pet.name}
          <BreedAndAge breed={pet.breed} />
        </span>
      </div>
      <div
        className="pet-desc"
        style={{
          color: "var(--text-secondary)",
          marginBottom: 5,
          marginTop: 0,
          fontSize: "1.18em",
          fontWeight: 500,
          fontFamily: "'Poppins','Lato',sans-serif",
          opacity: 0.89
        }}
      >
        {pet.desc}
      </div>
      <div
        className="swipecard-tags"
        style={{
          marginBottom: 6,
        }}
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
          gap: "1.45em",
          marginTop: 16,
          width: "100%"
        }}
      >
        {/* Save (Favorite) */}
        <button
          className="heart-btn"
          title="Save favorite"
          onClick={handleFav}
          style={{
            background: "linear-gradient(114deg, var(--coral-red) 79%, var(--sky-blue) 120%)",
            color: "var(--cotton-white)",
            filter: "drop-shadow(0 0 18px var(--coral-red))",
            boxShadow: "0 0 0 7px var(--mint)",
            fontSize: "1.62em",
            minWidth: 69, minHeight: 69,
            borderRadius: "50%",
            border: "none",
            fontWeight: 900,
            outline: "none",
            transition: "box-shadow 0.14s, background 0.18s, color .12s"
          }}
          tabIndex={0}
          aria-label={`Save ${pet.name} as favorite`}
        >
          <span role="img" aria-label="heart" style={{ fontSize: "1.37em" }}>💖</span>
        </button>
        {/* Adopt */}
        <button
          className="hero-btn"
          style={{
            fontSize: "1.21em",
            padding: "1.07em 2.2em",
            background: "linear-gradient(110deg,var(--blush-pink) 79%,var(--sky-blue) 100%)",
            color: "var(--deep-cocoa)",
            fontWeight: 800,
            boxShadow: "0 8px 31px var(--secondary), 0 2.5px 9px var(--blush-pink)",
            border: "3.1px solid var(--sky-blue)",
            borderRadius: "2.7em",
            letterSpacing: "0.01em"
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
