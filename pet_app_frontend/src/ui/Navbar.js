import React from "react";
import MascotLogo from "./MascotLogo";

/**
 * Navbar with sticky bottom tab layout, animated pill buttons,
 * big emoji icons for navigation, and cozy/accessible theming.
 * See App.css for sticky nav styles. Lottie animation ready for future.
 */
// PUBLIC_INTERFACE
export default function Navbar({ onCta }) {
  // Nav label, icon, and anchor info for sticky tab
  const navLinks = [
    { label: "Home", icon: "🏠", href: "#home" },
    { label: "Swipe", icon: "❤️", href: "#swipe" },
    { label: "Favorites", icon: "📖", href: "#favorites" },
    { label: "Tips", icon: "👤", href: "#tips" }
  ];
  return (
    <header className="navbar" aria-label="Main navigation"
      style={{
        width: "100vw",
        position: "sticky",
        bottom: 0, left: 0, right: 0,
        zIndex: 500,
        padding: 0,
        minHeight: 66,
        boxShadow: "0 -4px 30px var(--shadow-softer), 0 0.5px 6px var(--accent)",
        background: "var(--card-bg)",
        borderTopLeftRadius: "var(--border-radius-xl)",
        borderTopRightRadius: "var(--border-radius-xl)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <div
        className="nav-logo"
        style={{
          minWidth: 120,
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginLeft: 0,
        }}
      >
        <MascotLogo size={38} alt="Adopt-a-Pet Mascot Logo" />
        <span style={{
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 900,
          fontSize: "1.19em",
          letterSpacing: "1px",
          color: "var(--blush-pink)",
          textShadow: "0 2px 16px var(--soft-sage)",
          filter: "drop-shadow(0 1.5px 8px var(--cotton-white))",
          marginLeft: 2
        }}>
          Adopt-A-Pet
        </span>
      </div>
      <nav
        className="nav-links"
        aria-label="Sticky bottom navigation"
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: "2vw",
        }}
      >
        {navLinks.map(nav => (
          <a
            key={nav.href}
            className="nav-link"
            href={nav.href}
            tabIndex={0}
            aria-label={nav.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minWidth: 54,
              minHeight: 54,
              padding: "0.22em 0.72em",
              background: "none",
              borderRadius: "24px",
              fontSize: "1.27em",
              color: "var(--text-primary)",
              fontWeight: 700,
              boxShadow: "none",
              border: "none",
              outline: "none",
              transition: "background 0.14s, color 0.16s, box-shadow 0.11s",
            }}
          >
            <span style={{
              fontSize: "1.44em", lineHeight: 1, marginBottom: -2, marginTop: 2,
              filter: "drop-shadow(0 2px 12px var(--accent))"
            }}>{nav.icon}</span>
            <span style={{
              fontSize: "0.83em",
              marginTop: -2,
              fontWeight: 600,
              textShadow: "0 1.5px 6px var(--accent)"
            }}>{nav.label}</span>
          </a>
        ))}
      </nav>
      {/* Floating pill button - big, visible, with animation and prominent CTA color */}
      <button
        className="nav-btn hero-btn bouncy"
        style={{
          border: "3.4px solid var(--favorite)",
          background: "linear-gradient(104deg,var(--favorite),var(--accent) 90%)",
          color: "var(--text-bright)",
          fontSize: "1.24em",
          marginRight: 10,
          marginLeft: 6,
          padding: "0.52em 1.7em",
          borderRadius: "2.3em",
          outlineOffset: "3px",
          boxShadow: "0 4px 26px var(--favorite)",
        }}
        onClick={onCta || (() => {})}
        aria-label="Adopt! (Opens certificate modal)"
        tabIndex={0}
      >
        {/* Lottie/PawBounce placeholder */}
        {/* Trigger paw bounce Lottie here */}
        <span style={{
          fontSize: "1.2em",
          marginRight: 7,
        }}>🐾</span>
        Adopt!
      </button>
    </header>
  );
}
