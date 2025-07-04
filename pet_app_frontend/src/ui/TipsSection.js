import React from "react";

// PUBLIC_INTERFACE
export default function TipsSection({ tips }) {
  // Some playful demo tips
  const DEMO_TIPS = [
    "Hydrate your new buddy 🥤",
    "Cat-proof every window!",
    "Dog parks = instant zoomies",
    "Photo every silly moment 📸",
    "Slow treat reveal = joy!",
  ];
  tips = tips?.length ? tips : DEMO_TIPS;
  return (
    <section className="tips-section" id="tips">
      {tips.map((msg, i) =>
        <span className="tip-card" key={i}>{msg}</span>
      )}
    </section>
  );
}
