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
            minHeight: 146,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sky-blue)",
            background: "linear-gradient(94deg, var(--warm-sand) 80%, var(--soft-sage))",
            border: "2.2px dashed var(--soft-sage)",
            fontSize: "1.09em",
            margin: "2.2em auto",
            fontWeight: 700,
            boxShadow: "0 1.2px 7px var(--soft-sage)"
          }}
        >
          <span style={{ fontSize: "2.5em", marginBottom: "0.3em" }}>💖</span>
          <span>No favorites yet!<br />Tap <b style={{color:"var(--coral-red)"}}>💖</b> to add your first favorite.</span>
        </div>
      ) : (
        favorites.map((pet, i) => (
          <div className="fav-card" key={i}>
            <img src={pet.img} className="fav-pet-img" alt={pet.name} />
            <span
              className="fav-pet-name"
              style={{
                color: "var(--deep-cocoa)",
                fontWeight: 700,
                fontSize: "1.08em",
                textShadow: "0 0.5px 9px var(--blush-pink), 0 0 3px var(--cotton-white)"
              }}
            >{pet.name}</span>
          </div>
        ))
      )}
    </div>
  );
}
