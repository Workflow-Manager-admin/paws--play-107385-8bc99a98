import React from "react";

// PUBLIC_INTERFACE
export default function FavoriteGrid({ favorites = [] }) {
  // Fallback demo data
  if (!favorites.length) {
    favorites = [
      { name: "Ginger", img: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&w=200" },
      { name: "Fluffy", img: "https://images.pexels.com/photos/1404727/pexels-photo-1404727.jpeg?auto=compress&w=200" },
      { name: "Tiger", img: "https://images.pexels.com/photos/45201/tabby-cat-close-up-cat-tiger-45201.jpeg?auto=compress&w=200" },
    ];
  }
  return (
    <div className="favorites-grid" id="favorites">
      {favorites.map((pet, i) => (
        <div className="fav-card" key={i}>
          <img src={pet.img} className="fav-pet-img" alt={pet.name} />
          <span className="fav-pet-name">{pet.name}</span>
        </div>
      ))}
    </div>
  );
}
