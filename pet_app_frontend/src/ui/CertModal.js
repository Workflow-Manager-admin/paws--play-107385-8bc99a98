import React, { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MascotLogo from "./MascotLogo";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Confetti burst: lightweight SVG, lively colors
function ConfettiBurst() {
  // Fixed confetti pieces for reproducibility
  const pieces = Array.from({ length: 22 });
  const palette = [
    "var(--accent)",
    "var(--primary)",
    "var(--sky-blue)",
    "var(--mint)",
    "#FFD36E",
    "#B6E1FF",
    "#FFB6B6"
  ];
  // Each piece is a circle or small line, horizontal + vertical spread
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1
      }}
      viewBox="0 0 400 260"
    >
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 2 * Math.PI;
        const radius = 85 + Math.random() * 75;
        const x = 200 + Math.cos(angle) * radius;
        const y = 100 + Math.sin(angle) * (radius * 0.68);
        const c = palette[i % palette.length];
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={7 + (i % 3)}
            fill={c}
            initial={{ opacity: 0, scale: 0.62 }}
            animate={{ opacity: [0.8, 1, 0.7, 0], scale: [0.95, 1.15, 0.7, 0.6], cy: [80, y + 20 + Math.random() * 16, y + 31] }}
            transition={{
              delay: 0.03 * i, duration: 1.55 + Math.random() * 0.2,
              type: "spring", stiffness: 50, damping: 7
            }}
          />
        );
      })}
    </svg>
  );
}

