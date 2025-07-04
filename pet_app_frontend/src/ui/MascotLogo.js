import React from "react";

// PUBLIC_INTERFACE
/**
 * Cute mascot logo using pawprint sticker style.
 */
export default function MascotLogo({ size = 46 }) {
  return (
    <span
      className="brand-logo soft-shadow"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        background: "linear-gradient(135deg, var(--accent) 78%, var(--secondary) 120%)",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Baloo 2',cursive",
        fontSize: size * 0.51,
        border: "3.5px solid var(--primary)",
        boxShadow: "0 6px 20px var(--primary), 0 0.5px 6px var(--secondary)",
        marginRight: 10,
      }}
      aria-label="Paw App Mascot Logo"
    >
      {/* SVG pawprint in pop pastel */}
      <svg width={Math.round(size*0.82)} height={Math.round(size*0.82)} viewBox="0 0 32 32">
        <circle cx="16" cy="22" r="8" fill="var(--primary)" />
        <circle cx="7" cy="13" r="4.2" fill="var(--secondary)" />
        <circle cx="25" cy="13" r="4" fill="var(--accent)" />
        <circle cx="12" cy="6.6" r="2.82" fill="var(--mint)" />
        <circle cx="20" cy="6.6" r="2.78" fill="var(--lavender)" />
      </svg>
    </span>
  );
}
