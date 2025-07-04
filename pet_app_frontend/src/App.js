import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ThemeProvider, ThemeContext } from "./ui/ThemeContext";
import Navbar from "./ui/Navbar";
import HeroSection from "./ui/HeroSection";
import SwipeCard from "./ui/SwipeCard";
import FavoriteGrid from "./ui/FavoriteGrid";
import BadgeSection from "./ui/BadgeSection";
import CertModal from "./ui/CertModal";
import TipsSection from "./ui/TipsSection";
import { fetchPetImages } from "./pexelsApi";
import { AnimatePresence, motion } from "framer-motion";

const BREEDS = [
  "Corgi", "Maine Coon", "Shih Tzu", "Ragdoll", "Schnauzer", "Beagle", "Bengal", "French Bulldog", "Siamese", "Cavalier"
];
const MOODS = [
  "sleepy", "zoomies", "playful", "snuggly", "adventurous", "shy", "loving", "grumpy", "gentle", "wily"
];
// Sample silly, cheerful stories for pets
const STORIES = [
  "Loves sunbeams & slippers more than anything.",
  "Dreams of chasing rainbows in the backyard.",
  "Can balance three treats on nose, still waiting for fourth.",
  "Makes everyone laugh with silly tail wags.",
  "Is convinced the vacuum cleaner is a monster.",
  "Thinks park fountains are portals to magical worlds.",
  "Snores so cutely, it makes puppies jealous.",
  "Has a PhD in cuddling and mischief.",
  "Hunt for squeaky toys is their heroic quest!",
  "Wakes up humans for breakfast with gentle nose boops.",
];
const NAMES = [
  "Peppy", "Mochi", "Ginger", "Oreo", "Tiger", "Fluffy", "Bella", "Luna", "Rocky", "Milo", "Poppy", "Daisy", "Finn", "Pumpkin", "Socks"
];

// Generate a random pet profile + story
function generatePetProfile(img, fallbackName) {
  // Use image photographer as easter egg name if available
  let name = NAMES[Math.floor(Math.random()*NAMES.length)];
  let breed = BREEDS[Math.floor(Math.random()*BREEDS.length)];
  let mood = MOODS[Math.floor(Math.random()*MOODS.length)];
  let story = STORIES[Math.floor(Math.random()*STORIES.length)];
  return {
    name: fallbackName || name,
    breed,
    mood,
    story,
    img,
    desc: `A ${mood} ${breed}. ${story}`,
  };
}

// Badges definition
const BADGE_LIST = [
  { key: "first_favorite", label: "First Favorite", icon: "💖" },
  { key: "swipe_star", label: "Swipe Star", icon: "🌟" },
  { key: "adopted", label: "Adopter!", icon: "🏆" },
  { key: "trial", label: "Home Trial", icon: "🏡" },
];

function getDefaultBadges() {
  return BADGE_LIST.map(b => ({ ...b, earned: false }));
}
function updateBadgeStatus(badges, key) {
  return badges.map(b => b.key === key ? { ...b, earned: true } : b);
}

// Virtual home trial assets
const STICKERS = [
  "🐾", "🧸", "🦴", "🏀", "🛏️", "🦜"
];

