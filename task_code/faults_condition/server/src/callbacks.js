import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { playerCount, networkStruct } = treatment;

  game.players.forEach((player, index) => {
    player.set('name', `Player ${index + 1}`);
    console.log(player.get('name'));
  });

  console.log(`Game started with treatment: ${JSON.stringify(treatment)}`);

  if (networkStruct == "reciprocal") {
    const round1 = game.addRound({ name: "Discussion" });
    round1.addStage({ name: "Discussion", duration: 60 });

    const round2 = game.addRound({ name: "Training" });
    round2.addStage({ name: "Training_Stage1", duration: 60 });
    round2.addStage({ name: "Training_Stage2", duration: 60 });
    round2.addStage({ name: "Training_Stage3", duration: 60 });

    const round3 = game.addRound({ name: "ButtonCheck" });
    round3.addStage({ name: "ButtonCheck", duration: 10 });

    const round4 = game.addRound({ name: "TimeToBegin" });
    round4.addStage({ name: "TimeToBegin", duration: 10 });

    const round5 = game.addRound({ name: "Work" });
    round5.addStage({ name: "Work", duration: 300 });
    
  } else {
    const round1 = game.addRound({ name: "Discussion" });
    round1.addStage({ name: "Discussion", duration: 60 });

    const round2 = game.addRound({ name: "Training" });
    round2.addStage({ name: "Training_Stage1", duration: 60 });
    round2.addStage({ name: "Training_Stage2", duration: 60 });
    round2.addStage({ name: "Training_Stage3", duration: 60 });

    const round3 = game.addRound({ name: "ButtonCheck" });
    round3.addStage({ name: "ButtonCheck", duration: 10 });

    const round4 = game.addRound({ name: "TimeToBegin" });
    round4.addStage({ name: "TimeToBegin", duration: 10 });

    const round5 = game.addRound({ name: "Work" });
    round5.addStage({ name: "Work", duration: 300 });
  }

});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {
  if (stage.get("name") === "Work") {
    const now = new Date().toISOString();
    stage.set("startTime", now);
    const game = stage.currentGame;
    const faults = game.get("plannedFaults") || [];
    console.log("Faults: ", faults);
  }
});

Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") === "ButtonCheck") {
    const treatment = stage.currentGame.get("treatment");
    const { playerCount, networkStruct } = treatment;

    const activePlayers = stage.currentGame.players.filter(p => p.get("confirmedReady"));
    const count = activePlayers.length;
    stage.currentGame.set("activePlayersCount", count);
    const activePlayerIDs = activePlayers.map(p => p.id);
    stage.set("activePlayers", activePlayerIDs);

    let roles;
    if (count == 2 ) {
      roles = ["AVERAGE PEOPLE", "MAXIMUM INCOME"];
      console.log("2 players");
    } else if (count === 3) {
      roles = ["AVERAGE PEOPLE", "MAXIMUM INCOME", "CHILDREN'S COMMUTE DISTANCE"];
      console.log("3 players");
    } else if (count == 4) {
      roles = ["AVERAGE PEOPLE", "AVERAGE PEOPLE", "MAXIMUM INCOME", "CHILDREN'S COMMUTE DISTANCE"];
      console.log("4 players");
    } else if (count == 5) {
      roles = ["AVERAGE PEOPLE", "AVERAGE PEOPLE", "MAXIMUM INCOME", "MAXIMUM INCOME", "CHILDREN'S COMMUTE DISTANCE"];
      console.log("5 players");
    } else if (count === 6) {
      roles = [
        "AVERAGE PEOPLE", "AVERAGE PEOPLE",
        "MAXIMUM INCOME", "MAXIMUM INCOME",
        "CHILDREN'S COMMUTE DISTANCE", "CHILDREN'S COMMUTE DISTANCE"
      ];
      console.log("6 players!!");
    } else {
      console.warn("Only one participant is active!");
      roles = ["AVERAGE PEOPLE"];
    }

    // Assign roles and mark active players
    activePlayers.forEach((player, index) => {
      player.set("active", true);
      if (networkStruct == "reciprocal") {
        player.set('role', roles[index % roles.length]);
        console.log(player.get('role'));
      }
    });

    stage.currentGame.players.forEach((player) => {
      if (!player.get("confirmedReady")) {
        console.log(`Removing inactive player ${player.id}`);
        player.set("kicked", true);
        try {
          player.exit("You did not confirm readiness and have been removed.");
        } catch (e) {
          console.error(`❌ Could not exit player ${player.id}:`, e);
        }
      }
    });

    const faultWindowInSeconds = 300;  
    const faultDuration = 60; 
    const numFaultsPerPlayer = 2;

    const plannedFaults = [];

    activePlayers.forEach((player) => {
      const faultTimes = [];
      while (faultTimes.length < numFaultsPerPlayer) {
        const start = Math.floor(Math.random() * (faultWindowInSeconds - faultDuration));
        const end = start + faultDuration;

        // Prevent overlapping faults for the same player
        const overlaps = faultTimes.some(
          ([s, e]) => (start < e && end > s)
        );
        if (!overlaps) faultTimes.push([start, end]);
      }

      player.set("faultWindows", faultTimes);
      faultTimes.forEach(([start, _]) => {
        plannedFaults.push({ playerId: player.id, faultStart: start });
      });
    });
    stage.currentGame.set("plannedFaults", plannedFaults);

  }
});


Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});