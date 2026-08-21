import React from "react";
import { Button } from "../components/Button.jsx";
import { useGame, usePlayer } from "@empirica/core/player/classic/react";

export function Introduction4({ next }) {
  const game = useGame();
  const player = usePlayer();
  const { playerCount, networkStruct } = game.get("treatment");

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1>Instructions (4/4)</h1>
      <div className="mt-2 mb-6">
        <p><strong>Each neighborhood has 3 subtasks:</strong></p>
        <ol className="list-decimal list-inside ml-4">
          <li>👨‍👩‍👧 Calculate the <u>average number of people in each household</u></li>
          <li>💰 Find the <u>maximum household income</u></li>
          <li>🚌 Add up the <u>total commute distance for children</u></li>
        </ol> <br />

        {networkStruct === "reciprocal" && (
          <p>
            You will be assigned <strong>one role</strong> to focus on once your team is finalized after training, as well as a <strong>team size</strong>.
          </p>
        )}
        {networkStruct === "pooled" && (
          <p>
            You will complete <strong>all three tasks</strong> for each neighborhood. You will be assigned a <strong>team size</strong> after training.
          </p>
        )}
        <br />

        <p>
          Before work begins, you will:
          <ul className="list-disc list-inside ml-4">
            <li>💬 Have 60 seconds to <strong>chat with your teammates</strong></li>
            <li>🎓 Complete three short <strong>training rounds</strong> to learn about the job</li>
            <li>
                ✅ <strong>Confirm you're ready</strong> by pressing a button quickly after training ends.<br />
                <span className="text-red-600 font-semibold">🚫 <u>If you do not press this button, you will be removed from the game and your Prolific submission will be rejected.</u></span>
            </li>
          </ul>
        </p> <br />

        <p>
          If you wait more than <strong>10 minutes</strong> for teammates and still complete the game, you'll earn a <strong>$0.50 bonus</strong> in addition to any other bonuses your team earns.
        </p> <br />
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}