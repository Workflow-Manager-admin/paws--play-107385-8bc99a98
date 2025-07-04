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
          width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", 
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6em",
          boxShadow: "0 2px 8px rgba(255,182,182,0.17)", color: "#fff" }}
        >
          🏆
        </span>)
        : (<span className="badge-placeholder" key={i}></span>)
      )}
    </section>
  );
}
