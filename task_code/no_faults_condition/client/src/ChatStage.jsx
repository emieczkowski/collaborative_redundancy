import React from "react";
import { useGame, usePlayer, useStage, Chat } from "@empirica/core/player/classic/react";

export function ChatStage({ next }) {
  const game = useGame();
  const stage = useStage();
  const player = usePlayer();

  return (
    <div className="chatstage-container">
      <div className="content-container">
        <div className="instructions-container">
          <p>
            You have <strong>60 seconds to chat with your teammates</strong> before you begin your workday. Introduce yourselves with a fake name (for example, your favorite superhero)! Remember, you must work together to complete the tasks.
          </p>
        </div>
        <div className="chat-container">
          <Chat scope={stage} attribute="chat" />
        </div>
      </div>
    </div>
  );
}


