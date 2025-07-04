import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPetImages } from "../pexelsApi";

/**
 * Immersive fullscreen hero for the landing page.
 * Features (Updated spec):
 * - Fullscreen Pexels pet image with soft pastel vignette (animates in)
 * - Modern, huge, emotional headline with soft bouncy CTA in blush-pink
 * - Subheadline with pastel emoji, large font, and playful caption
 * - Mini row of features (emoji icon + label) in pill/soft-card style
 * - Fully responsive, matching margin/padding/guidelines and palette
 */
// PUBLIC_INTERFACE
export default function HeroSection({ onAdopt }) {
  // Remote fetch: fullscreen Pexels pet photo, ideally landscape for wow effect
  const [bgUrl, setBgUrl] = useState(null);
  const [photographer, setPhotographer] = useState("");
  const [loading, setLoading] = useState(true);
  // Feature list per latest spec
  const features = [
    { icon: "💖", label: "Save Pets" },
    { icon: "🎉", label: "Adopt Virtually" },
    { icon: "🛋️", label: "Try in Your Room" }
  ];

  useEffect(() => {
    setLoading(true);
    fetchPetImages("cute puppy OR kitten", 8, 1)
      .then(({ photos }) => {
        if (photos && photos.length) {
          // Prefer landscape/wide photo, fallback to first
          let best = photos.find(
            ph => (ph.width > ph.height) && ph.src.landscape
          ) || photos[0];
          setBgUrl(best.src.landscape || best.src.original || best.src.medium);
          setPhotographer(best.photographer || "");
        }
        setLoading(false);
      })
      .catch(() => {
        setBgUrl("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=900");
        setPhotographer("Pexels");
        setLoading(false);
      });
  }, []);

  // Soft, modern vignette overlay (pink gradient with transparent fade to edges)
  const vignetteStyle = {
    position: "absolute",
    inset: 0,
    width: "100vw",
    height: "100%",
    minHeight: "97vh",
    zIndex: 1,
    pointerEvents: "none",
    background:
      "radial-gradient(ellipse at 50% 65%, rgba(249,198,201,0.60) 14%, rgba(201,228,202,0.10) 60%, rgba(44,44,44,0.14) 100%), linear-gradient(180deg, rgba(255,251,247,0.23) 20%, rgba(42,30,55,0.17) 90%)"
  };

  return (
    <section
      className="hero hero-fullscreen"
      id="home"
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        minHeight: "97vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--app-bg)",
        overflow: "hidden",
        boxShadow: "0 7px 44px #F9C6C933"
      }}
      aria-label="Pet Adoption App Hero"
    >
      {/* Animated fade-in photo background */}
      <AnimatePresence>
        {bgUrl && (
          <motion.img
            key={bgUrl}
            src={bgUrl}
            alt="Adorable pet background"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.18 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              width: "100vw",
              height: "100%",
              minHeight: "97vh",
              zIndex: 0,
              filter: "brightness(0.93) saturate(1.10)",
              willChange: "transform, opacity",
              pointerEvents: "none",
              userSelect: "none"
            }}
            draggable={false}
          />
        )}
      </AnimatePresence>
      {/* Vignette effect overlays hero image */}
      <div aria-hidden="true" style={vignetteStyle} />

      {/* HERO CONTENT */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 86 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.08, delay: 0.10, type: "spring", stiffness: 54 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 540,
          margin: "14vh auto 11vh auto",
          padding: "1.4em 1.0em 0.8em 1.0em",
          textAlign: "center",
          color: "var(--heading-text)",
          filter: "drop-shadow(0 8.5px 55px var(--blush-pink))"
        }}
      >
        {/* Animated paw/emoji up top for energy */}
        <motion.span
          style={{
            display: "block",
            margin: "0 auto 0.48em auto",
            fontSize: "2.4em",
            filter: "drop-shadow(0 2.5px 32px var(--primary))"
          }}
          animate={{
            y: [0, -8, 2, 0],
            rotate: [0, -12, 11, -5, 0]
          }}
          transition={{ duration: 2.29, repeat: Infinity, ease: "easeInOut" }}
        >🐾</motion.span>
        {/* Emotional, oversized headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: "'Baloo 2', 'Fredoka One', cursive",
            fontSize: "clamp(2.28rem, 6vw, 2.98rem)",
            fontWeight: 900,
            color: "var(--heading-text)",
            letterSpacing: "0.011em",
            lineHeight: 1.05,
            margin: "0 0 0.1em 0",
            textShadow: "0 6px 45px var(--blush-pink), 0 1px 19px var(--soft-sage), 0 1.5px 7px var(--sky-blue)"
          }}
        >
          Love at First Swipe.
        </h1>
        {/* Uplifting subheadline */}
        <p
          className="hero-description"
          style={{
            fontFamily: "'Poppins', 'Lato', sans-serif",
            color: "var(--text-secondary)",
            fontSize: "clamp(1.19rem, 2.8vw, 1.33rem)",
            margin: "0.1em 0 1.23em 0",
            fontWeight: 700
          }}
        >
          Discover pets that'll steal your heart{" "}
          <span role="img" aria-label="heart" style={{ fontSize: "1.2em" }}>💝</span>
          <br />
          Save favorites, adopt virtually, and try them at home—powered by live Pexels photos.
          <br />
          <span style={{ color: "var(--sky-blue)", fontSize: "0.95em" }}>
            {photographer ? `Photo: ${photographer}` : "Photos by Pexels"}
          </span>
        </p>
        {/* Main fullscreen CTA: animated blush-pink bouncy button */}
        <motion.button
          className="hero-btn bouncy"
          style={{
            background: "linear-gradient(101deg, var(--blush-pink) 65%, var(--sky-blue) 100%)",
            color: "#fff",
            fontWeight: 900,
            fontFamily: "'Quicksand','Baloo 2','Fredoka One', cursive",
            fontSize: "clamp(1.28em, 2vw, 1.55em)",
            padding: "0.95em 2.8em",
            border: "4px solid var(--mint)",
            borderRadius: "2.7em",
            boxShadow: "0 18px 54px var(--primary), 0 3.5px 24px var(--mint), 0 0.5px 18px var(--soft-sage)",
            marginTop: "0.48em",
            marginBottom: "0.8em",
            cursor: "pointer",
            transition: "box-shadow 0.16s, background 0.19s, transform 0.13s"
          }}
          tabIndex={0}
          aria-label="Start swiping pets!"
          whileHover={{
            scale: 1.09,
            background: "linear-gradient(97deg, var(--secondary) 75%, var(--blush-pink) 100%)",
            color: "#fff"
          }}
          whileTap={{ scale: 0.96 }}
          onClick={onAdopt}
        >
          Start Swiping <span style={{
            fontSize: "1.34em",
            marginLeft: 14,
            filter: "drop-shadow(0 2px 17px var(--coral-red))"
          }}>🐾</span>
        </motion.button>
        {/* MINI-FEATURE ROW (emoji + text) */}
        <div
          className="hero-features-mini"
          style={{
            margin: "2.31em auto 1em auto",
            display: "flex",
            justifyContent: "space-around",
            gap: "1.33em",
            maxWidth: 470,
            width: "96%",
            zIndex: 5
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              className="hero-feature"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.33 + 0.16 * i,
                duration: 0.48,
                type: "spring",
                stiffness: 190
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.6em 1.15em 0.8em 1.15em",
                background: "rgba(255,251,247,0.83)",
                borderRadius: "1.5em",
                minWidth: 92,
                boxShadow: "0 4px 17px var(--mint), 0 2.5px 7px var(--blush-pink)",
                fontWeight: 700
              }}
            >
              <span
                style={{
                  fontSize: "2.1em",
                  marginBottom: 4,
                  filter: "drop-shadow(0 2px 13px var(--favorite))"
                }}
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <span
                style={{
                  fontSize: "1.07em",
                  marginTop: 1,
                  color: "var(--deep-cocoa)",
                  fontFamily: "'Quicksand','Poppins',sans-serif",
                  textShadow: "0 2px 8px var(--soft-sage)",
                  lineHeight: 1.19,
                  fontWeight: 800
                }}
              >
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Nice fade bottom gradient for page transition/edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "9vh",
          background: "linear-gradient(0deg, var(--app-bg) 92%, rgba(255,255,255,0.20) 100%, transparent 0%)",
          zIndex: 8
        }}
      />
    </section>
  );
}
