import React from "react";

// PUBLIC_INTERFACE
/**
 * Lively mascot logo – exuberant, friendly, Duolingo-style paw, extra colorful and accessible.
 */
export default function MascotLogo({ size = 46, alt = "Adopt-a-Pet Mascot Logo" }) {
  // Accessibility: now including an aria-label and role for screen readers, alt param, and title.
  // Add subtle facial features for extra delight!
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
        outline: "3.5px solid var(--text-bright)",
        outlineOffset: "-1.35px"
      }}
      aria-label={alt}
      role="img"
      tabIndex={0}
      title={alt}
    >
      {/* SVG mascot: duotone, little smile, sparkle highlight */}
      <svg
        width={Math.round(size*0.93)}
        height={Math.round(size*0.93)}
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        {/* Main paw pad with gradient highlight */}
        <ellipse cx="18" cy="24" rx="10" ry="8" fill="url(#pawgrad)" stroke="var(--primary)" strokeWidth="1.2" />
        <defs>
          <linearGradient id="pawgrad" x1="8" y1="16" x2="28" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD36E" />
            <stop offset="0.55" stopColor="#FF8AC2" />
            <stop offset="1" stopColor="#85A8FF" />
          </linearGradient>
        </defs>
        {/* Toes */}
        <circle cx="8" cy="14" r="4.2" fill="var(--secondary)" />
        <circle cx="28" cy="14" r="4" fill="var(--accent)" />
        <circle cx="13" cy="7.5" r="3" fill="var(--mint)" />
        <circle cx="23" cy="7.5" r="2.8" fill="var(--lavender)" />
        {/* Cartoon sparkle/highlight */}
        <ellipse cx="22.5" cy="26" rx="3" ry="1.3" fill="#fff" fillOpacity="0.64" />
        {/* Subtle cartoon face: eyes & smile */}
        <ellipse cx="15" cy="26" rx="0.9" ry="1.3" fill="#332" fillOpacity="0.45" />
        <ellipse cx="21" cy="26" rx="0.9" ry="1.3" fill="#332" fillOpacity="0.45" />
        <path d="M16.7 28.3 Q18 29.2 19.3 28.3" stroke="#332211" strokeWidth="0.45" fill="none" strokeLinecap="round" />
        {/* Wiggle eyebrows for extra cuteness */}
        <path d="M14.2 24.7 Q15.0 23.6 15.8 24.6" stroke="#A59DCC" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M20.2 24.7 Q21 23.7 21.8 24.65" stroke="#A59DCC" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}
