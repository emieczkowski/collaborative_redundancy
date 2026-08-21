import { usePlayer, usePlayers, useGame } from "@empirica/core/player/classic/react";

export function TimeToBegin() {
  const player = usePlayer();
  const game = useGame();
  const players = usePlayers();
  // const teamSize = players.filter(p => p.get("active")).length;
  const teamSize = game.get("activePlayersCount");
  const role = player.get("role");
  const { playerCount, networkStruct } = game.get("treatment");

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Your team is confirmed!</h2>
      <p>You will be working with a team of <strong>{teamSize} players</strong>.</p>
        {networkStruct == "reciprocal" && (
        <p>Your assigned role is: <strong>{role}</strong>.</p>
        )}
      <p className="mt-4 italic text-gray-600">Next, you will begin your workday. Please wait for the next stage to begin.</p>
    </div>
  );
}
