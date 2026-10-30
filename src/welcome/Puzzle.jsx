import { useState, useEffect } from "react";
import "./puzzle.scss";
import cartonSvg from "../assets/icons/ghost-milk-carton.svg";
import TPLOGO from '../assets/icons/tetra-pak-logo.svg'

const SVG_WIDTH = 340;
const SVG_HEIGHT = 620;
const SLOT_COUNT = 6;
const PIECE_HEIGHT = SVG_HEIGHT / SLOT_COUNT;

/* const BrandPuzzle = ({ compact = false }) => {
    return (
        <a className={`brand${compact ? ' brand-compact' : ''}`} href="/login" aria-label="NGMatDB home">
            <img src={TPLOGO} alt="" aria-hidden="true" />
            <span className="brand-name">Next Gen <span style={{ color: '#FF8C00' }}>MATERIAL</span> DB</span>
        </a>
    )
}
 */
const MATERIALS = [
    {
        id: 0,
        name: "🧢 HDPE Cap",
        description: "HDPE provides a strong and reclosable cap."
    },
    {
        id: 1,
        name: "🧃 Printed Artwork",
        description: "Artwork provides branding and product information."
    },
    {
        id: 2,
        name: "📄 Paperboard",
        description: "Provides stiffness and package strength."
    },
    {
        id: 3,
        name: "⚙  Aluminum Foil",
        description: "Protects against oxygen and light."
    },
    {
        id: 4,
        name: "💧 Inner Polymer",
        description: "Creates a liquid-tight food-safe barrier."
    },
    {
        id: 5,
        name: "🔻 Bottom Seal",
        description: "Keeps the package securely closed."
    }
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Puzzle() {
    const [pieces, setPieces] = useState(shuffle(MATERIALS));
    const [slots, setSlots] = useState(Array(6).fill(null));
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [popup, setPopup] = useState(null);
    const [time, setTime] = useState(0);

    const score = slots.filter(Boolean).length * 100;
    const completed = slots.every(Boolean);

    useEffect(() => {
        if (completed) return;

        const timer = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [completed]);

    const handleDrop = (slotIndex) => {
        if (!draggedPiece) return;

        if (draggedPiece.id !== slotIndex) {
            alert("❌ Incorrect layer. Try again.");
            return;
        }

        const nextSlots = [...slots];
        nextSlots[slotIndex] = draggedPiece;

        setSlots(nextSlots);

        setPieces((prev) =>
            prev.filter((p) => p.id !== draggedPiece.id)
        );

        setPopup(draggedPiece);

        setTimeout(() => {
            setPopup(null);
        }, 5000);

        setDraggedPiece(null);
    };

    return (
        <div className="puzzle">
            <div className="rightPanel">
                <h1>🎃 Build The <span>Tetra Pak</span> Package 🎃</h1>
                <div className="hud">
                    <div>⭐ Score: {score}</div>
                    <div>⏱ Time: {time}s</div>
                </div>
                <div className="playArea">
                    <div className="pieces">
                        {pieces.map((piece) => (
                            <div
                                key={piece.id}
                                draggable
                                className="pieceCard"
                                onDragStart={() =>
                                    setDraggedPiece(piece)
                                }
                            >
                                {piece.name}
                            </div>
                        ))}

                    </div>

                    <div className="carton">

                        {[0, 1, 2, 3, 4, 5].map((slotIndex) => (
                            <div
                                key={slotIndex}
                                className="slot"
                                onDragOver={(e) =>
                                    e.preventDefault()
                                }
                                onDrop={() =>
                                    handleDrop(slotIndex)
                                }
                            >
                                {slots[slotIndex] ? (
                                    <div className="svgPiece"
                                        style={{
                                            backgroundImage: `url(${cartonSvg})`,
                                            backgroundSize: `100% 600%`,
                                            backgroundPosition: `0 ${-slotIndex * 100}%`
                                        }}
                                    />
                                ) : (
                                    <div className="dropLabel">Drop Here</div>
                                )}
                            </div>
                        ))}

                    </div>

                </div>

                {completed && (
                    <div className="winner">
                        <h2>🎃 YOU BUILT THE PACKAGE! 🎃</h2>
                        <br />
                        <h3>🥛 Fresh Milk Ready! 🧃</h3>
                    </div>
                )}

            </div>

            {popup && (
                <div className="popup">
                    <h3>{popup.name}</h3>
                    <p>{popup.description}</p>
                </div>
            )}

        </div>
    );
}