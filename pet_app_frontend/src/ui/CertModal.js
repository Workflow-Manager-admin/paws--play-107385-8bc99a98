import React from "react";

// PUBLIC_INTERFACE
export default function CertModal({ open, onClose, petName="Peppy" }) {
  if (!open) return null;
  return (
    <div
      className="cert-modal shadow-bright"
      role="dialog"
      aria-modal="true"
      style={{
        border: "3.5px dashed var(--primary)",
        background: "linear-gradient(115deg,var(--accent) 85%, var(--mint) 100%)",
        color: "var(--text-primary)",
        filter: "drop-shadow(0 0 15px var(--secondary))",
        boxShadow: "0 18px 48px var(--primary), 0 2px 24px var(--lavender)"
      }}>
      <button className="cert-close-btn" onClick={onClose} aria-label="Close modal"
        style={{ boxShadow: "0 2px 11px var(--secondary)", fontWeight: "bold", background: "var(--secondary)", color: "var(--accent)" }}
      >✕</button>
      <h2 className="headline" style={{marginBottom: "0.29em", color: "var(--pop-sky)"}}>🎉 Adoption Certificate 🎉</h2>
      <p style={{fontWeight:700, fontSize:"1.17em"}}>
        Congratulations!<br />
        <span style={{ color: "var(--primary)", filter: "brightness(1.22)" }}>{petName}</span><br />has joined your family!
      </p>
      <div style={{margin:"1.3em 0", color:"var(--text-secondary)"}}>Download and print your certificate to celebrate!</div>
      <button className="hero-btn" style={{
        background: "linear-gradient(90deg, var(--primary), var(--secondary))",
        color: "var(--text-bright)", fontSize: "1.1em"
      }}>Download PDF</button>
    </div>
  );
}
