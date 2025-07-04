import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
/**
 * Draggable/scalable/rotatable pet sticker UI for virtual home trial
 * Users upload a room image, drag/scale/rotate the pet, add stickers, and preview the result
 */

const PET_SFX = "https://cdn.pixabay.com/audio/2022/03/15/audio_118bfa1d93.mp3";
const DROP_SFX = "https://cdn.pixabay.com/audio/2022/11/16/audio_128947aeb4.mp3";
const DECORATE_SFX = "https://cdn.pixabay.com/audio/2022/10/16/audio_13f2fc0dfa.mp3";

const STICKER_LIST = [
  { icon: "🦴", anim: true },
  { icon: "🧸", anim: false },
  { icon: "🏀", anim: false },
  { icon: "🐾", anim: true },
  { icon: "🦜", anim: false },
  { icon: "💖", anim: true },
  { icon: "✨", anim: true },
];

const defaultStickerStyle = idx => ({
  position: "absolute",
  left: 32 + 54*idx + (idx%2 ? 9 : 0),
  bottom: 16 + (idx%3 ? 7 : 0),
  fontSize: "2.7em",
  zIndex: 9+idx,
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

// PUBLIC_INTERFACE
export default function VirtualHomeTrial({
  open,
  onClose,
  petImg,      // pet image url
  mascotName = "Buddy",
  onTrialComplete,
}) {
  const [roomImg, setRoomImg] = useState(null);
  const [dragPet, setDragPet] = useState({ x: 90, y: 35, scale: 1, rotate: 0 });
  const [stickers, setStickers] = useState([]);
  const [draggedStickerIdx, setDraggedStickerIdx] = useState(null);
  const [previewAnim, setPreviewAnim] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      setDragPet({ x: 90, y: 35, scale: 1, rotate: 0 });
      setStickers([]);
      setRoomImg(null);
      setDraggedStickerIdx(null);
      setPreviewAnim(false);
    }
  }, [open]);

  // Drag-and-drop handler for stickers
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

  // Drag/zoom/rotate pet sticker
  function handlePetTransform(e, d) {
    setDragPet(prev => ({ ...prev, x: d.x, y: d.y }));
  }
  function handlePetScale(delta) {
    setDragPet(prev => ({
      ...prev,
      scale: Math.max(0.45, Math.min(2.05, prev.scale + delta))
    }));
    playSfx(PET_SFX, 0.18 + Math.random()*0.15);
  }
  function handlePetRotate(delta) {
    setDragPet(prev => ({
      ...prev,
      rotate: prev.rotate + delta
    }));
    playSfx(DROP_SFX, 0.19 + Math.random()*0.14);
  }

  // Preview effect = animate everything
  function handlePreview() {
    setPreviewAnim(true);
    setTimeout(() => setPreviewAnim(false), 1100);
    playSfx(PET_SFX, 0.36);
  }

  // Finish - notify parent
  function handleComplete() {
    if (onTrialComplete) onTrialComplete();
  }

  // Accessibility: Reset focus trap
  const closeBtnRef = useRef();

  if (!open) return null;
  return (
    <AnimatePresence>
    <motion.div
      style={{
        position: "fixed", zIndex: 2234, top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(53, 33, 110, 0.16)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      aria-modal={true} role="dialog" aria-label="Virtual home trial modal"
    >
      <motion.div
        initial={{ scale: 0.97 }} animate={{ scale: 1 }} exit={{ scale: 0.88 }}
        style={{
          background: "linear-gradient(115deg,var(--warmBeigeBg) 95%, var(--mint) 120%)",
          border: "5px solid var(--primary)",
          borderRadius: "2.1em",
          boxShadow: "0 10px 36px var(--accent), 0 1.5px 11px var(--mint)",
          minWidth: 355,
          minHeight: 480,
          maxWidth: 400,
          maxHeight: 99,
          position: "relative",
          padding: "0.9em 1.1em 1.7em 1.1em"
        }}
      >
        <button
          ref={closeBtnRef}
          className="cert-close-btn"
          style={{ position: "absolute", top: 12, right: 13, zIndex: 30, fontSize: 22, background: "var(--secondary)" }}
          onClick={onClose}
        >✕</button>
        <div style={{
          fontWeight: 800, color: "var(--primary)", fontSize: 24, marginBottom: 6, letterSpacing: 1
        }}>🏡 Virtual Home Trial
        </div>
        <div style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: "1em" }}>
          Upload a room & drag your new buddy (and stickers!) to preview them at home.
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
            }}>
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
        {roomImg && (
          <div style={{ position: "relative", margin: "1.2em auto 0.6em auto", width: 295, height: 185, borderRadius: "1em", boxShadow: "0 2px 16px var(--pop-sky)", overflow: "hidden", background: "#fff" }}>
            <img
              src={roomImg}
              alt="Room preview"
              style={{
                width: "100%", height: "100%", objectFit: "cover", borderRadius: "1em", border: "2.5px solid var(--accent)"
              }}
            />
            {/* Pet image - draggable/scalable */}
            <motion.img
              src={petImg}
              alt="Pet sticker"
              initial={{ x: dragPet.x, y: dragPet.y, scale: 1, rotate: 0 }}
              animate={{
                x: dragPet.x,
                y: dragPet.y,
                scale: dragPet.scale,
                rotate: dragPet.rotate,
                boxShadow: previewAnim ? "0 4px 40px #FFD36E" : "0 2px 12px #71D9F7"
              }}
              whileTap={{ scale: 1.18 }}
              drag
              dragMomentum={false}
              dragElastic={0.22}
              dragConstraints={{ left: 6, top: 3, right: 210, bottom: 105 }}
              style={{
                position: "absolute",
                left: 0, top: 0, width: 78, height: 78, borderRadius: "1.5em", cursor: "grab", zIndex: 22,
                filter: "drop-shadow(0 0 11px var(--mint))",
                border: "2.5px solid var(--primary)",
                background: "#fff"
              }}
              onDrag={handlePetTransform}
              alt="pet sticker"
              onPointerUp={() => playSfx(PET_SFX, 0.23 + Math.random()*0.13)}
            />
            {/* Stickers placed in user image */}
            {stickers.map((s, idx) =>
              <motion.span
                key={s.icon + idx}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: previewAnim ? 1.3 : 1, opacity: 1, rotate: previewAnim ? [0, 11, -11, 2, 0] : 0 }}
                style={{
                  ...defaultStickerStyle(idx),
                  left: s.x,
                  bottom: undefined,
                  top: s.y,
                  fontSize: previewAnim ? "3em" : "2.6em"
                }}
              >{s.icon}</motion.span>
            )}
          </div>
        )}
        {/* Transform pet: scale/rotate, add stickers */}
        {roomImg && (
          <div style={{ margin: "0.4em 0 0.1em 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, flexWrap: "wrap" }}>
            <button
              className="heart-btn"
              title="Smaller"
              style={{ background: "var(--mint)" }}
              onClick={() => handlePetScale(-0.14)}
            >➖</button>
            <button
              className="heart-btn"
              title="Bigger"
              style={{ background: "var(--primary)" }}
              onClick={() => handlePetScale(0.14)}
            >➕</button>
            <button
              className="heart-btn"
              style={{ background: "var(--lavender)" }}
              title="Rotate Left"
              onClick={() => handlePetRotate(-15)}
            >⟲</button>
            <button
              className="heart-btn"
              style={{ background: "var(--secondary)" }}
              title="Rotate Right"
              onClick={() => handlePetRotate(15)}
            >⟳</button>
            <motion.button
              className="hero-btn"
              title="Preview Animation"
              onClick={handlePreview}
              style={{ marginLeft: 5, background: "linear-gradient(92deg,var(--pop-sky),var(--mint) 90%)", color:"var(--text-bright)", fontWeight:600, fontSize:"1em" }}
              whileTap={{scale:1.05}}
            >Live Preview</motion.button>
          </div>
        )}
        {/* Decorate with stickers! */}
        {roomImg && (
          <div style={{
            margin: "0.8em 0 1.2em 0", display: "flex", justifyContent: "center", gap: 10, minHeight: 50
          }}>
            {STICKER_LIST.map((s, i) => (
              <motion.button
                className={draggedStickerIdx===i ? "hero-btn" : "heart-btn"}
                key={s.icon}
                title={`Add ${s.icon}`}
                drag
                dragMomentum={false}
                style={{
                  fontSize: "1.42em",
                  background: draggedStickerIdx===i ? "var(--accent)" : (STICKER_LIST[(i+1)%STICKER_LIST.length].anim ? "var(--mint)" : "var(--lavender)"),
                  boxShadow: "0 1.5px 6px var(--primary)",
                  color: "var(--pop-sky)",
                  opacity: draggedStickerIdx===i ? 0.95 : 1,
                  position: "relative",
                  zIndex: (draggedStickerIdx===i ? 99 : 5)+i
                }}
                whileDrag={{ scale: 1.31, opacity: 0.72 }}
                onDragStart={() => setDraggedStickerIdx(i)}
                onDragEnd={(evt, d) => (handleStickerDrop(i, d))}
                aria-label={`Drag ${s.icon} as sticker`}
              >{s.icon}</motion.button>
            ))}
          </div>
        )}
        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 11, marginTop: 10 }}>
          <button className="hero-btn"
            style={{ background: "var(--primary)" }}
            disabled={!roomImg}
            onClick={handleComplete}
          >All Done!</button>
          <button className="nav-btn" style={{ color: "var(--secondary)" }} onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}
