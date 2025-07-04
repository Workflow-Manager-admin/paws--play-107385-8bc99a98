import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPetImages } from "../pexelsApi";

/**
 * Immersive fullscreen hero for the landing page.
 * Features:
 * - Dynamically loads a cute pet photo from Pexels
 * - Soft vignette overlay for focus and warmth
 * - Modern, bold, huge headline and subtitle
 * - Bouncy blush-pink pill CTA and enter animation
 * - Mini-feature section with icons and playful labels
 * - All styling uses the new palette and modern font scale
 */
// PUBLIC_INTERFACE
export default function HeroSection({ onAdopt }) {
  // State to store fetched photo
  const [bgPhoto, setBgPhoto] = useState(null);
  const [photographer, setPhotographer] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch a pet photo from Pexels on mount
  useEffect(() => {
    fetchPetImages("cute puppy OR kitten", 15, 1)
      .then(({ photos }) => {
        if (photos && photos.length) {
          // Prefer horizontal/landscape
          const best = photos.find(
            ph =>
              (ph.width >= ph.height && ph.src.landscape) ||
              ph.src.original
          ) || photos[0];
          setBgPhoto(best.src.landscape || best.src.original || best.src.medium);
          setPhotographer(best.photographer || "");
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo image
        setBgPhoto(
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=800"
        );
        setPhotographer("Pexels");
        setLoading(false);
      });
  }, []);

  // Feature mini-section: 3 features/icons
  const features = [
    { icon: "🐾", label: "Swipe Adorable Pets" },
    { icon: "💖", label: "Save Favorites" },
    { icon: "🏡", label: "Virtual Home Trial" },
  ];

  return (
    <section
      className="hero hero-fullscreen"
      id="home"
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        padding: 0,
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff8f5",
        overflow: "hidden",
        boxShadow: "0 7px 44px #F9C6C933",
      }}
      aria-label="Pet Adoption App Hero"
    >
      {/* Background hero image from Pexels with fade-in & vignette */}
      <AnimatePresence>
        {bgPhoto && (
          <motion.img
            key={bgPhoto}
            src={bgPhoto}
            alt="Adorable pet background"
            initial={{ opacity: 0, scale: 1.055 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              width: "100vw",
              height: "100%",
              minHeight: "92vh",
              zIndex: 0,
              filter: "brightness(0.96) saturate(1.11)",
              willChange: "transform, opacity",
              transition: "filter 0.6s",
              pointerEvents: "none",
              userSelect: "none"
            }}
            draggable={false}
          />
        )}
      </AnimatePresence>
      {/* Soft vignette/gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100%",
          minHeight: "92vh",
          zIndex: 1,
          pointerEvents: "none",
          // Vignette: soft pink+black radial -- matches new palette
          background:
            "radial-gradient(ellipse at center, rgba(249,198,201,0.51) 0%, rgba(42,30,55,0.09) 59%, rgba(44,44,44,0.13) 100%), linear-gradient(180deg, rgba(255,251,247,.34) 15%, rgba(193,176,177,0.16) 77%)"
        }}
      />
      {/* Main hero content: animate in */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.97, delay: 0.16, type: "spring", stiffness: 60 }}
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "12vh",
          marginBottom: "10vh",
          width: "100%",
          maxWidth: 510,
          textAlign: "center",
          color: "var(--deep-cocoa)",
          padding: "1.2em 0.9em"
        }}
      >
        {/* Mascot mini-paw SVG for extra cuteness */}
        <motion.span
          style={{ display: "block", margin: "0 auto 0.51em auto" }}
          animate={{
            rotate: [0, -12, 12, -4, 0],
            y: [0, -11, 5, 0]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="54"
            height="44"
            viewBox="0 0 54 44"
            aria-label="Mascot paw icon"
            focusable="false"
          >
            <ellipse cx="27" cy="31" rx="15" ry="11" fill="#f9c6c9" />
            <circle cx="13" cy="19" r="6" fill="#c9e4ca" />
            <circle cx="41" cy="20" r="5" fill="#a9d6e5" />
            <ellipse cx="19" cy="9.5" rx="4" ry="3" fill="#F67280" />
            <ellipse cx="35" cy="9.5" rx="3.4" ry="3" fill="#F5E9CF" />
            {/* Sparkle */}
            <ellipse cx="35.2" cy="31" rx="2.5" ry="1.3" fill="#fff" fillOpacity="0.74" />
          </svg>
        </motion.span>

        {/* HEADLINE */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontSize: "clamp(2.1rem, 5vw, 2.9rem)",
            fontWeight: 900,
            letterSpacing: ".012em",
            color: "var(--heading-text)",
            marginBottom: "0.03em",
            textShadow: "0 5px 28px var(--blush-pink), 0 2.5px 11px var(--soft-sage)"
          }}
        >
          Adopt, Love, Smile!
          <br />
          <span
            style={{
              fontSize: "clamp(0.83rem, 2vw, 1.1rem)",
              color: "var(--primary)",
              fontFamily: "'Quicksand', sans-serif",
              letterSpacing: ".03em",
              fontWeight: 800
            }}
          >
            Joyful pets from Pexels
          </span>
        </h1>
        {/* Sub Headline */}
        <p
          className="hero-description"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "var(--text-secondary)",
            fontSize: "clamp(1.12rem, 2.5vw, 1.22rem)",
            marginBottom: "1.3em",
            fontWeight: 500
          }}
        >
          Dive into a pastel world of cuteness<br />
          Swipe, collect favorites, and find your new best friend!<br />
          <span style={{ color: "var(--sky-blue)", fontSize: "0.98em" }}>
            Photos powered by Pexels{photographer && <> ({photographer})</>}
          </span>
        </p>
        {/* CTA BUTTON */}
        <motion.button
          className="hero-btn bouncy"
          style={{
            background:
              "linear-gradient(101deg, var(--blush-pink), var(--sky-blue) 78%, var(--soft-sage) 97%)",
            color: "var(--deep-cocoa)",
            fontWeight: 900,
            fontFamily: "'Quicksand', 'Baloo 2', cursive",
            fontSize: "clamp(1.2em, 1.6vw, 1.5em)",
            padding: "0.97em 2.5em",
            border: "5px solid var(--mint)",
            borderRadius: "3em",
            boxShadow:
              "0 11px 42px var(--blush-pink), 0 2.5px 32px var(--sky-blue), 0 0.5px 12px var(--soft-sage)",
            marginTop: "0.4em",
            cursor: "pointer",
            transition: "box-shadow 0.14s, background 0.19s, transform 0.13s"
          }}
          onClick={onAdopt}
          tabIndex={0}
          whileHover={{
            scale: 1.07,
            background:
              "linear-gradient(87deg, var(--mint) 80%, var(--blush-pink) 100%)",
            color: "var(--deep-cocoa)"
          }}
          whileTap={{ scale: 0.96 }}
          aria-label="Start swiping pets!"
        >
          <span style={{ fontSize: "1.32em", marginRight: 10 }}>💖</span>
          Start Swiping!
        </motion.button>
        {/* Mini-feature row below */}
        <div
          className="hero-features-mini"
          style={{
            margin: "2.4em auto 0.7em auto",
            display: "flex",
            justifyContent: "space-around",
            gap: "1.5em",
            maxWidth: 490,
            width: "95%",
            zIndex: 5,
          }}
        >
          {features.map(f => (
            <motion.div
              key={f.label}
              className="hero-feature"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + 0.13 * features.indexOf(f), duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.6em 1em 0.7em 1em",
                background: "rgba(255,251,247,0.78)",
                borderRadius: "1.4em",
                minWidth: 92,
                boxShadow: "0 3px 12px var(--mint), 0 1px 4px var(--blush-pink)",
                fontWeight: 700
              }}
            >
              <span
                style={{
                  fontSize: "1.82em",
                  marginBottom: 2,
                  filter: "drop-shadow(0 2px 8px var(--secondary))"
                }}
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <span
                style={{
                  fontSize: "0.97em",
                  marginTop: 2,
                  color: "var(--deep-cocoa)",
                  fontFamily: "'Quicksand', 'Poppins', sans-serif",
                  textShadow: "0 2px 12px var(--soft-sage)",
                  lineHeight: 1.22,
                  fontWeight: 800
                }}
              >
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* End hero-content */}
      {/* Gradient fade at very bottom for smooth page transition */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "8vh",
          background: "linear-gradient(0deg, var(--app-bg) 78%, rgba(255,255,255,0.23) 100%, transparent 0%)",
          zIndex: 8
        }}
      />
    </section>
  );
}
