import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * OnboardingOverlay - A friendly, dismissible overlay explaining main actions/features for first-time users.
 * Mobile-first; overlays key UI elements for instant clarity.
 * Uses localStorage to avoid showing again if dismissed.
 * Improved: Now auto-dismisses after a timeout and supports click/key/click-outside dismissal + fade animation & accessibility.
 */
export default function OnboardingOverlay() {
  const [show, setShow] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const overlayRef = useRef(null);
  const dismissTimeout = useRef(null);

  // Controller: only show if not previously completed.
  useEffect(() => {
    if (!localStorage.getItem("onboarding-complete")) {
      setTimeout(() => setShow(true), 700); // Slightly earlier
    }
    return () => clearTimeout(dismissTimeout.current);
  }, []);

  // Auto-dismiss logic (5.8s after shown)
  useEffect(() => {
    if (show && !fadingOut) {
      dismissTimeout.current = setTimeout(() => triggerFade(), 5800);
    }
    return () => clearTimeout(dismissTimeout.current);
  }, [show, fadingOut]);

  // Keyboard/event listener for accessibility
  useEffect(() => {
    if (!show) return;
    function handleKey(e) {
      if (
        e.key === "Escape" ||
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "Spacebar"
      ) {
        triggerFade();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [show]);

  // Fade-out trigger with nice animation and persist
  function triggerFade() {
    setFadingOut(true);
    setTimeout(() => {
      setShow(false);
      localStorage.setItem("onboarding-complete", "true");
      setFadingOut(false);
    }, 610); // Match animation duration
  }

  // Dismiss on window click (not inside the overlay card)
  function handleBackdropClick(e) {
    if (e.target === overlayRef.current) triggerFade();
  }

  if (!show) return null;

  // Responsive position helper
  const mobile = window.innerWidth < 700;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        key="onboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: "none" }}
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
          transition: "opacity 0.6s cubic-bezier(0.65,0.28,0.32,1)",
          ...(fadingOut ? { opacity: 0, pointerEvents: "none" } : {})
        }}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        onClick={handleBackdropClick}
        onKeyDown={e => {
          // Keyboard dismiss (if not handled by global listener)
          if (["Escape", " ", "Enter", "Spacebar"].includes(e.key)) triggerFade();
        }}
      >
        <motion.div
          initial={{ scale: 0.96 }}
          animate={{
            scale: fadingOut ? 0.84 : 1.08,
            opacity: fadingOut ? 0 : 1
          }}
          exit={{ scale: 0.81, opacity: 0, transition: { duration: 0.51 } }}
          transition={{
            type: "spring", stiffness: 155,
            duration: fadingOut ? 0.59 : 0.38
          }}
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
            cursor: "auto",
            outline: "none"
          }}
          tabIndex={0}
          aria-label="Welcome/Onboarding instructions"
          onClick={e => e.stopPropagation()}
          // Keyboard clickable main card
          onKeyDown={e => {
            if (["Enter", " ", "Spacebar", "Escape"].includes(e.key)) triggerFade();
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
            onClick={triggerFade}
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
          <div style={{
            fontSize: "0.99em",
            marginTop: 13,
            color: "var(--lavender)",
            opacity: 0.85,
            fontFamily: "Quicksand, Arial, sans-serif"
          }}>
            <span style={{letterSpacing:"0.01em"}}>
              This message will automatically disappear after a few seconds
              <span aria-hidden="true"> &middot; </span>
              or <b>press Esc/Enter/Space, click outside, or tap "Let's Play!"</b>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
