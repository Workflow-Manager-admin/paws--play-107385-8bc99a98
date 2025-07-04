import React from "react";

// PUBLIC_INTERFACE
export default function BadgeSection({ badges = [] }) {
  // Fallback demo: 3 stub badges, one earned
  if (!badges.length) {
    badges = [
      { earned: true, label: "First Favorite" },
      { earned: false, label: "Swipe Star" },
      { earned: false, label: "Adopted!" }
    ];
  }
  return (
    <section className="badge-section">
      {badges.map((badge, i) =>
        badge.earned ?
        (<span className="badge-earned" key={i} style={{
          width: 44, height: 44, borderRadius: "50%", background: "var(--accent)", 
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.9em",
          boxShadow: "0 2px 14px var(--primary), 0 0.5px 3px var(--secondary)", color: "var(--pop-sky)"
        }}
        >
          🏆
        </span>)
        : (<span className="badge-placeholder" key={i}></span>)
      )}
    </section>
  );
}