// PDF certificate generation helper
function generatePdfCertificate(petName, dateStr, nodeRef) {
  if (!nodeRef.current) return;
  const node = nodeRef.current;
  html2canvas(node, { backgroundColor: null, scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${petName}_adoption_certificate.pdf`);
  });
}

// PUBLIC_INTERFACE
/**
 * CertModal: Lively, accessible modal with confetti, animated pet, and downloadable personalized PDF certificate.
 * Accessibility: Full ARIA roles, keyboard focus, screen reader support, and feedback.
 * Modern playful style per App palette.
 */
export default function CertModal({ open, onClose, petName = "Peppy" }) {
  const certRef = useRef();

  // Focus first actionable on modal open for accessibility
  const closeBtnRef = useRef();
  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [open]);

  // Esc key closes modal (keyboard accessibility)
  const handleKeyDown = useCallback(e => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    }
    if ((e.key === "Tab" || e.key === "Shift+Tab") && certRef.current) {
      // Trap focus inside modal
      const focusable = certRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }, [onClose]);

  // For date on certificate
  const todayStr = new Date().toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric"
  });

  // Play playful confetti sound on open
  useEffect(() => {
    if (!open) return;
    const audio = new window.Audio("https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4fe0.mp3");
    audio.volume = 0.40;
    audio.play().catch(()=>{});
    return () => { audio.pause(); };
  }, [open]);

  // Do not render if closed
  if (!open) return null;

  // Modal body & PDF styling
  return (
    <AnimatePresence>
      <motion.div
        key="cert-modal"
        className="cert-modal shadow-bright"
        id="adopt-cert-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Adoption Success Modal"
        tabIndex={-1}
        style={{
          outline: "4.5px solid var(--primary)",
          outlineOffset: "-2.3px",
          padding: "2.12em 1.61em 2.39em",
          background: "var(--card-bg)",
          maxWidth: 412,
          margin: "5vh auto 0 auto",
          zIndex: 2002,
          position: "fixed",
          left: 0,
          right: 0,
          top: "12vh",
          boxShadow: "0 18px 55px var(--accent), 0 2px 11px var(--mint)",
          borderRadius: "2.2em"
        }}
        initial={{ scale: 0.67, opacity: 0 }}
        animate={{ scale: 1.03, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        onKeyDown={handleKeyDown}
      >
        <ConfettiBurst />
        {/* Close button - ARIA, focus, keyboard-trappable */}
        <button
          ref={closeBtnRef}
          className="cert-close-btn"
          style={{
            position: "absolute", top: 18, right: 18, zIndex: 11,
            background: "var(--secondary)", color: "var(--accent)",
            fontSize: "1.6em", fontWeight: "bold", border: "none", borderRadius: "50%",
            width: 41, height: 41, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 11px var(--mint)"
          }}
          aria-label="Close adoption certificate modal"
          onClick={onClose}
        >✕</button>
        {/* Certificate Visual Section (PDF render target) */}
        <div
          ref={certRef}
          style={{
            background: "linear-gradient(103deg,var(--cotton-white) 70%, var(--sky-blue) 109%)",
            padding: "2.2em 1.1em 1.8em",
            margin: "0 auto 1.5em auto",
            borderRadius: "2em",
            boxShadow: "0 6px 28px #FFD36E75, 0 2.5px 8px var(--mint)",
            maxWidth: 360,
            width: "92vw",
            textAlign: "center",
            position: "relative",
            color: "var(--deep-cocoa)",
            outline: "4px dashed var(--accent)",
            outlineOffset: "-1.2em"
          }}
          aria-label="Your adoption certificate preview"
        >
          {/* Mascot icon at top */}
          <div style={{ position: "absolute", left: 18, top: 12 }}>
            <MascotLogo size={43} alt="Mascot logo" />
          </div>
          <h2
            className="headline"
            style={{
              margin: "0 0 0.18em 0",
              color: "var(--petal)",
              letterSpacing: "1px",
              fontFamily: "'Baloo 2',cursive"
            }}
          >
            🎉 Adoption Certificate 🎉
          </h2>
          <div
            style={{
              fontFamily: "'Quicksand','Poppins',sans-serif",
              color: "var(--deep-cocoa)",
              fontSize: "1.18em",
              fontWeight: 700,
              marginBottom: ".67em"
            }}
            aria-live="polite"
          >
            This certifies that<br />
            <span
              style={{
                color: "var(--primary)",
                fontWeight: 900,
                fontSize: "1.53em",
                filter: "brightness(1.18)"
              }}
              aria-label="Pet name"
            >
              {petName}
            </span>
            <br />
            has been joyfully adopted<br />
            on
            <span style={{
              fontWeight: 800, color: "var(--secondary)", marginLeft: 6
            }}>{todayStr}</span>
          </div>
          {/* Animated pet illustration for celebration */}
          <motion.div
            initial={{ scale: 0.75, rotate: 0, y: 9 }}
            animate={{
              scale: [0.82, 1.15, 1.03, 0.95, 1.02],
              rotate: [3, -11, 9, -5, 0],
              y: [9, -10, 7, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.17,
              ease: "easeInOut"
            }}
            style={{
              margin: "0.7em auto 1.3em auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-hidden="true"
          >
            <MascotLogo size={93} alt="Adopted Pet Animation" />
          </motion.div>
          <div style={{
            color: "var(--text-secondary)",
            fontWeight: 600,
            fontSize: "0.99em",
            margin: "0.3em 0"
          }}>
            Download and share your certificate to celebrate this special bond!
          </div>
        </div>
        <motion.button
          className="hero-btn"
          style={{
            background: "linear-gradient(90deg, var(--primary), var(--secondary))",
            color: "var(--text-bright)",
            fontSize: "1.09em",
            boxShadow: "0 1.5px 12px var(--secondary), 0 0.5px 4px var(--accent)",
            margin: "0 auto 0.15em auto",
            fontWeight: 900,
            display: "block",
            borderRadius: "1.55em",
            outline: "none"
          }}
          whileTap={{ scale: 0.97 }}
          aria-label="Download adoption certificate as PDF"
          onClick={() => generatePdfCertificate(petName, todayStr, certRef)}
          tabIndex={0}
        >
          Download PDF Certificate
        </motion.button>
        <div style={{
          fontSize: "0.89em",
          marginTop: 14,
          color: "var(--mint)",
          textAlign: "center",
          letterSpacing: ".01em"
        }}>
          Tip: Print this out, or share to prove you've adopted a new best friend!
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