// PUBLIC_INTERFACE
function App() {
  // Main state
  const [petCards, setPetCards] = useState([]);        // stack of pet profiles
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [badges, setBadges] = useState(() =>
    JSON.parse(localStorage.getItem("badges") || JSON.stringify(getDefaultBadges()))
  );
  const [certModal, setCertModal] = useState(false);
  const [adoptedPet, setAdoptedPet] = useState(null);
  const [showTrial, setShowTrial] = useState(false);
  const [trialImg, setTrialImg] = useState(null);
  const [trialSticker, setTrialSticker] = useState(null);

  // For animating card stack directions
  const [swipeDir, setSwipeDir] = useState(null);

  // Load pets on mount
  useEffect(() => {
    setLoading(true);
    fetchPetImages("cute puppy OR kitten", 12, 1)
      .then(({ photos }) => {
        const newStack = photos.slice(0, 12).map((photo, i) =>
          generatePetProfile(photo.src.medium, NAMES[i % NAMES.length])
        );
        setPetCards(newStack);
        setLoading(false);
      })
      .catch(() => {
        // fallback demo pets hardcoded
        setPetCards([
          generatePetProfile("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400"),
          generatePetProfile("https://images.pexels.com/photos/1404727/pexels-photo-1404727.jpeg?auto=compress&w=400"),
          generatePetProfile("https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&w=400")
        ]);
        setLoading(false);
      });
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("badges", JSON.stringify(badges));
  }, [badges]);

  // Handle swipes: left (skip), right (favorite)
  const handleSwipe = dir => {
    setSwipeDir(dir);
    setTimeout(() => setSwipeDir(null), 340);
    if (!petCards.length) return;
    if (dir === "right") {
      // favorite
      setFavorites(list => {
        if (!list.some(f => f.img === petCards[0].img)) {
          // Earn badge
          if (!badges.find(b => b.key === "first_favorite" && b.earned)) {
            setBadges(bs => updateBadgeStatus(bs, "first_favorite"));
          }
          if (list.length + 1 >= 7 && !badges.find(b => b.key === "swipe_star" && b.earned)) {
            setBadges(bs => updateBadgeStatus(bs, "swipe_star"));
          }
          return [
            ...list,
            { name: petCards[0].name, img: petCards[0].img }
          ];
        }
        return list;
      });
    }
    // Remove top card
    setPetCards(cards => cards.slice(1));
  };

  // Adopt pet modal
  const handleAdopt = () => {
    // Earn adoption badge
    if (!badges.find(b => b.key === "adopted" && b.earned)) {
      setBadges(bs => updateBadgeStatus(bs, "adopted"));
    }
    setAdoptedPet(petCards[0]);
    setCertModal(true);
  };

  // Virtual home trial
  const handleTrialClick = () => setShowTrial(true);
  const handleTrialSticker = s => setTrialSticker(s);
  const handleTrialSubmit = () => {
    // Earn badge for trial
    if (!badges.find(b => b.key === "trial" && b.earned)) {
      setBadges(bs => updateBadgeStatus(bs, "trial"));
    }
    setShowTrial(false);
    setTrialImg(null);
    setTrialSticker(null);
  };

  // Responsive: card area ref for scroll
  const swipeSectionRef = useRef();

  // Animations & modal transitions
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className="App" style={{
            overflowX: "hidden",
            minHeight: "100vh",
            background: "var(--app-bg)"
          }}>
            <Navbar onCta={() => setCertModal(true)} />
            {/* Floating playful theme button */}
            <motion.button
              className="theme-toggle bouncy"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.23 }}
              style={{
                position: "fixed",
                top: 20, right: 20,
                zIndex: 200,
              }}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </motion.button>
            <main style={{
              maxWidth: 700,
              margin: "0 auto",
              paddingBottom: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <HeroSection onAdopt={() => swipeSectionRef?.current?.scrollIntoView({behavior: 'smooth', block: 'center'})} />

              {/* Swipeable Cards */}
              <section className="swipe-section" id="swipe" ref={swipeSectionRef} style={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: 450}}>
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: [1, 1.10, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
                    style={{
                      background: "var(--accent)",
                      padding: "2em 3em",
                      borderRadius: "2em",
                      boxShadow: "0 4px 30px var(--mint)",
                      fontWeight: 700,
                      fontSize: "1.32em",
                      marginTop: "2.1em"
                    }}
                  >Fetching adorable pets...</motion.div>
                ) : petCards.length ? (
                  <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 355,
                    minHeight: 360,
                    display: "flex",
                    justifyContent: "center",
                  }}>
                    {/* Stack effect: only top 2; animate swipe */}
                    {petCards.slice(0,2).map((pet,i) => (
                      <AnimatePresence key={pet.img}>
                        <motion.div
                          key={pet.img}
                          initial={{ x: 0, scale: 1-i*0.04 }}
                          animate={
                            i===0 && swipeDir
                              ? { x: swipeDir === "left" ? -360 : 360, opacity: 0 }
                              : { x: 0, scale: 1-i*0.04, opacity: i===0?1:0.9 }
                          }
                          exit={{ x: 0, opacity: 0 }}
                          transition={{ duration: 0.38, type: "spring", stiffness: 122 }}
                          style={{
                            position: i === 0 ? "relative" : "absolute",
                            zIndex: 10 - i,
                            width: "100%",
                            left: 0,
                            top: 0,
                          }}
                        >
                          <SwipeCard
                            pet={pet}
                            onFav={() => handleSwipe("right")}
                            onAdopt={handleAdopt}
                          />
                          {/* Swipe left/right buttons mobile */}
                          {i === 0 &&
                          <div style={{
                            display: "flex", justifyContent: "center",
                            margin: "0.65em 0",
                          }}>
                            <motion.button
                              className="heart-btn"
                              title="Skip"
                              whileTap={{ scale: 1.19 }}
                              style={{ background: "var(--secondary)", color: "var(--primary)", marginRight: 30 }}
                              onClick={() => handleSwipe("left")}
                            >⏪</motion.button>
                            <motion.button
                              className="heart-btn"
                              title="Fav"
                              whileTap={{ scale: 1.19 }}
                              style={{ background: "var(--mint)", color: "var(--petal)" }}
                              onClick={() => handleSwipe("right")}
                            >💖</motion.button>
                            <motion.button
                              className="hero-btn"
                              style={{ marginLeft: 30, background: "var(--primary)", color: "var(--text-bright)" }}
                              whileHover={{ scale: 1.09 }}
                              onClick={handleAdopt}
                            >Adopt!</motion.button>
                          </div>
                          }
                        </motion.div>
                      </AnimatePresence>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 29 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      margin: "2.1em", padding: "1.5em",
                      background: "linear-gradient(90deg,var(--mint),var(--lavender))",
                      borderRadius: "2.1em", boxShadow: "0 6px 30px var(--primary)",
                      fontWeight: 700
                    }}>
                    No more pets! <span role="img" aria-label="paw">🐾</span><button className="hero-btn" style={{marginLeft:7, background: "var(--pop-sky)", color:"var(--text-bright)"}} onClick={()=>window.location.reload()}>Reload</button>
                  </motion.div>
                )}
              </section>

              {/* Virtual Home Trial Feature */}
              <AnimatePresence>
                {showTrial && (
                  <motion.div
                    style={{
                      position: "fixed", zIndex: 1233,
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: "rgba(50,33,85,0.17)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="cert-modal"
                      initial={{ scale: 0.93 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      style={{
                        maxWidth: 380,
                        border: "3.5px solid var(--lavender)",
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "var(--accent)", marginBottom: 9, fontSize: 23 }}>
                        🏡 Virtual Home Trial!
                      </div>
                      <div style={{ fontSize: 15, color: "var(--text-secondary)" }}>Try your new buddy in your "virtual home" - upload a room pic, place them (and a sticker) in your life!</div>
                      <label htmlFor="trial-photo" style={{
                        background: "var(--mint)",
                        padding: "0.6em 0.9em",
                        borderRadius: "1em",
                        cursor: "pointer",
                        fontWeight: 600, margin: "1em 0 1em 0", display: "inline-block"
                      }}>
                        Upload a photo {trialImg ? "✔️" : ""}
                      </label>
                      <input
                        id="trial-photo"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={e => {
                          if(e.target.files[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            setTrialImg(url);
                          } else {
                            setTrialImg(null);
                          }
                        }}
                      />
                      {trialImg && (
                        <div style={{ position: "relative", margin: "1em auto", width: "93%", maxWidth: 295, minHeight: 175 }}>
                          <img
                            src={trialImg}
                            alt="Your room"
                            style={{
                              width: "100%",
                              borderRadius: "1em",
                              boxShadow: "0 2px 12px var(--primary)",
                              objectFit: "cover",
                              maxHeight: 190,
                            }}
                          />
                          {adoptedPet && (
                            <img
                              src={adoptedPet.img}
                              alt={adoptedPet.name}
                              style={{
                                width: 84,
                                position: "absolute",
                                left: "56%",
                                top: "59%",
                                borderRadius: "1.1em",
                                transform: "translate(-50%,-41%) rotate(-7deg)",
                                boxShadow: "0 6px 13px var(--mint)",
                                zIndex: 13
                              }}
                            />
                          )}
                          {trialSticker && (
                            <span style={{
                              position: "absolute",
                              right: 23,
                              bottom: 18,
                              fontSize: "2.6em"
                            }}>{trialSticker}</span>
                          )}
                        </div>
                      )}
                      <div style={{margin:"1.2em 0 0.2em 0"}}>Pick a sticker:</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        {STICKERS.map(s => (
                          <motion.button
                            className="heart-btn"
                            key={s}
                            onClick={()=>handleTrialSticker(s)}
                            style={{
                              background: trialSticker===s ? "var(--accent)" : "var(--secondary)",
                              border:trialSticker===s?"2px solid var(--mint)":"none",
                              fontSize:"1.32em"
                            }}
                            whileTap={{scale:1.17}}
                          >{s}</motion.button>
                        ))}
                      </div>
                      <div style={{ marginTop:16 }}>
                        <button className="hero-btn" style={{
                          marginRight: 9, background: "var(--primary)"
                        }} disabled={!trialImg} onClick={handleTrialSubmit}>Try in your home!</button>
                        <button className="nav-btn" style={{ marginLeft:4, color:"var(--secondary)"}} onClick={()=>setShowTrial(false)}>Close</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <>
                <motion.button
                  className="hero-btn bouncy"
                  onClick={handleTrialClick}
                  style={{
                    position: "fixed", left: 12, bottom: 25, zIndex: 99,
                    border: "1.5px solid var(--mint)", background:"linear-gradient(96deg,var(--mint),var(--lavender))",
                    color:"var(--text-primary)", fontWeight:600, fontSize:"1.1em", boxShadow: "0 4px 30px var(--mint)"
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  🏡 Virtual Home Trial
                </motion.button>
              </>

              {/* Favorites grid */}
              <FavoriteGrid favorites={favorites} />

              {/* Badges gamification */}
              <BadgeSection badges={badges} />

              {/* Certificate modal for adoption */}
              <AnimatePresence>
                {certModal && adoptedPet && (
                  <CertModal open={certModal} onClose={() => setCertModal(false)} petName={adoptedPet.name || "Pet"} />
                )}
              </AnimatePresence>

              {/* Tips carousel */}
              <TipsSection />

            </main>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
