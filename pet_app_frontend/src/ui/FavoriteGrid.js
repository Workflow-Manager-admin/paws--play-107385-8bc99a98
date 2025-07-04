import React from "react";

/**
 * FavoriteGrid displays favorited pets; empty state for no favorites.
 */
export default function FavoriteGrid({ favorites = [] }) {
  // No favorites UX improvement
  const hasFavs = favorites && favorites.length > 0;

  return (
    <div className="favorites-grid" id="favorites">
      {!hasFavs ? (
        <div
          className="fav-card"
          style={{
            minHeight: 142,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-secondary)",
            background: "linear-gradient(94deg, var(--warmBeigeBg) 80%, var(--mint))",
            border: "2.2px dashed var(--mint)",
            fontSize: "1.09em",
            margin: "2.2em auto",
            boxShadow: "none"
          }}
        >
          <span style={{ fontSize: "2.3em", marginBottom: "0.3em" }}>💖</span>
          <span>No favorites yet!<br />Tap <b>💖</b> to add your first favorite.</span>
        </div>
      ) : (
        favorites.map((pet, i) => (
          <div className="fav-card" key={i}>
            <img src={pet.img} className="fav-pet-img" alt={pet.name} />
            <span
              className="fav-pet-name"
              style={{
                color: "var(--pop-sky)",
                fontWeight: 700,
                textShadow: "0 0.5px 7px var(--accent), 0 0 3px white"
              }}
            >{pet.name}</span>
          </div>
        ))
      )}
    </div>
  );
}
