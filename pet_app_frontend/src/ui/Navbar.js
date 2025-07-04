import React from "react";
import MascotLogo from "./MascotLogo";

// PUBLIC_INTERFACE
export default function Navbar({ onCta }) {
  return (
    <header className="navbar" aria-label="Main navigation">
      <div className="nav-logo" style={{ minWidth: 110, display: "flex", alignItems: "center" }}>
        <MascotLogo size={46} alt="Adopt-a-Pet Mascot Logo" />
        <span style={{
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 800,
          fontSize: "1.44em",
          letterSpacing: "1px",
          color: "var(--pop-sky)",
          textShadow: "0 1px 12px var(--accent)",
          filter: "drop-shadow(0 0 8px #fff9)",
        }}>
          Adopt-A-Pet
        </span>
      </div>
      <nav className="nav-links" aria-label="Site sections">
        <a className="nav-link active" href="#home" aria-current="page" tabIndex={0}>Home</a>
        <a className="nav-link" href="#swipe" tabIndex={0}>Swipe</a>
        <a className="nav-link" href="#favorites" tabIndex={0}>Favorites</a>
        <a className="nav-link" href="#tips" tabIndex={0}>Tips</a>
        <button
          className="nav-btn hero-btn bouncy"
          style={{
            border: "2.5px solid var(--mint)",
            background: "linear-gradient(96deg,var(--mint),var(--accent))",
            color: "var(--text-primary)",
            fontSize: "1.15em",
            outlineOffset: "2px",
          }}
          onClick={onCta || (()=>{})}
          aria-label="Start adoption process"
          tabIndex={0}
        >Adopt!</button>
      </nav>
    </header>
  );
}
