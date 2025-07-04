import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

/**
 * Draggable, scalable, rotatable pet sticker UI for virtual home trial
 * Upload a room photo, drag/drop pet, decorate with stickers, save/share composite.
 * Modern, soft, visually delightful, with animated cues and paw-cursor.
 */

// SFX
const PET_SFX = "https://cdn.pixabay.com/audio/2022/03/15/audio_118bfa1d93.mp3";
const DROP_SFX = "https://cdn.pixabay.com/audio/2022/11/16/audio_128947aeb4.mp3";
const DECORATE_SFX = "https://cdn.pixabay.com/audio/2022/10/16/audio_13f2fc0dfa.mp3";

// Stickers palette for extra fun
const STICKER_LIST = [
  { icon: "🦴", anim: true },
  { icon: "🧸", anim: false },
  { icon: "🏀", anim: false },
  { icon: "🐾", anim: true },
  { icon: "🦜", anim: false },
  { icon: "💖", anim: true },
  { icon: "✨", anim: true }
];

// Modern paw cursor SVG (soft shadow)
const PAW_CURSOR =
  "data:image/svg+xml;utf8,<svg width='48' height='48' viewBox='0 0 32 32' fill='pink' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='24' r='8' /><circle cx='7' cy='16' r='4' /><circle cx='25' cy='16' r='4' /><circle cx='12' cy='8' r='3' /><circle cx='20' cy='8' r='3' /></svg>";

const defaultStickerStyle = idx => ({
  position: "absolute",
  left: 32 + 54 * idx + (idx % 2 ? 9 : 0),
  bottom: 16 + (idx % 3 ? 7 : 0),
  fontSize: "2.7em",
  zIndex: 9 + idx,
  cursor: "grab",
  textShadow: "0 4px 24px #fff9, 0 1px 2px #aaf",
  filter: "drop-shadow(0 0 11px var(--mint))"
});

// Helper: Play sound (be robust to play failures)
function playSfx(url, volume = 0.5) {
  if (!url) return;
  const audio = new window.Audio(url);
  audio.volume = volume;
  audio.play().catch(() => {});
}

