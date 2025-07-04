import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, ThemeContext } from "./ui/ThemeContext";
import Navbar from "./ui/Navbar";
import HeroSection from "./ui/HeroSection";
import SwipeCard from "./ui/SwipeCard";
import FavoriteGrid from "./ui/FavoriteGrid";
import BadgeSection from "./ui/BadgeSection";
import CertModal from "./ui/CertModal";
import TipsSection from "./ui/TipsSection";
import { AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
function App() {
  // Demo modal adoption/certificate
  const [certModal, setCertModal] = useState(false);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className="App">
            <Navbar onCta={() => setCertModal(true)} />
            {/* Playful theme toggle floating button */}
            <button
              className="theme-toggle bouncy"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{
                position: "fixed",
                top: 20, right: 20,
                zIndex: 100,
              }}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <main style={{
              maxWidth: 650, margin: "0 auto", paddingBottom: 80,
              display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <HeroSection onAdopt={() => window.scrollTo({top: 340, behavior: 'smooth'})} />
              <section className="swipe-section" id="swipe">
                <SwipeCard />
              </section>
              <FavoriteGrid />
              <BadgeSection />
              {/* Animated modal */}
              <AnimatePresence>
                {certModal && (
                  <CertModal open={certModal} onClose={() => setCertModal(false)}/>
                )}
              </AnimatePresence>
              <TipsSection />
            </main>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
