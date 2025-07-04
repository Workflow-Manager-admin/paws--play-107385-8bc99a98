import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Modal for pet details and adoption action
function PetProfileModal({ open, pet, onClose, onAdopt }) {
  if (!open || !pet) return null;
  // Render playful modal UI, full pet details, adoption CTA
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
          background: "rgba(71,57,127,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
        aria-modal="true" role="dialog" aria-label={`Pet profile modal: ${pet.name}`}
        tabIndex={-1}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ y: 48, opacity: 0.9 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ type: "spring", duration: 0.42 }}
          className="fav-modal-card"
          style={{
            background: "linear-gradient(110deg,var(--cotton-white),var(--petal) 88%,var(--mint) 120%)",
            borderRadius: "2.6em",
            boxShadow: "0 8px 40px var(--primary),0 2.5px 14px var(--mint),0 0.5px 8px var(--sky-blue)",
            padding: "2.0em 1.1em 1.8em 1.1em",
            maxWidth: 378,
            minWidth: 0,
            width: "96vw",
            minHeight: 380,
            position: "relative",
            textAlign: "center",
            outline: "4.5px solid var(--secondary)",
            color: "var(--text-primary)",
          }}
          role="document"
          tabIndex={0}
        >
          <button
            aria-label="Close modal"
            onClick={onClose}
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
            tabIndex={0}
            className="cert-close-btn"
          >✕</button>
          <motion.img
            src={pet.img}
            alt={pet.name}
            initial={{ scale: 0.87, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.08 }}
            style={{
              borderRadius: "1.8em",
              border: "4.5px solid var(--mint)",
              width: "72%",
              minWidth: 128, minHeight: 92, maxWidth: 202, maxHeight: 156,
              margin: "0.5em 0 1em 0",
              boxShadow: "0 4px 24px var(--blush-pink),0 0.5px 10px var(--secondary)",
              objectFit: "cover",
              background: "var(--warm-sand)"
            }}
          />
          <div
            className="fav-modal-name"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: "2em",
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
            fontSize: "1.18em",
            marginBottom: 7
          }}>
            <span>{pet.breed}</span>
            <span style={{marginLeft: 8, fontStyle: "italic", color: "var(--text-secondary)"}}>• {pet.mood}</span>
          </div>
          <div style={{
            background: "var(--warm-sand)",
            margin: "0.8em 0",
            borderRadius: "1.2em",
            padding: "0.7em 1.13em 0.73em 1.13em",
            fontSize: "1.11em",
            color: "var(--walnut-gray)",
            fontStyle: "italic",
            boxShadow: "0 2.1px 18px #FFB6B62B",
            minHeight: 43
          }}>
            <span style={{marginRight: 6, fontSize: 18}} role="img" aria-label="storybook">📖</span> {pet.story}
          </div>
          <div style={{
            color: "var(--text-secondary)",
            marginBottom: 13,
            marginTop: 7,
            fontSize: "1em"
          }}>
            {pet.desc}
          </div>
          <motion.button
            className="hero-btn"
            style={{
              fontSize: "1.21em",
              padding: "1.17em 2.3em",
              background: "linear-gradient(101deg, var(--primary) 80%, var(--secondary) 120%)",
              color: "var(--deep-cocoa)",
              fontWeight: 900,
              margin: "0.7em auto 0 auto",
              borderRadius: "2.3em",
              border: "3.5px solid var(--primary)",
              boxShadow: "0 4.5px 24px var(--mint)",
              outline: "none"
            }}
            tabIndex={0}
            aria-label={`Adopt ${pet.name}`}
            onClick={onAdopt}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            <span style={{marginRight: 9, fontSize: "1.21em"}} role="img" aria-label="award">🏆</span>
            Adopt {pet.name}
          </motion.button>
          <div style={{fontSize: "1.44em", marginTop: 15}}>🥰</div>
        </motion.div>
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
    setTimeout(()=>setSelected(null), 400);
  }
  function handleAdoptFromModal() {
    // Show confetti, could reuse CertModal in parent as well
    window.alert(`🎉 Congrats! You adopted ${selected.name}. (In a real app, this triggers badge/modal etc.)`);
    closeModal();
  }

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
      <PetProfileModal open={showModal && !!selected} pet={selected} onClose={closeModal} onAdopt={handleAdoptFromModal} />
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
