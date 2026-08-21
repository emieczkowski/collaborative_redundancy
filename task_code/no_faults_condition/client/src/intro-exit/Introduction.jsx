import React from "react";
import { Button } from "../components/Button.jsx";
import { useGame, usePlayer } from "@empirica/core/player/classic/react";

export function Introduction({ next }) {
  const game = useGame();
  const player = usePlayer();
  const { playerCount, networkStruct } = game.get("treatment");

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1>Instructions (1/3)</h1>
      <div className="mt-2 mb-6">
        <h3>
          Welcome to your new job as a <strong>census analyst</strong>! Your team has been hired to process survey data collected from neighborhoods across Artificial City.
        </h3> <br />
        <p>
          🤝 Your goal is to work <strong>together</strong> to complete as many neighborhood tasks as possible, <strong>quickly and accurately</strong>. 
        </p> <br />
        <p>
          💰 The better your team performs, the <strong>higher your bonus</strong>. If your team does well but you <i>never complete a task</i>, you will <u>not receive a bonus</u>.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
