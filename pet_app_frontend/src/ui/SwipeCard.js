import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Pet swipe card: photo, desc, actionable buttons.
 */
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
  // Color cycling for cards (accent, primary, mint, pop-sky)
  const CARD_GRADIENTS = [
    "linear-gradient(132deg, var(--primary) 65%, var(--pop-sky) 100%)",
    "linear-gradient(135deg, var(--mint) 68%, var(--accent) 100%)",
    "linear-gradient(133deg, var(--lavender) 70%, var(--primary) 96%)",
    "linear-gradient(120deg, var(--secondary) 73%, var(--petal) 95%)",
    "linear-gradient(125deg, var(--pop-sky) 74%, var(--accent) 100%)"
  ];
  // Deterministic based on pet name
  const bgGradient = CARD_GRADIENTS[
    (pet?.name?.charCodeAt(0)||0 + pet?.breed?.length||0) % CARD_GRADIENTS.length
  ];

  return (
    <motion.div
      className="swipe-card"
      style={{ background: bgGradient, boxShadow: "var(--shadow-lg)", position: "relative" }}
      whileHover={{ scale: 1.04, boxShadow: "0 12px 38px var(--primary), 0 1.5px 12px var(--mint)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 150 }}
      tabIndex={0}
      aria-label={`Profile card for ${pet.name}, a ${pet.mood} ${pet.breed}`}
    >
      <img src={pet.img} alt={pet.name} loading="lazy"
        style={{
          border: "4px solid var(--mint)",
          boxShadow: "0 4px 20px var(--petal)",
          transition: "border 0.35s",
          marginBottom: 7,
          background: "var(--card-bg)",
        }}
      />
      <div className="pet-name"
        style={{
          color: "var(--pop-sky)",
          textShadow: "0 2.5px 14px var(--mint), 0 3.5px 19px var(--accent)",
          fontSize: "1.25em"
        }}>{pet.name} <span style={{ fontWeight: 500, color: "var(--accent)", fontSize: "0.55em" }}>{pet.breed}</span>
      </div>
      <div className="pet-desc" style={{ fontWeight: 500, color: "var(--text-secondary)", marginBottom: 7 }}>
        <span style={{ fontSize: "0.95em" }}>{pet.desc}</span>
      </div>
      <div style={{ fontSize: "0.94em", color: "var(--primary)", marginBottom: "12px", fontStyle:"italic" }}>
        {pet.mood && <>Mood: <b>{pet.mood}</b> &middot; </>}
        <span role="img" aria-label="story">📖</span> <span>{pet.story}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "12px",
          userSelect: "none"
        }}
      >
        <button
          className="heart-btn"
          title="Favorite"
          onClick={onFav}
          style={{
            background: "linear-gradient(110deg, var(--secondary), var(--accent) 80%)",
            color: "var(--primary)",
            filter: "drop-shadow(0 0 5px var(--primary))",
            boxShadow: "0 0 0 4.5px var(--mint,rgba(120,255,214,0.23))"
          }}
          tabIndex={0}
          aria-label={`Favorite ${pet.name}`}
        >
          <span role="img" aria-label="heart">💖</span>
        </button>
        <button
          className="hero-btn"
          style={{
            fontSize: "1em",
            padding: "0.5em 1.3em",
            background: "linear-gradient(110deg, var(--primary), var(--mint) 85%)",
            color: "var(--text-bright)",
            fontWeight: 600,
            boxShadow: "0 7px 28px var(--primary), 0 4px 14px var(--accent)",
            border: "2px solid var(--secondary)"
          }}
          onClick={onAdopt}
          tabIndex={0}
          aria-label={`Adopt ${pet.name}`}
        >Adopt</button>
      </div>
    </motion.div>
  );
}