// Helper: Save composite as image using html2canvas
async function saveComposite(divRef, mascotName = "PetRoom") {
  if (!divRef.current) return;
  // Accessibility: Notify user on error
  try {
    const canvas = await html2canvas(divRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    // Download image
    const link = document.createElement("a");
    link.download = mascotName + "_virtual_trial.png";
    link.href = canvas.toDataURL();
    link.click();
  } catch (e) {
    alert("Could not save image. Please try again. (" + e.message + ")");
  }
}

// Helper: Share via Web Share API if supported
async function shareComposite(divRef, mascotName = "PetRoom") {
  if (!navigator.share || !divRef.current) {
    alert("Web Sharing not available on your device/browser. Use Download instead!");
    return;
  }
  try {
    const canvas = await html2canvas(divRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    canvas.toBlob(blob => {
      const file = new window.File([blob], mascotName + "_virtual_trial.png", { type: "image/png" });
      navigator.share({
        title: "My Virtual Home Trial Pet!",
        text: "Check out how a pet would look in my room 🏡🐾",
        files: [file]
      });
    }, "image/png");
  } catch (e) {
    alert("Could not share image: " + e.message);
  }
}

// PUBLIC_INTERFACE
/**
 * VirtualHomeTrial – Overhauled as a modern, animated composite tool:
 * - Upload room photo, drag/drop, resize, rotate pet sticker (with paw-cursor and soft shadow)
 * - Place stickers, visual drag/interaction cues, soft UI
 * - Save (download) or share (native API) composite
 * - All interactions with playful feedback and animation
 */
export default function VirtualHomeTrial({
  open,
  onClose,
  petImg,
  mascotName = "Buddy",
  onTrialComplete
}) {
  const [roomImg, setRoomImg] = useState(null);
  const [dragPet, setDragPet] = useState({ x: 90, y: 35, scale: 1, rotate: 0 });
  const [stickers, setStickers] = useState([]);
  const [draggedStickerIdx, setDraggedStickerIdx] = useState(null);
  const [activeDrag, setActiveDrag] = useState(false);
  const [activePet, setActivePet] = useState(false);
  const [previewAnim, setPreviewAnim] = useState(false);

  // For composite image area to save/share
  const photoStageRef = useRef();

  // Accessibility: Reset on open
  useEffect(() => {
    if (open) {
      setDragPet({ x: 90, y: 35, scale: 1, rotate: 0 });
      setStickers([]);
      setRoomImg(null);
      setDraggedStickerIdx(null);
      setPreviewAnim(false);
      setActiveDrag(false);
      setActivePet(false);
    }
  }, [open]);

  // Drag-and-drop sticker handler
  function handleStickerDrop(idx, d) {
    setStickers(list => [
      ...list,
      {
        icon: STICKER_LIST[idx].icon,
        x: Math.max(12, Math.min(220, d.point.x - 42)),
        y: Math.max(12, Math.min(124, d.point.y - 38))
      }
    ]);
    playSfx(DECORATE_SFX, 0.32);
    setDraggedStickerIdx(null);
  }

  // Drag/transform pet sticker
  function handlePetTransform(_, d) {
    setDragPet(prev => ({ ...prev, x: d.x, y: d.y }));
  }
  function handlePetScale(delta) {
    setDragPet(prev => ({
      ...prev,
      scale: Math.max(0.45, Math.min(2.05, prev.scale + delta))
    }));
    playSfx(PET_SFX, 0.18 + Math.random() * 0.15);
  }
  function handlePetRotate(delta) {
    setDragPet(prev => ({
      ...prev,
      rotate: prev.rotate + delta
    }));
    playSfx(DROP_SFX, 0.19 + Math.random() * 0.14);
  }

  // Preview effect animates pet/stickers
  function handlePreview() {
    setPreviewAnim(true);
    setTimeout(() => setPreviewAnim(false), 1100);
    playSfx(PET_SFX, 0.36);
  }

  // Save/share triggers
  function handleSave() {
    saveComposite(photoStageRef, mascotName);
    playSfx(DROP_SFX, 0.19);
  }
  function handleShare() {
    shareComposite(photoStageRef, mascotName);
    playSfx(PET_SFX, 0.25);
  }

  // Interaction cues – paw shadow (soft) on drag, border highlight
  function renderPetSticker({ x, y, scale, rotate }) {
    return (
      <motion.img
        src={petImg}
        alt="Pet sticker"
        initial={{ x, y, scale: 1, rotate: 0 }}
        animate={{
          x,
          y,
          scale,
          rotate,
          boxShadow: activePet
            ? "0 10px 40px #FFD6E6, 0 0 18px #F67280"
            : previewAnim
            ? "0 4px 40px #FFD36E"
            : "0 2px 12px #71D9F7"
        }}
        whileTap={{ scale: 1.18 }}
        drag
        dragMomentum={false}
        dragElastic={0.22}
        dragConstraints={{ left: 6, top: 3, right: 210, bottom: 105 }}
        onPointerDown={() => {
          setActivePet(true);
          playSfx(PET_SFX, 0.22 + Math.random() * 0.09);
        }}
        onPointerUp={() => setActivePet(false)}
        onDrag={handlePetTransform}
        onDoubleClick={() => handlePetRotate(30)}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 78,
          height: 78,
          borderRadius: "1.5em",
          cursor: `url(${PAW_CURSOR}) 14 14, grab`,
          zIndex: 22,
          transition: "box-shadow 0.24s, filter 0.22s",
          filter:
            activePet || previewAnim
              ? "drop-shadow(0 0 25px var(--accent)) brightness(1.11) saturate(1.08)"
              : "drop-shadow(0 0 11px var(--mint))",
          border: "3.5px solid var(--primary)",
          background: "#fff"
        }}
        tabIndex={0}
        aria-label="Draggable pet sticker. Double-click or use arrows to rotate."
        onKeyDown={e => {
          if (e.key === "ArrowUp") handlePetScale(0.11);
          if (e.key === "ArrowDown") handlePetScale(-0.11);
          if (e.key === "ArrowRight") handlePetRotate(10);
          if (e.key === "ArrowLeft") handlePetRotate(-10);
        }}
      />
    );
  }

  // Sticker placement for drag+shadow
  function renderSticker(s, idx) {
    return (
      <motion.span
        key={s.icon + idx}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: previewAnim ? 1.32 : 1,
          opacity: 1,
          rotate: previewAnim ? [0, 11, -11, 2, 0] : 0
        }}
        style={{
          ...defaultStickerStyle(idx),
          left: s.x,
          bottom: undefined,
          top: s.y,
          fontSize: previewAnim ? "3em" : "2.6em",
          textShadow: "0 6px 22px #ffd36eb8, 0 1px 5px #ddaaff96",
          filter: "drop-shadow(0 0 12px var(--pop-sky))"
        }}
        aria-label="Sticker in scene"
      >
        {s.icon}
      </motion.span>
    );
  }

  // Photo stage with ref for save/share
  const photoStage = (
    <div
      ref={photoStageRef}
      id="virtual-home-trial-stage"
      style={{
        position: "relative",
        margin: "1.2em auto 0.6em auto",
        width: 295,
        height: 185,
        borderRadius: "1em",
        boxShadow: "0 2px 16px var(--pop-sky)",
        overflow: "hidden",
        background: "#fff",
        userSelect: "none",
        cursor: `url(${PAW_CURSOR}) 16 16, auto`
      }}
    >
      <img
        src={roomImg}
        alt="Room preview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "1em",
          border: "2.5px solid var(--accent)",
          zIndex: 1
        }}
        draggable={false}
      />
      {renderPetSticker(dragPet)}
      {stickers.map((s, idx) => renderSticker(s, idx))}
      {/* Drop overlay - playful hint */}
      <AnimatePresence>
        {!stickers.length && activeDrag ? (
          <motion.div
            key="drag-cue"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.83, scale: 1.01 }}
            exit={{ opacity: 0, scale: 0.90 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              background:
                "repeating-linear-gradient(135deg,#ffd6e841 0 8px,transparent 8px 18px)",
              borderRadius: "1em",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.2em",
              fontWeight: 700,
              color: "var(--coral-red)",
              pointerEvents: "none"
            }}
          >
            <span role="img" aria-label="Hint">🖱️</span>&nbsp; Drag stickers here!
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );

  // Accessibility: focus trap for modal
  const closeBtnRef = useRef();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: "fixed",
          zIndex: 2234,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(53, 33, 110, 0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal={true}
        role="dialog"
        aria-label="Virtual home trial modal"
      >
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.88 }}
          style={{
            background:
              "linear-gradient(115deg,var(--warmBeigeBg) 95%, var(--mint) 120%)",
            border: "5px solid var(--primary)",
            borderRadius: "2.1em",
            boxShadow: "0 10px 36px var(--accent), 0 1.5px 11px var(--mint)",
            minWidth: 355,
            minHeight: 510,
            maxWidth: 410,
            maxHeight: "96vh",
            position: "relative",
            padding: "0.9em 1.1em 2em 1.1em"
          }}
        >
          <button
            ref={closeBtnRef}
            className="cert-close-btn"
            style={{
              position: "absolute",
              top: 12,
              right: 13,
              zIndex: 30,
              fontSize: 22,
              background: "var(--secondary)",
              cursor: "pointer"
            }}
            onClick={onClose}
            aria-label="Close Virtual Home Trial"
          >
            ✕
          </button>
          <div
            style={{
              fontWeight: 800,
              color: "var(--primary)",
              fontSize: 24,
              marginBottom: 6,
              letterSpacing: 1
            }}
          >
            🏡 Virtual Home Trial
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              marginBottom: "1em"
            }}
          >
            Upload a room & drag your new buddy (and stickers!) to preview them at home. Resize, rotate, and move as you like!
          </div>
          {!roomImg && (
            <label
              htmlFor="trial-upload"
              className="hero-btn"
              tabIndex={0}
              style={{
                background: "linear-gradient(90deg,var(--pop-sky),var(--petal) 85%)",
                color: "var(--text-bright)",
                cursor: "pointer",
                margin: "1em auto",
                padding: "0.9em 1.3em"
              }}
            >
              Upload a Room Photo
              <input
                id="trial-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={e => {
                  if (e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setRoomImg(url);
                    playSfx(PET_SFX, 0.27);
                  }
                }}
              />
            </label>
          )}

          {/* The composite scene */}
          {roomImg && photoStage}

          {/* Toolbox for manipulation */}
          {roomImg && (
            <div
              style={{
                margin: "0.5em 0 0.2em 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap"
              }}
            >
              <button
                className="heart-btn"
                title="Smaller"
                style={{ background: "var(--mint)" }}
                onClick={() => handlePetScale(-0.14)}
                aria-label="Make pet sticker smaller"
              >
                ➖
              </button>
              <button
                className="heart-btn"
                title="Bigger"
                style={{ background: "var(--primary)" }}
                onClick={() => handlePetScale(0.14)}
                aria-label="Make pet sticker bigger"
              >
                ➕
              </button>
              <button
                className="heart-btn"
                style={{ background: "var(--lavender)" }}
                title="Rotate Left"
                onClick={() => handlePetRotate(-15)}
                aria-label="Rotate pet sticker left"
              >
                ⟲
              </button>
              <button
                className="heart-btn"
                style={{ background: "var(--secondary)" }}
                title="Rotate Right"
                onClick={() => handlePetRotate(15)}
                aria-label="Rotate pet sticker right"
              >
                ⟳
              </button>
              <motion.button
                className="hero-btn"
                title="Preview Animation"
                onClick={handlePreview}
                style={{
                  marginLeft: 5,
                  background: "linear-gradient(92deg,var(--pop-sky),var(--mint) 90%)",
                  color: "var(--text-bright)",
                  fontWeight: 600,
                  fontSize: "1em"
                }}
                whileTap={{ scale: 1.05 }}
                aria-label="Play preview animation"
              >
                Live Preview
              </motion.button>
            </div>
          )}

          {/* Sticker palette */}
          {roomImg && (
            <div
              style={{
                margin: "0.8em 0 1.2em 0",
                display: "flex",
                justifyContent: "center",
                gap: 10,
                minHeight: 50
              }}
            >
              {STICKER_LIST.map((s, i) => (
                <motion.button
                  className={draggedStickerIdx === i ? "hero-btn" : "heart-btn"}
                  key={s.icon}
                  title={`Add ${s.icon}`}
                  drag
                  dragMomentum={false}
                  style={{
                    fontSize: "1.45em",
                    background:
                      draggedStickerIdx === i
                        ? "var(--accent)"
                        : STICKER_LIST[(i + 1) % STICKER_LIST.length].anim
                        ? "var(--mint)"
                        : "var(--lavender)",
                    boxShadow: "0 1.5px 5px var(--primary)",
                    color: "var(--pop-sky)",
                    opacity: draggedStickerIdx === i ? 0.94 : 1,
                    position: "relative",
                    zIndex: (draggedStickerIdx === i ? 99 : 5) + i,
                    cursor: `url(${PAW_CURSOR}) 14 14, grab`
                  }}
                  whileDrag={{
                    scale: 1.29,
                    opacity: 0.7,
                    boxShadow: "0 0 20px var(--accent)"
                  }}
                  onDragStart={() => {
                    setDraggedStickerIdx(i);
                    setActiveDrag(true);
                  }}
                  onDragEnd={(evt, d) => {
                    handleStickerDrop(i, d);
                    setActiveDrag(false);
                  }}
                  aria-label={`Drag ${s.icon} as sticker`}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>
          )}

          {/* Action/save/share buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 10,
              flexWrap: "wrap"
            }}
          >
            <button
              className="hero-btn"
              style={{
                background: "var(--primary)",
                minWidth: 99
              }}
              disabled={!roomImg}
              onClick={onTrialComplete}
              aria-label="Done with virtual home trial"
            >
              All Done!
            </button>
            <button className="nav-btn" style={{ color: "var(--secondary)" }} onClick={onClose}>
              Close
            </button>
            <button
              className="hero-btn"
              style={{
                background: "linear-gradient(96deg,var(--mint),var(--accent) 86%)",
                color: "var(--text-bright)",
                minWidth: 115
              }}
              disabled={!roomImg}
              onClick={handleSave}
              aria-label="Save composite as image (download)"
            >
              Save Image
            </button>
            <button
              className="hero-btn"
              style={{
                background: "linear-gradient(96deg,var(--petal),var(--secondary) 100%)",
                color: "var(--text-bright)",
                minWidth: 128
              }}
              disabled={!roomImg}
              onClick={handleShare}
              aria-label="Share composite image (Web Share API)"
            >
              Share
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
