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
        background: "var(--accent)",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Baloo 2',cursive",
        fontSize: size * 0.51,
        border: "3.3px solid var(--primary)",
        boxShadow: "0 4px 12px rgba(255,183,182,0.10)",
        marginRight: 10,
      }}
      aria-label="Paw App Mascot Logo"
    >
      {/* SVG pawprint */}
      <svg width={Math.round(size*0.82)} height={Math.round(size*0.82)} viewBox="0 0 32 32">
        <circle cx="16" cy="22" r="8" fill="#FFB6B6"/>
        <circle cx="7" cy="13" r="4.2" fill="#B6E1FF"/>
        <circle cx="25" cy="13" r="4" fill="#FFD9B6"/>
        <circle cx="12" cy="6.6" r="2.82" fill="#B6FFDE"/>
        <circle cx="20" cy="6.6" r="2.78" fill="#FFB6B6"/>
      </svg>
    </span>
  );
}
