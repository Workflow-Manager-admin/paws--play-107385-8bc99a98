import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPetImages } from "../pexelsApi";

/**
 * Immersive fullscreen hero for the landing page.
 * Features (Updated spec):
 * - Fullscreen Pexels pet image with soft vignette overlay
 * - Modern, emotional, big headline and subheadline with pastel emojis
 * - Bouncy blush pink pill CTA: "Start Swiping 🐾"
 * - Playful mini-feature row: ❤️ Save Pets · 🎉 Adopt Virtually · 🛋️ Try in Your Room
 * - Soft pastel palette, modern fonts, emotional copy!
 */
// PUBLIC_INTERFACE
export default function HeroSection({ onAdopt }) {
  // Fetch a Pexels pet photo for visual impact
  const [bgPhoto, setBgPhoto] = useState(null);
  const [photographer, setPhotographer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetImages("cute puppy OR kitten", 6, 1)
      .then(({ photos }) => {
        if (photos && photos.length) {
          const best = photos.find(
            ph => (ph.width >= ph.height && ph.src.landscape) || ph.src.original
          ) || photos[0];
          setBgPhoto(best.src.landscape || best.src.original || best.src.medium);
          setPhotographer(best.photographer || "");
        }
        setLoading(false);
      })
      .catch(() => {
        setBgPhoto(
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=800"
        );
        setPhotographer("Pexels");
        setLoading(false);
      });
  }, []);

  // Mini features per design: ❤️ Save · 🎉 Adopt Virtually · 🛋️ Try in Room
  const features = [
    { icon: "❤️", label: "Save Pets" },
    { icon: "🎉", label: "Adopt Virtually" },
    { icon: "🛋️", label: "Try in Your Room" }
  ];

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
        padding: 0,
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
      {/* Background hero image from Pexels with fade-in & vignette */}
      <AnimatePresence>
        {bgPhoto && (
          <motion.img
            key={bgPhoto}
            src={bgPhoto}
            alt="Adorable pet background"
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.12 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              width: "100vw",
              height: "100%",
              minHeight: "97vh",
              zIndex: 0,
              filter: "brightness(0.93) saturate(1.09)",
              willChange: "transform, opacity",
              pointerEvents: "none",
              userSelect: "none"
            }}
            draggable={false}
          />
        )}
      </AnimatePresence>
      {/* Soft, updated vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100%",
          minHeight: "97vh",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 65%, rgba(249,198,201,0.62) 3%, rgba(44,44,44,0.08) 70%, rgba(44,44,44,0.21) 100%), linear-gradient(180deg, rgba(255,251,247,0.33) 12%, rgba(42,30,55,0.10) 80%)"
        }}
      />
      {/* Hero Page Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 92 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.09, type: "spring", stiffness: 62 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 520,
          margin: "15vh auto 9vh auto",
          textAlign: "center",
          color: "var(--heading-text)",
          padding: "1.6em 1em 0.8em 1em",
          filter: "drop-shadow(0 6.5px 55px var(--blush-pink))"
        }}
      >
        <motion.span
          style={{
            display: "block",
            margin: "0 auto 0.47em auto",
            fontSize: "2.1em",
            filter: "drop-shadow(0 1.5px 24px var(--primary))"
          }}
          animate={{
            y: [0, -7, 3, 0],
            rotate: [0, -13, 15, -5, 0]
          }}
          transition={{ duration: 2.19, repeat: Infinity, ease: "easeInOut" }}
        >🐾</motion.span>
        {/* Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: "'Baloo 2', 'Fredoka One', cursive",
            fontSize: "clamp(2.15rem, 6vw, 2.95rem)",
            fontWeight: 900,
            color: "var(--heading-text)",
            letterSpacing: "0.012em",
            lineHeight: 1.07,
            margin: "0 0 0.1em 0",
            textShadow: "0 5px 39px var(--blush-pink), 0 1px 13px var(--soft-sage), 0 0.5px 5px var(--sky-blue)"
          }}
        >
          Love at First Swipe.
        </h1>
        <p
          className="hero-description"
          style={{
            fontFamily: "'Poppins', 'Lato', sans-serif",
            color: "var(--text-secondary)",
            fontSize: "clamp(1.16rem, 2.7vw, 1.28rem)",
            margin: "0.1em 0 1.25em 0",
            fontWeight: 600
          }}
        >
          Discover pets who'll steal your heart 💝<br />
          Save cuties, adopt virtually, and try them at home—powered by Pexels<br />
          <span style={{ color: "var(--sky-blue)", fontSize: "0.95em" }}>
            {photographer ? `Photo: ${photographer}` : "Photos by Pexels"}
          </span>
        </p>
        {/* CTA BUTTON */}
        <motion.button
          className="hero-btn bouncy"
          style={{
            background:
              "linear-gradient(101deg, var(--blush-pink) 65%, var(--sky-blue) 100%)",
            color: "#fff",
            fontWeight: 900,
            fontFamily: "'Quicksand','Baloo 2','Fredoka One', cursive",
            fontSize: "clamp(1.26em, 2vw, 1.5em)",
            padding: "0.9em 2.7em",
            border: "4px solid var(--mint)",
            borderRadius: "2.6em",
            boxShadow:
              "0 14px 40px var(--primary), 0 2.5px 24px var(--mint), 0 0.5px 14px var(--soft-sage)",
            marginTop: "0.45em",
            cursor: "pointer",
            transition: "box-shadow 0.16s, background 0.21s, transform 0.13s"
          }}
          onClick={onAdopt}
          tabIndex={0}
          whileHover={{
            scale: 1.09,
            background:
              "linear-gradient(99deg, var(--secondary) 75%, var(--blush-pink) 100%)",
            color: "#fff"
          }}
          whileTap={{ scale: 0.96 }}
          aria-label="Start swiping pets!"
        >
          Start Swiping <span style={{
            fontSize: "1.32em",
            marginLeft: 14,
            filter: "drop-shadow(0 2px 7px var(--favorite))"
          }}>🐾</span>
        </motion.button>
        {/* Mini-feature row */}
        <div
          className="hero-features-mini"
          style={{
            margin: "2.31em auto 0.77em auto",
            display: "flex",
            justifyContent: "space-around",
            gap: "1.32em",
            maxWidth: 470,
            width: "96%",
            zIndex: 5
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              className="hero-feature"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.37 + 0.14 * i,
                duration: 0.48,
                type: "spring",
                stiffness: 195
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.65em 1.25em 0.85em 1.25em",
                background: "rgba(255,251,247,0.82)",
                borderRadius: "1.5em",
                minWidth: 95,
                boxShadow: "0 4px 17px var(--mint), 0 1.5px 7px var(--blush-pink)",
                fontWeight: 700
              }}
            >
              <span
                style={{
                  fontSize: "2.1em",
                  marginBottom: 2,
                  filter: "drop-shadow(0 2px 11px var(--favorite))"
                }}
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <span
                style={{
                  fontSize: "1.01em",
                  marginTop: 2,
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
      {/* Nice fade bottom gradient for page transition */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "8vh",
          background: "linear-gradient(0deg, var(--app-bg) 78%, rgba(255,255,255,0.29) 100%, transparent 0%)",
          zIndex: 8
        }}
      />
    </section>
  );
}
