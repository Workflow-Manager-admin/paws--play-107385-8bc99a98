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
        <span
          className="tip-card"
          key={i}
          style={{
            background: [
              "linear-gradient(90deg, var(--mint), var(--accent) 70%)",
              "linear-gradient(90deg, var(--secondary), var(--primary) 80%)",
              "linear-gradient(90deg, var(--lavender), var(--petal) 90%)",
              "linear-gradient(94deg, var(--accent), var(--pop-sky) 100%)",
              "linear-gradient(101deg, var(--petal), var(--mint) 99%)"
            ][i % 5],
            color: "var(--text-primary)",
            fontWeight: 600,
            boxShadow: "0 2px 10px var(--primary), 0 0.5px 3px var(--accent)"
          }}
        >{msg}</span>
      )}
    </section>
  );
}
