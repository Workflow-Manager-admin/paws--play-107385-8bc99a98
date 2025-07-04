import React from "react";
import MascotLogo from "./MascotLogo";

// PUBLIC_INTERFACE
export default function Navbar({ onCta }) {
  return (
    <header className="navbar">
      <div className="nav-logo">
        <MascotLogo size={46} />
        <span style={{
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 800,
          fontSize: "1.44em",
          letterSpacing: "1px",
          color: "var(--primary)"
        }}>
          Adopt-A-Pet
        </span>
      </div>
      <nav className="nav-links">
        <a className="nav-link active" href="#home">Home</a>
        <a className="nav-link" href="#swipe">Swipe</a>
        <a className="nav-link" href="#favorites">Favorites</a>
        <a className="nav-link" href="#tips">Tips</a>
        <button className="nav-btn hero-btn bouncy" onClick={onCta || (()=>{})}>Adopt!</button>
      </nav>
    </header>
  );
}
