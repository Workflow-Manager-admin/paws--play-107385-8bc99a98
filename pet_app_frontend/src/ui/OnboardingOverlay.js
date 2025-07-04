import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * OnboardingOverlay - A friendly, dismissible overlay explaining main actions/features for first-time users.
 * Mobile-first; overlays key UI elements for instant clarity.
 * Uses localStorage to avoid showing again if dismissed.
 */
export default function OnboardingOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if not seen before:
    if (!localStorage.getItem("onboarding-complete")) {
      setTimeout(() => setShow(true), 1000); // Delay for effect
    }
  }, []);

  function hide() {
    setShow(false);
    localStorage.setItem("onboarding-complete", "true");
  }

  if (!show) return null;

  // Responsive position helper
  const mobile = window.innerWidth < 700;

  return (
    <AnimatePresence>
      <motion.div
        key="onboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          zIndex: 4440,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(32,18,63, 0.13)",
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          initial={{ scale: 0.96 }}
          animate={{ scale: 1.08 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: "spring", stiffness: 155 }}
          style={{
            background: "linear-gradient(112deg,var(--mint) 90%,var(--accent))",
            borderRadius: "2em",
            boxShadow: "0 6px 44px var(--primary),0 2.5px 13px var(--secondary)",
            padding: mobile ? "1.5em 1.2em" : "1.9em 2.3em",
            maxWidth: "99vw",
            width:  mobile ? "94vw" : "490px",
            color: "var(--text-primary)",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div style={{
            fontSize: mobile ? "2em" : "2.5em",
            marginBottom: mobile ? 10 : 24,
            userSelect: "none",
          }}>👋</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: mobile ? "1.15em" : "1.27em",
              marginBottom: 8,
              fontFamily: "'Quicksand','Baloo 2',cursive"
            }}
          >
            Welcome to Adopt-A-Pet!
          </div>
          <div
            style={{
              color: "var(--pop-sky)",
              fontWeight: 600,
              marginBottom: 14,
            }}>
            {mobile
              ? <>Swipe 🐾, tap ♥, then 'Adopt!' to earn badges. <br />Try the Virtual Home Trial 🏡 at the bottom!</>
              : <>Use your mouse or keyboard to swipe pets (⏪/💖), save favorites, adopt for a fun surprise,<br />and decorate with the Virtual Home Trial 🏡!</>
            }
          </div>
          <ul style={{ textAlign: "left", fontSize: mobile ? "1em" : "1.05em", margin: "17px auto 15px auto", padding: 0, maxWidth: mobile ? "97vw" : 400, color: "var(--text-secondary)" }}>
            <li>🐾 Swipe cards: <b>left</b> to skip, <b>right</b> to favorite.</li>
            <li>💖 Collect favorites & unlock badges!</li>
            <li>🏡 Try Virtual Home Trial to visualize a pet in your room.</li>
            <li>🎉 Adopt to win a surprise and download your certificate!</li>
          </ul>
          <motion.button
            className="hero-btn bouncy"
            onClick={hide}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "linear-gradient(90deg,var(--primary),var(--mint))",
              color: "var(--text-bright)",
              fontSize: "1.05em",
              fontWeight: 700,
              marginTop: "1em",
              padding: ".55em 2.2em",
              boxShadow: "0 4px 30px var(--secondary)",
              borderRadius: "1.8em",
              outlineOffset: "0.6em"
            }}
            aria-label="Got it! Dismiss onboarding"
            autoFocus
          >Let's Play!</motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
