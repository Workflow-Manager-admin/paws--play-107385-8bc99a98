import React from "react";
import { motion } from "framer-motion";

/**
 * Pet swipe card: photo, desc, actionable buttons.
 * Upgraded for cozy/cute/wholesome theme with large fonts, extra radii,
 * soft shadows/feedback, emoji/animation scaffolding, and high-contrast styling.
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
  // Soft cozy gradients by palette
  const CARD_GRADIENTS = [
    "linear-gradient(118deg, var(--primary) 52%, var(--accent) 100%)",
    "linear-gradient(127deg, var(--mint) 65%, var(--pop-sky) 100%)",
    "linear-gradient(111deg, var(--lavender) 70%, var(--primary) 100%)",
    "linear-gradient(129deg, var(--secondary) 73%, var(--petal) 95%)",
    "linear-gradient(121deg, var(--pop-sky) 72%, var(--accent) 100%)"
  ];
  const bgGradient = CARD_GRADIENTS[
    ((pet?.name?.charCodeAt(0) || 0) + (pet?.breed?.length || 0)) % CARD_GRADIENTS.length
  ];

  return (
    <motion.div
      className="swipe-card"
      style={{ background: bgGradient, boxShadow: "var(--shadow-lg)", position: "relative", borderRadius: "2.6em", padding: "2.2em 1.2em 1.6em 1.2em", minHeight: 450, maxWidth: 370 }}
      whileHover={{ scale: 1.07, boxShadow: "0 18px 42px var(--primary), 0 1.5px 19px var(--mint)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 140 }}
      tabIndex={0}
      aria-label={`Profile card for ${pet.name}, a ${pet.mood} ${pet.breed}`}
    >
      <img src={pet.img} alt={pet.name} loading="lazy"
        style={{
          border: "5px solid var(--mint)",
          boxShadow: "0 6px 33px var(--accent)",
          transition: "border 0.35s",
          marginBottom: 10,
          background: "var(--card-bg)",
          width: "90%",
          height: 220,
          objectFit: "cover",
          borderRadius: "2em"
        }}
      />
      <div className="pet-name"
        style={{
          color: "var(--pop-sky)",
          textShadow: "0 2.5px 18px var(--mint), 0 3.5px 19px var(--accent)",
          fontSize: "1.65em",
          fontWeight: 700,
          letterSpacing: "0.6px",
          marginBottom: 5,
          fontFamily: "'Baloo 2','Quicksand',sans-serif",
          lineHeight: 1.07
        }}>
        {pet.name} <span style={{ fontWeight: 400, color: "var(--accent)", fontSize: "0.73em" }}>{pet.breed}</span> <span style={{fontSize:"0.68em", marginLeft:3}}>🐾</span>
      </div>
      <div className="pet-desc" style={{
        fontWeight: 500,
        color: "var(--text-secondary)",
        marginBottom: 7,
        fontSize: "1.18em",
        fontFamily: "'Poppins','Lato',sans-serif"
      }}>
        <span>{pet.desc}</span>
      </div>
      <div style={{
        fontSize: "1.11em", color: "var(--primary)", marginBottom: "16px", fontStyle:"italic",
        textShadow: "0 0.5px 7px var(--mint)"
      }}>
        {pet.mood && <>Mood: <b>{pet.mood}</b> &middot; </>}
        <span role="img" aria-label="story">📖</span> <span>{pet.story}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "22px",
          marginTop: "20px",
          userSelect: "none",
          width: "100%",
        }}
      >
        <button
          className="heart-btn"
          title="Favorite"
          onClick={onFav}
          style={{
            background: "linear-gradient(110deg, var(--favorite), var(--accent) 80%)",
            color: "var(--primary)",
            filter: "drop-shadow(0 0 8px var(--favorite))",
            boxShadow: "0 0 0 7px var(--mint,rgba(197,235,170,0.30))",
            fontSize: "1.34em",
            minWidth: 60, minHeight: 60,
            borderRadius: "50%",
            border: "none",
            transition: "transform 0.23s, background 0.14s"
          }}
          tabIndex={0}
          aria-label={`Favorite ${pet.name}`}
          // LOTTIE: Heart pop
          // onClick={() => { onFav(); /* insertHeartPopLottie(); */ }}
        >
          <span role="img" aria-label="heart" style={{fontSize:"1.23em"}}>💖</span>
        </button>
        <button
          className="hero-btn"
          style={{
            fontSize: "1.14em",
            padding: "0.8em 2.15em",
            background: "linear-gradient(110deg, var(--primary), var(--mint) 85%)",
            color: "var(--text-bright)",
            fontWeight: 700,
            boxShadow: "0 7px 28px var(--primary), 0 4px 14px var(--accent)",
            border: "2.2px solid var(--secondary)",
            borderRadius: "2em"
          }}
          onClick={onAdopt}
          tabIndex={0}
          aria-label={`Adopt ${pet.name}`}
        >
          {/* LOTTIE: Paw bounce could play here on click */}
          Adopt <span style={{fontSize:"1.05em",marginLeft:7}}>🐾</span>
        </button>
      </div>
    </motion.div>
  );
}
