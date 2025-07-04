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
import VirtualHomeTrial from "./ui/VirtualHomeTrial";
import OnboardingOverlay from "./ui/OnboardingOverlay";
// --- Lively SFX ---
const SWIPE_RIGHT_SFX = "https://cdn.pixabay.com/audio/2022/03/15/audio_118bfa1d93.mp3";
const SWIPE_LEFT_SFX = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4fe0.mp3";
const BADGE_SFX = "https://cdn.pixabay.com/audio/2022/10/16/audio_13f2fc0dfa.mp3";
const ADOPT_SFX = "https://cdn.pixabay.com/audio/2023/08/04/audio_147fca777c.mp3";
const PAWPRINT_IMG = "data:image/svg+xml;utf8,<svg viewBox='0 0 32 32' fill='pink' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='24' r='8'/><circle cx='7' cy='16' r='4'/><circle cx='25' cy='16' r='4'/><circle cx='12' cy='8' r='3'/><circle cx='20' cy='8' r='3'/></svg>";


/**
 * Vibrant, playful, and believable mock pet data
 * Ensure enough variety for stacking cards, and fields match cheerful playful mood.
 */
// Expanded with extra cuteness and international flavor
const BREEDS = [
  "Corgi", "Maine Coon", "Shih Tzu", "Ragdoll", "Schnauzer", "Beagle", "Bengal", "French Bulldog", "Siamese", "Cavalier",
  "Dachshund", "Golden Retriever", "Chihuahua", "Persian", "Husky", "Poodle", "Tabby", "Sphynx", "Samoyed", "Cockapoo"
];
const MOODS = [
  "zoomies", "snuggly", "majestic", "playful", "adventurous", "shy", "loving", "grumpy", "gentle", "wily",
  "curious", "bouncy", "cuddly", "mischievous", "clumsy", "wise", "brave"
];
// Extra playful, unique mini-stories
const STORIES = [
  "Loves sunbeams and slippers, believes squeaky toys are magic.",
  "Dreams of chasing rainbows in grandma's backyard.",
  "Can balance three treats on nose—still waiting for a fourth.",
  "Master of sock heists and stealthy kitchen raids.",
  "Once barked at a mailman... then invited him for snuggles.",
  "Is sure the vacuum cleaner is a portal to another dimension.",
  "Thinks park puddles are secret swimming holes.",
  "Snores so cutely, it's famous on the block.",
  "Has a PhD in cuddling and stealing warm laundry.",
  "Sees every butterfly as a new best friend.",
  "Collects shiny leaves and barks at clouds.",
  "Has a heroic quest: find the biggest stick in the park!",
  "Wakes up humans for breakfast with gentle boops.",
  "Is determined to catch their own tail (someday!).",
  "Was voted 'Best Smile' at puppy school graduation.",
  "Likes to nap in sunbeams and chase dreams at night.",
];
const NAMES = [
  "Peppy", "Mochi", "Ginger", "Oreo", "Tiger", "Fluffy", "Bella", "Luna", "Rocky", "Milo",
  "Poppy", "Daisy", "Finn", "Pumpkin", "Socks", "Mimi", "Biscuit", "Sunny", "Shadow", "Kiki", "Moose", "Hazel", "Ziggy"
];

/**
 * Generate a random pet profile for a card. Each card gets a believable/cute set of details.
 * @param {string} img - Pet image link, ideally from Pexels
 * @param {string} [fallbackName] - Optionally force a name if one fits the image
 * @param {Object} [photoObj] - Pass raw Pexels photo object for deeper profile spice (like photographer)
 * @returns {{name:string, breed:string, mood:string, story:string, img:string, desc:string}}
 */
