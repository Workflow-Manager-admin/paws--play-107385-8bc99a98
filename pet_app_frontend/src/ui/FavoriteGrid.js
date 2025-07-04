import React, { useState } from "react";
import CertModal from "./CertModal";
import { motion, AnimatePresence } from "framer-motion";

// Animated confetti pet modal with certificate export for favorites/adoption flow
function AnimatedAdoptModal({ open, pet, onClose }) {
  // Show animated pet, fun confetti, and enable certificate export
  // Use ARIA roles for accessibility

  const [showCert, setShowCert] = React.useState(false);

  if (!open || !pet) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1.05 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 210, damping: 16 }}
        style={{
          position: "fixed",
          zIndex: 1790,
          top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(71,57,127,0.09)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
        aria-modal="true" role="dialog" aria-label={`Adopt modal for ${pet.name}`}
        tabIndex={-1}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        {!showCert ? (
          <motion.div
            initial={{ y: 48, opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: "spring", duration: 0.42 }}
            style={{
              background: "linear-gradient(110deg,var(--cotton-white),var(--petal) 88%,var(--mint) 120%)",
              borderRadius: "2.6em",
              boxShadow: "0 8px 40px var(--primary),0 2.5px 14px var(--mint),0 0.5px 8px var(--sky-blue)",
              padding: "2.2em 1.5em 1.8em 1.5em",
              maxWidth: 388,
              minWidth: 0,
              width: "96vw",
              minHeight: 380,
              position: "relative",
              textAlign: "center",
              outline: "4.5px solid var(--secondary)",
              color: "var(--text-primary)"
            }}
            role="document"
            tabIndex={0}
          >
            {/* Confetti SVG anim burst */}
            <motion.div
              style={{
                position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.03, opacity: 1 }}
              exit={{ scale: 0.86, opacity: 0 }}
              transition={{ duration: 0.8 }}
              aria-hidden="true"
            >
              <svg width="100%" height="100%" viewBox="0 0 400 220">
                {[...Array(14)].map((_,i)=>(
                  <motion.circle
                    key={i}
                    cx={48+Math.random()*300}
                    cy={37+Math.random()*73}
                    r={5+i%4}
                    fill={['var(--primary)','var(--secondary)','var(--accent)','var(--mint)','var(--blush-pink)',"#FFD36E","#B6E1FF"][i%7]}
                    initial={{cy: 42, opacity: 0, scale: 0.8}}
                    animate={{cy: [42, 65+Math.random()*95], opacity: [0.7,0.8,0,0], scale: [1.25,1.03,0.74]}}
                    transition={{duration: 1.13+Math.random()*0.25, delay: 0.04*i}}
                  />
                ))}
              </svg>
            </motion.div>
            <button
              aria-label="Close adoption modal"
              onClick={onClose}
              tabIndex={0}
              style={{
                position: "absolute", top: 13, right: 14,
                background: "var(--secondary)",
                color: "var(--accent)",
                border: "none",
                fontSize: "2em",
                borderRadius: "50%",
                width: 41, height: 41,
                boxShadow: "0 2px 12px var(--primary)",
                cursor: "pointer",
                zIndex: 22
              }}
              className="cert-close-btn"
            >✕</button>
            {/* Animated pet */}
            <motion.img
              src={pet.img}
              alt={pet.name}
              initial={{ scale: 0.87, y: -20 }}
              animate={{
                scale: [0.96,1.13,0.93,1], 
                y: [0,-15,9,0],
                rotate: [0,10,-10,3,0]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2.2,
                delay: 0.1
              }}
              style={{
                borderRadius: "1.9em",
                border: "4.5px solid var(--mint)",
                width: "78%",
                minWidth: 120, minHeight: 94, maxWidth: 212, maxHeight: 168,
                margin: "0.6em 0 1.2em 0",
                boxShadow: "0 4px 32px var(--blush-pink),0 0.5px 13px var(--secondary)",
                objectFit: "cover",
                background: "var(--warm-sand)"
              }}
            />
            <div
              className="fav-modal-name"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "2.15em",
                fontWeight: 900,
                color: "var(--primary)",
                textShadow: "0 0.5px 9px var(--mint),0 0.5px 4px var(--petal)",
                marginTop: "0.1em",
              }}
            >
              {pet.name}
            </div>
            <div style={{
              color: "var(--deep-cocoa)",
              fontFamily: "'Quicksand','Poppins',sans-serif",
              fontWeight: 600,
              fontSize: "1.13em",
              marginBottom: 6
            }}>
              <span>{pet.breed || "Adorable Mutt"}</span>
              <span style={{marginLeft: 8, fontStyle: "italic", color: "var(--text-secondary)"}}>• {pet.mood||"sweet"}</span>
            </div>
            <div style={{
              background: "var(--warm-sand)",
              margin: "0.65em 0",
              borderRadius: "1.1em",
              padding: "0.55em 0.93em 0.59em 0.93em",
              fontSize: "1.05em",
              color: "var(--walnut-gray)",
              fontStyle: "italic",
              boxShadow: "0 2.1px 18px #FFB6B62B",
              minHeight: 41
            }}>
              <span style={{marginRight: 6, fontSize: 16}} role="img" aria-label="storybook">📖</span> {pet.story||"Ready for a home!"}
            </div>
            <motion.button
              className="hero-btn"
              style={{
                fontSize: "1.13em",
                padding: "1.01em 2.1em",
                background: "linear-gradient(101deg, var(--primary) 80%, var(--secondary) 120%)",
                color: "var(--deep-cocoa)",
                fontWeight: 900,
                margin: "0.7em auto 0 auto",
                borderRadius: "2.3em",
                border: "3.1px solid var(--primary)",
                boxShadow: "0 4.5px 20px var(--mint)",
                outline: "none"
              }}
              tabIndex={0}
              aria-label={`Show Adoption Certificate for ${pet.name}`}
              onClick={()=>setShowCert(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <span style={{marginRight: 9, fontSize: "1.21em"}} role="img" aria-label="award">🏆</span>
              Show Adoption Certificate
            </motion.button>
            <div style={{fontSize: "1.39em", marginTop: 13}}>🎉</div>
            <div style={{fontSize: "0.96em", color: "var(--sky-blue)", marginTop: 9}}>Fun fact: Download & print your certificate!</div>
          </motion.div>
        ) : (
          <CertModal open={showCert} onClose={()=>{setShowCert(false);onClose();}} petName={pet.name||"Pet"} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Animated wiggle/tail/emote for favorited card
const WIGGLE = {
  rest: { scale: 1, rotate: 0, boxShadow: "0 6px 30px var(--mint)" },
  hover: { rotate: [0, 9, -9, 6, -5, 0], scale: 1.09, boxShadow: "0 13px 32px var(--primary),0 6px 19px var(--mint)", transition: { type: "spring", stiffness: 280, damping: 17 }},
  tap: { scale: 0.97, rotate: [0, -11, 0], boxShadow: "0 0 0 13px var(--petal),0 6px 16px var(--sky-blue)" }
};
const TAILS = ["💖","🐾","😺","🐶","✨","🎈","👋","😻","🎉"];

function getRandomTail(i) {
  // For visual flair per card
  return TAILS[i%TAILS.length];
}

/**
 * FavoriteGrid displays favorited pets in a modern, soft emotional, animated grid.
 * Each card wiggles/animates on hover/tap and shows playful emoji feedback; click opens details modal.
 * Fully accessible, delightful, and matches the project's palette and style.
 */
// PUBLIC_INTERFACE
export default function FavoriteGrid({ favorites = [] }) {
  // Modal state for viewing full profile/adoption
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // No favorites UX improvement
  const hasFavs = favorites && favorites.length > 0;

  // Emulate a fake profile for modal if not in card
  function getPetFromFavorite(pet) {
    // Try to hydrate with mock info if present (minimal saves in localStorage)
    if (!pet.desc) {
      // Provide a default for showcase
      return {
        ...pet,
        breed: "Mutt",
        mood: "adorable",
        story: "Ready for a home full of love and treats.",
        desc: "Add more favorites to see unique stories!"
      };
    }
    return pet;
  }

  function handleCardClick(pet, i) {
    // Open the modal with full profile/adopt flow
    setSelected(getPetFromFavorite(pet));
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
    setTimeout(()=>setSelected(null), 410);
  }

  // For adoption: now handled by animated modal with certificate
  // The modal itself triggers the certificate and celebration

  return (
    <div className="favorites-grid" id="favorites" style={{
      margin: "2.7em auto 0 auto",
      width: "92%",
      maxWidth: 680,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(164px, 1fr))",
      gap: "1.6em"
    }}>
      {/* Modal popup */}
      <AnimatedAdoptModal open={showModal && !!selected} pet={selected} onClose={closeModal} />
      {!hasFavs ? (
        <motion.div
          className="fav-card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 19 }}
          transition={{ duration: 0.38 }}
          aria-label="No favorites yet"
          style={{
            minHeight: 176,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sky-blue)",
            background: "linear-gradient(94deg, var(--warm-sand) 80%, var(--soft-sage))",
            border: "2.2px dashed var(--soft-sage)",
            fontSize: "1.11em",
            margin: "2.3em auto",
            fontWeight: 700,
            boxShadow: "0 2.2px 11px var(--soft-sage)"
          }}
        >
          <span style={{ fontSize: "2.7em", marginBottom: "0.32em" }}>💖</span>
          <span>No favorites yet!<br />Tap <b style={{color:"var(--coral-red)"}}>💖</b> to add your first favorite.</span>
        </motion.div>
      ) : (
        favorites.map((pet, i) => (
          <motion.button
            key={pet.img + (pet.name || "favorite") + i}
            className="fav-card"
            layout
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={WIGGLE}
            transition={{type:"spring", stiffness:220, damping:23}}
            style={{
              background: "var(--card-bg)",
              borderRadius: "2.1em",
              boxShadow: "var(--shadow-lg)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "1.2em 0.47em 0.92em 0.47em",
              overflow: "hidden",
              minHeight: 170, minWidth: 0,
              position: "relative",
              margin: 0,
              border: "3.5px solid transparent",
              outline: "none",
              cursor: "pointer",
              fontFamily: "'Quicksand','Baloo 2', cursive",
              width: "100%",
            }}
            aria-label={`See profile for ${pet.name}`}
            tabIndex={0}
            onClick={() => handleCardClick(pet, i)}
            onKeyPress={e => { if (e.key === "Enter" || e.key === " ") handleCardClick(pet, i); }}
          >
            <motion.img
              src={pet.img}
              className="fav-pet-img"
              alt={pet.name}
              style={{
                width: "84%",
                maxWidth: 108,
                borderRadius: "1.5em",
                boxShadow: "0 4.5px 17px rgba(160,140,77,0.11), 0 1.5px 7px var(--petal)",
                marginBottom: "0.6em",
                border: "3px solid var(--mint)",
                background: "var(--cotton-white)",
                zIndex: 2
              }}
              whileHover={{
                rotate: [0, 8, -7, 10, -6, 0],
                scale: 1.09
              }}
              transition={{type:"spring", stiffness:230, damping:15}}
            />
            {/* Playful emoji tail */}
            <motion.div
              aria-hidden="true"
              style={{
                fontSize: "1.5em",
                position: "absolute",
                bottom: 14, right: 17,
                cursor: "pointer",
                userSelect: "none"
              }}
              animate={{ y: [0, -7, 4, 0], rotate: [0, 22, -12, 8, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2.2 + (i*0.15) % 0.6
              }}
            >{getRandomTail(i)}</motion.div>
            <span
              className="fav-pet-name"
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "1.15em",
                textShadow: "0 0.5px 10px var(--blush-pink), 0 0 3px var(--cotton-white)",
                marginBottom: "0.01em",
                marginTop: 2,
                zIndex: 5
              }}
            >{pet.name}</span>
            {/* Focus indicator for accessibility */}
            <span style={{
              position: "absolute",
              left: 6, top: 8,
              fontSize: "1.13em",
              color: "var(--accent)",
              opacity: 0.8,
              pointerEvents: "none"
            }}>
              <span aria-label="Favorited" title="Favorited">⭐</span>
            </span>
          </motion.button>
        ))
      )}
    </div>
  );
}
