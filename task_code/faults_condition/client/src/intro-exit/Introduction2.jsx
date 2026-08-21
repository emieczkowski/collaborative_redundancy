import React from "react";
import { Button } from "../components/Button.jsx";
import { useGame, usePlayer } from "@empirica/core/player/classic/react";
import ReciprocalImage from "../../public/ReciprocalTaskQueue.png";
import PooledImage from "../../public/PooledTaskQueue.png";

export function Introduction2({ next }) {
  const game = useGame();
  const player = usePlayer();
  const { playerCount, networkStruct } = game.get("treatment");

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1>Instructions (2/4)</h1>
      <div className="mt-2 mb-6">

        {networkStruct === "pooled" && (
          <>
            <p>
              📊 Your job is to complete <strong>all three stages of information processing</strong> about individual neighborhoods. 
            </p> <br></br>
            <p>
              To start, click an <strong>available task</strong> in the queue. You <i>cannot select neighborhoods</i> that are in progress or already completed by others.
            </p> <br />
            <p>
              <strong>Each neighborhood can only be processed once</strong>, so accuracy is important!
            </p>
            <img
              src={PooledImage}
              alt="Task Queue"
              className="block mx-auto w-[300px] mt-4 rounded"
            />
          </>
        )}

        {networkStruct === "reciprocal" && (
          <>
            <p>
              📊 You will have a <strong>specialized role</strong> on your team, and only process <i>specific information about each neighborhood</i>. There are three total roles, each with a unique task to complete.</p>
            <br></br>
            <p>
              Click on an available task for your role to begin. You <i>cannot start</i> tasks that are in progress, completed, or outside your role.
            </p> <br />
            <p>
              <strong>Each task can only be processed once</strong>, so accuracy is important!
            </p>
            <img
              src={ReciprocalImage}
              alt="Task Queue"
              className="block mx-auto w-[800px] mt-4 rounded"
            />
          </>
        )}
        <br></br>

      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
