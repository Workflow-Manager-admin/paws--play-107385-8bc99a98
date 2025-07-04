import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Confetti burst animation using SVGs for lightweight shake
function Confetti() {
  const pieces = new Array(22).fill(0);
  return (
    <svg style={{
      position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1
    }} viewBox="0 0 400 250">
      {pieces.map((_, i) => {
        const x = 20 + Math.random() * 360;
        const y = 40 + Math.random() * 80;
        const len = 12 + Math.random() * 22;
        const r = 11 + Math.random() * 33;
        const colors = [
          "var(--accent)", "var(--secondary)", "var(--mint)", "var(--pop-sky)", "#FFB6B6", "#FFD36E"
        ];
        const c = colors[i % colors.length];
        return (
          <motion.line
            key={i}
            x1={x} y1={y} x2={x+len*Math.cos(r)} y2={y+len*Math.sin(r)}
            stroke={c}
            strokeWidth={i%3?3.7:2.1}
            strokeLinecap="round"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: [0, 12, -7, 10, 0] }}
            transition={{
              duration: 1.1 + Math.random()*0.4,
              delay: 0.08*i
            }}
          />
        )
      })}
    </svg>
  );
}

// Helper to save a certificate PNG for the user
function makeCertificateImg(petName, ref) {
  if (!ref.current) return;
  // Draw certificate as a canvas and save as PNG
  const node = ref.current;
  import("html2canvas").then(html2canvas => {
    html2canvas.default(node, { backgroundColor: null }).then(canvas => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${petName}_adoption_certificate.png`;
      a.click();
    });
  });
}

// PUBLIC_INTERFACE
export default function CertModal({ open, onClose, petName = "Peppy" }) {
  const certRef = useRef();

  // Animate confetti on open
  useEffect(() => {
    if (!open) return;
    // Simple audio for fun
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4fe0.mp3");
    audio.volume = 0.4;
    audio.play().catch(()=>{});
    // cleanup
    return () => { audio.pause(); };
  }, [open]);

  if (!open) return null;
  return (
    <motion.div key="modal"
      className="cert-modal shadow-bright"
      role="dialog"
      aria-modal="true"
      aria-label="Adoption Certificate Modal"
      style={{
        border: "3.5px dashed var(--primary)",
        background: "linear-gradient(115deg,var(--accent) 85%, var(--mint) 100%)",
        color: "var(--text-primary)",
        filter: "drop-shadow(0 0 15px var(--secondary))",
        boxShadow: "0 18px 48px var(--primary), 0 2px 24px var(--lavender)",
        position: "relative",
        overflow: "visible"
      }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1.06, opacity: 1 }}
      exit={{ scale: 0.87, opacity: 0 }}
      transition={{ type: "spring", stiffness: 244, damping: 20 }}
    >
      <Confetti />
      <button className="cert-close-btn" onClick={onClose} aria-label="Close modal"
        style={{ boxShadow: "0 2px 11px var(--secondary)", fontWeight: "bold", background: "var(--secondary)", color: "var(--accent)", zIndex: 2 }}
      >✕</button>
      {/* Downloadable certificate content */}
      <div ref={certRef} style={{
        padding: "0 3px"
      }}>
        <h2 className="headline" style={{ marginBottom: "0.29em", color: "var(--pop-sky)", letterSpacing: "0.8px" }}>
          🎉 Adoption Certificate 🎉
        </h2>
        <p style={{ fontWeight: 700, fontSize: "1.17em" }}>
          Congratulations!<br />
          <span style={{ color: "var(--primary)", filter: "brightness(1.22)", fontSize: "1.34em" }}>{petName}</span>
          <br />has joined your family!
        </p>
        <div style={{margin:"1.1em 0 0.5em 0", color:"var(--text-secondary)"}}>
          Download and print your certificate to celebrate this happy moment!
        </div>
      </div>
      <motion.button
        className="hero-btn"
        style={{
          background: "linear-gradient(90deg, var(--primary), var(--secondary))",
          color: "var(--text-bright)", fontSize: "1.1em",
          boxShadow: "0 1.5px 12px var(--secondary), 0 0.5px 4px var(--accent)"
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => makeCertificateImg(petName, certRef)}
        aria-label="Download adoption certificate as image"
      >Download Certificate</motion.button>
      <div style={{ fontSize: "0.92em", marginTop: 16, color: "var(--mint)" }}>
        Show this to friends to prove you adopted a new buddy!
      </div>
    </motion.div>
  );
}