// PUBLIC_INTERFACE
function generatePetProfile(img, fallbackName, photoObj=null) {
  // Add playful "Easter eggs" with photographer
  let name = fallbackName || NAMES[Math.floor(Math.random()*NAMES.length)];
  if (photoObj && typeof photoObj.photographer === "string" && Math.random() > 0.72) {
    // Sometimes playful: use photographer as "My nickname is..." or "photographer's pet"
    name = photoObj.photographer.split(" ")[0] || name;
  }
  let breed = BREEDS[Math.floor(Math.random()*BREEDS.length)];
  let mood = MOODS[Math.floor(Math.random()*MOODS.length)];
  let story = STORIES[Math.floor(Math.random()*STORIES.length)];
  return {
    name,
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

  // Undo stack and effect pawprint
  const [undoStack, setUndoStack] = useState([]);
  const [undoMsg, setUndoMsg] = useState("");
  const [showUndo, setShowUndo] = useState(false);
  const [pawprint, setPawprint] = useState({ x: null, y: null, show: false });

  // Play sound
  const playSound = (url, volume = 0.40) => {
    if (!url) return;
    const audio = new window.Audio(url);
    audio.volume = volume;
    audio.play().catch(()=>{});
  };

  // Load pets on mount
  useEffect(() => {
    setLoading(true);
    fetchPetImages("cute puppy OR kitten", 15, 1)
      .then(({ photos }) => {
        // Always map from ALL photo info: spice up profile with details if possible
        let shuffled = photos.slice(0, 15).sort(() => 0.5 - Math.random());
        const newStack = shuffled.map((photo, idx) =>
          generatePetProfile(
            photo.src.medium || photo.src.portrait || photo.src.landscape || photo.src.original,
            NAMES[idx % NAMES.length],
            photo
          )
        );
        setPetCards(newStack);
        setLoading(false);
      })
      .catch(() => {
        // fallback demo pets hardcoded, still using full playful variety
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

  // Animate pawprint when favoriting/adopting
  const showPawprint = (e) => {
    let x = (e && e.clientX) || (window.innerWidth / 2), y = (e && e.clientY) || 300;
    setPawprint({ x, y, show: true });
    setTimeout(() => setPawprint({ x: null, y: null, show: false }), 620);
  };

  // Handle swipes: left (skip), right (favorite)
  const handleSwipe = (dir, evt = null) => {
    if (!petCards.length) return;
    setSwipeDir(dir);
    setTimeout(() => setSwipeDir(null), 340);

    // Track undoable action
    const topCard = petCards[0];
    let localUndo = { pet: topCard, type: dir === "right" ? "fav" : "skip" };
    setUndoStack(stack => stack.length > 8 ? [localUndo] : [localUndo,...stack]);
    setShowUndo(true);
    setUndoMsg((dir === "right" ? "Favorited!" : "Skipped") + ` ${topCard?.name}`);

    // Sound & feedback
    if (dir === "right") {
      playSound(SWIPE_RIGHT_SFX, 0.25 + Math.random()*0.18);
      showPawprint(evt);
    } else {
      playSound(SWIPE_LEFT_SFX, 0.23);
    }

    // Gamification for favoriting
    if (dir === "right") {
      setFavorites(list => {
        if (!list.some(f => f.img === topCard.img)) {
          // Earn badge
          if (!badges.find(b => b.key === "first_favorite" && b.earned)) {
            setBadges(bs => { playSound(BADGE_SFX,0.20); return updateBadgeStatus(bs, "first_favorite"); });
          }
          if (list.length + 1 >= 7 && !badges.find(b => b.key === "swipe_star" && b.earned)) {
            setBadges(bs => { playSound(BADGE_SFX,0.20); return updateBadgeStatus(bs, "swipe_star"); });
          }
          return [
            ...list,
            { name: topCard.name, img: topCard.img }
          ];
        }
        return list;
      });
    }
    // Remove top card from deck
    setTimeout(() => {
      setPetCards(cards => cards.slice(1));
    }, 66);
  };

  // UNDO feature for favorites/skipped
  const handleUndo = () => {
    if (!undoStack.length) return;
    const last = undoStack[0];
    // Undo favorite: remove from favorites if exists and re-add to petCards
    if (last.type === "fav") {
      setFavorites(favs => favs.filter(f => f.img !== last.pet.img));
      setPetCards(cards => [last.pet, ...cards]);
      setUndoMsg("Undo: removed from favorites");
      playSound(SWIPE_LEFT_SFX,0.23);
    } else {
      // Undo skip: readd to petCards
      setPetCards(cards => [last.pet, ...cards]);
      setUndoMsg("Undo: returned card");
    }
    setUndoStack(stack => stack.slice(1));
    setShowUndo(false);
  };

  // Adopt pet modal with feedback and badge
  const handleAdopt = (evt) => {
    const currentPet = petCards[0];
    // Earn adoption badge
    if (!badges.find(b => b.key === "adopted" && b.earned)) {
      playSound(ADOPT_SFX, 0.34);
      setBadges(bs => { playSound(BADGE_SFX,0.24); return updateBadgeStatus(bs, "adopted"); });
    }
    setAdoptedPet(currentPet);
    setCertModal(true);
    showPawprint(evt);
    // Remove pet from deck after short delay (if present)
    setTimeout(() => setPetCards(cards => cards.slice(1)), 220);
  };

  // Virtual home trial gamifies with badge
  const handleTrialClick = () => setShowTrial(true);
  const handleTrialSticker = s => setTrialSticker(s);
  const handleTrialSubmit = () => {
    if (!badges.find(b => b.key === "trial" && b.earned)) {
      setBadges(bs => { playSound(BADGE_SFX,0.18); return updateBadgeStatus(bs, "trial"); });
    }
    setShowTrial(false);
    setTrialImg(null);
    setTrialSticker(null);
  };

  // Responsive: card area ref for scroll
  const swipeSectionRef = useRef();

  // Animated pawprint feedback node
  const PawprintFX = () => (
    pawprint.show ?
      <img
        src={PAWPRINT_IMG}
        alt=""
        style={{
          position: "fixed",
          left: pawprint.x - 23,
          top: pawprint.y - 25,
          width: 46,
          height: 46,
          pointerEvents: "none",
          transition: "all 0.23s cubic-bezier(.5,.62,.32,.7)",
          animation: "bounce 0.55s, pawpop 0.6s",
          zIndex: 90,
          filter: "drop-shadow(0 0 16px var(--primary))"
        }}
      /> : null
  );

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
                top: 21, right: 22,
                zIndex: 300,
                background: "var(--card-bg)",
                boxShadow: "0 2.5px 9px var(--mint)",
                borderRadius: "1.9em",
                border: "2.5px solid var(--accent)",
                fontSize: "1.08em",
                fontWeight: 600,
                color: "var(--primary)",
                outline: "none",
                padding: ".32em 1.28em"
              }}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </motion.button>
            {/* Onboarding overlay shown one time per user */}
            <OnboardingOverlay />

            <main style={{
              maxWidth: 700,
              margin: "0 auto",
              paddingBottom: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <HeroSection onAdopt={() => swipeSectionRef?.current?.scrollIntoView({behavior: 'smooth', block: 'center'})} />

              {/* Undo/feedback animated bar */}
              <div
                style={{
                  minHeight: 44,
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <AnimatePresence>
                  {showUndo && undoMsg ? (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.77 }}
                      style={{
                        background: "var(--mint)",
                        borderRadius: "1.2em",
                        color: "var(--primary)",
                        fontWeight: 700,
                        fontSize: "1em",
                        boxShadow: "0 4px 22px var(--primary)",
                        margin: "7px 0.8em",
                        padding: "0.38em 1.22em 0.38em 1.05em",
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                        zIndex: 9
                      }}
                      tabIndex={0}
                    >
                      <span style={{ fontSize: "1.23em", marginRight: 6 }}>🐾</span>
                      {undoMsg}
                      <motion.button
                        className="hero-btn"
                        style={{
                          background: "var(--primary)",
                          color: "var(--text-bright)",
                          fontSize: "0.95em",
                          marginLeft: 12,
                          padding: "0.25em 1.08em"
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleUndo}
                        tabIndex={0}
                      >
                        Undo
                      </motion.button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              {/* Swipeable Cards: THUMB ZONE and Responsive Placement */}
              <section className="swipe-section" id="swipe" ref={swipeSectionRef} style={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: 450, position:"relative"}}>
                <PawprintFX />
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
                            onFav={e => handleSwipe("right",e)}
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
                              onClick={e => handleSwipe("left",e)}
                            >⏪</motion.button>
                            <motion.button
                              className="heart-btn"
                              title="Fav"
                              whileTap={{ scale: 1.19 }}
                              style={{ background: "var(--mint)", color: "var(--petal)" }}
                              onClick={e => handleSwipe("right",e)}
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
              <VirtualHomeTrial
                open={showTrial}
                onClose={() => setShowTrial(false)}
                petImg={adoptedPet?.img || petCards[0]?.img || "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400"}
                mascotName={adoptedPet?.name || petCards[0]?.name}
                onTrialComplete={handleTrialSubmit}
              />

              <>
                {/* Floating main CTA always thumb-accessible on mobile */}
                <motion.button
                  className="hero-btn bouncy floating-main"
                  onClick={handleTrialClick}
                  style={{
                    border: "1.5px solid var(--mint)",
                    background: "linear-gradient(96deg,var(--mint),var(--lavender))",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "1.1em",
                    boxShadow: "0 4px 30px var(--mint)",
                    zIndex: 499,
                  }}
                  whileHover={{ scale: 1.08 }}
                  tabIndex={0}
                  aria-label="Try the virtual home trial"
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
