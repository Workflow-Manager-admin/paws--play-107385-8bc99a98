import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
export default function SwipeCard({ pet = {
  name: "Peppy",
  desc: "Happy go lucky puppy, loves to nap & chew slippers.",
  img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400"
}, onFav, onAdopt }) {
  return (
    <motion.div
      className="swipe-card"
      whileHover={{ scale: 1.025, boxShadow: "0 8px 36px rgba(255,182,182,0.18)" }}
      whileTap={{ scale: 0.96 }}
    >
      <img src={pet.img} alt={pet.name} loading="lazy" />
      <div className="pet-name">{pet.name}</div>
      <div className="pet-desc">{pet.desc}</div>
      <div>
        <button className="heart-btn" title="Favorite" onClick={onFav}><span role="img" aria-label="heart">💖</span></button>
        <button className="hero-btn" style={{ fontSize: "1em", padding: "0.5em 1.1em"}} onClick={onAdopt}>Adopt</button>
      </div>
    </motion.div>
  );
}
