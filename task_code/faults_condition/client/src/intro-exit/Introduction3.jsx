import React from "react";
import { Button } from "../components/Button.jsx";
import { useGame, usePlayer } from "@empirica/core/player/classic/react";

export function Introduction3({ next }) {
  const game = useGame();
  const player = usePlayer();
  const { playerCount, networkStruct } = game.get("treatment");

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1>Instructions (3/4)</h1>
      <div className="mt-2 mb-6">
        <p>
          <span className="text-red-600 font-semibold">😷 Heads up!</span> During the final work round, <strong>each player will randomly become "out sick"</strong> for <strong>60 seconds</strong>.
        </p> 
        <br />
        <p>
          🕒 This can happen <strong>at any time</strong> during your shift, and <u>you won't be able to work during that period</u>.
        </p> 
        <br />
        <p>
          <strong>Don’t panic!</strong> This is a normal part of the simulation. Just wait on the <em>“Out Sick”</em> screen — you'll automatically return to the game when you're better.
        </p> 
        <br />
        <p>
          🚫 <strong>Do NOT refresh or close the window</strong>. Doing so may disrupt your participation and bonus eligibility.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
