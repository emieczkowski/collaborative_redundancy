import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";

export function ButtonCheck() {
  const player = usePlayer();
  const [clicked, setClicked] = useState(false);

  const handleConfirm = () => {
    player.set("confirmedReady", true);
    setClicked(true);
    console.log("Player confirmed they are ready.");
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Begin?</h2>
      {!clicked ? (
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          ✅ I'm ready and committed to playing the rest of the game!
        </button>
      ) : (
        <p className="text-green-600 font-semibold mt-4">Thanks! Waiting for others...</p>
      )}
    </div>
  );
}
