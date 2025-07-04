import React from "react";

// PUBLIC_INTERFACE
export default function CertModal({ open, onClose, petName="Peppy" }) {
  if (!open) return null;
  return (
    <div className="cert-modal" role="dialog" aria-modal="true">
      <button className="cert-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
      <h2 className="headline" style={{marginBottom: "0.29em"}}>🎉 Adoption Certificate 🎉</h2>
      <p style={{fontWeight:700, fontSize:"1.12em"}}>Congratulations!<br />
        <span style={{ color: "var(--primary)" }}>{petName}</span><br /> has joined your family!</p>
      <div style={{margin:"1.3em 0"}}>Download and print your certificate to celebrate!</div>
      <button>Download PDF</button>
    </div>
  );
}
