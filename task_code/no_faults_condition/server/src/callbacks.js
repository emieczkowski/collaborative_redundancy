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
    const faults = [];
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
    const baseRoles = [
      "AVERAGE PEOPLE",
      "MAXIMUM INCOME",
      "CHILDREN'S COMMUTE DISTANCE",
    ];
    if (count == 2 ) {
      roles = ["AVERAGE PEOPLE", "MAXIMUM INCOME"];
      console.log("2 players");
    } else if (count === 3) {
      roles = ["AVERAGE PEOPLE", "MAXIMUM INCOME", "CHILDREN'S COMMUTE DISTANCE"];
      console.log("3 players");
    } else if (count === 4) {
      const duplicateRole = baseRoles[Math.floor(Math.random() * baseRoles.length)];
      roles = [...baseRoles, duplicateRole];
      console.log(`4 players → duplicating: ${duplicateRole}`);
    } else if (count === 5) {
      // 5 players: base + two duplicates randomly chosen from base roles
      const duplicateRoles = [];
      while (duplicateRoles.length < 2) {
        const pick = baseRoles[Math.floor(Math.random() * baseRoles.length)];
        if (!duplicateRoles.includes(pick)) {
          duplicateRoles.push(pick);
        }
      }
      roles = [...baseRoles, ...duplicateRoles];
      console.log(`5 players → duplicating: ${duplicateRoles.join(", ")}`);
    } else if (count === 6) {
      roles = [
        "AVERAGE PEOPLE", "AVERAGE PEOPLE",
        "MAXIMUM INCOME", "MAXIMUM INCOME",
        "CHILDREN'S COMMUTE DISTANCE", "CHILDREN'S COMMUTE DISTANCE"
      ];
      console.log("6 players!!");
    } else {
      console.warn("Only one participant is active!");
      roles = ["AVERAGE PEOPLE", "MAXIMUM INCOME", "CHILDREN'S COMMUTE DISTANCE"];
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
  }
});


Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});