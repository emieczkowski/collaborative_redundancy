import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import React, { useEffect, useState } from "react";

const ageGroupIcon = {
  child: "🧒",
  adult: "🧑",
  elderly: "👵",
};

const ageGroupColor = {
  child: "bg-blue-100",
  adult: "bg-green-100",
  elderly: "bg-yellow-100",
};

export function TaskScreen() {
  const player = usePlayer();
  const stage = useStage();
  const tasks = stage.get("tasks") || [];
  const currentTaskId = player.get("currentTask");
  const currentColumn = player.get("currentColumn");
  const task = tasks.find((t) => t.id === currentTaskId);
  const [currentStage, setCurrentStage] = useState(null); 
  const [estimate, setEstimate] = useState(""); 
  const [ageGroupCounts, setAgeGroupCounts] = useState({
    child: "",
    adult: "",
    elderly: "",
  });
  const [startTime, setStartTime] = useState(null); // to track the start/end time of the task
  const [isFaulted, setIsFaulted] = useState(false);

  if (!currentTaskId || currentColumn == null) {
    return <p>No task selected. Returning to task queue...</p>;
  }

  useEffect(() => {
    const stageStartTime = stage.get("startTime");
    if (!stageStartTime) return;
  
    const interval = setInterval(() => {
      const faultWindows = player.get("faultWindows"); 
      console.log("Fault Windows: ", faultWindows);
      if (!Array.isArray(faultWindows) || faultWindows.length === 0) return;
    
      const elapsed = (Date.now() - new Date(stageStartTime)) / 1000;
    
      const currentlyFaulted = faultWindows.some(([start, end]) => {
        return elapsed >= start && elapsed < end;
      });
    
      setIsFaulted(currentlyFaulted);
      player.set("outSick", currentlyFaulted);
      console.log("Currently out sick?", currentlyFaulted);
    }, 500);
  
    return () => clearInterval(interval);
  }, [player, stage]);

  useEffect(() => {
    if (currentColumn !== null && currentColumn !== undefined) {
      setCurrentStage(currentColumn);
    }
    const completedTasks = stage.get("completedTasks") || {};

    if (!completedTasks[currentTaskId]) {
      return;
    }

    // Save estimates to show to next player (verification)
    if (currentColumn === 1 && completedTasks[currentTaskId].column1Data) {
      setAgeGroupCounts({ ...completedTasks[currentTaskId].column1Data });
    } else if (currentColumn === 2 && completedTasks[currentTaskId].column2Data) {
      setEstimate(String(completedTasks[currentTaskId].column2Data));
    } else if (currentColumn === 3 && completedTasks[currentTaskId].column3Data) {
      setEstimate(String(completedTasks[currentTaskId].column3Data));
    }
  }, [currentTaskId, currentColumn, stage]); 

  useEffect(() => {
    if (currentTaskId && currentColumn !== null && currentColumn !== undefined) {
      setStartTime(Date.now());
    }
  }, [currentTaskId, currentColumn]);

  const handleSubmit = () => {
    const numEstimate = Number(estimate);
    if (isNaN(numEstimate)) return;

    const endTime = Date.now();
    const duration = endTime - startTime;

    const completedTasks = { ...(stage.get("completedTasks") || {}) };

    if (!completedTasks[currentTaskId]) {
      completedTasks[currentTaskId] = { totalCount: 0, columns: {} };
    }

    completedTasks[currentTaskId].totalCount += 1;
    completedTasks[currentTaskId].columns[currentColumn] =
      (completedTasks[currentTaskId].columns[currentColumn] || 0) + 1;
    
    console.log(completedTasks);

    if (currentColumn === 1) {
      // completedTasks[currentTaskId].column1Data = { ...ageGroupCounts };
      completedTasks[currentTaskId].column1Data = estimate;
    } else if (currentColumn === 2) {
      completedTasks[currentTaskId].column2Data = estimate;
    } else if (currentColumn === 3) {
      completedTasks[currentTaskId].column3Data = estimate;
    }

    stage.set("completedTasks", completedTasks);
    player.set("numCompletedTasks", (player.get("numCompletedTasks") || 0) + 1);
    
    player.set("currentTask", null);
    player.set("currentColumn", null);
    player.set("view", "TaskQueue");

    const responseLog = {
      playerId: player.id,
      playerName: player.get("name"),
      role: player.get("role"),
      taskId: currentTaskId,
      column: currentColumn,
      // response:
      //   currentColumn === 1 ? { ...ageGroupCounts } : Number(estimate),
      response: Number(estimate),
      durationMs: duration,
      submittedAt: new Date().toISOString(),
    };
    
    const stageResponses = stage.get("responses") || [];
    stage.set("responses", [...stageResponses, responseLog]);
  };

  if (player.get("outSick")) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">😷 Out Sick</h2>
        <p>You’re temporarily out sick with the flu. Please wait to resume work. Don't exit this screen!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Neighborhood Task</h2>

      <div className="mb-6">
        {currentColumn === 1 && (
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Stage 1: Calculate the average number of <span className="font-bold text-blue-600">people per household</span> in this neighborhood.
            </p>
          </div>
        )}
        {currentStage === 2 && (
          <p className="text-lg font-semibold text-gray-700">
            Stage 2: Find the <span className="font-bold text-green-600">maximum household income</span> in this neighborhood.
          </p>
        )}
        {currentStage === 3 && (
          <p className="text-lg font-semibold text-gray-700">
            Stage 3: Add up the <span className="font-bold text-purple-600">total commute distance for children</span>.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {task.houses.map((house, index) => (
          <div
            key={index}
            className="relative border rounded-lg shadow-sm p-4 bg-white group"
          >
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10 
                            group-hover:opacity-0 transition-opacity duration-300">
              <h4 className="font-semibold text-gray-800">🏠 House {index + 1}</h4>
            </div>

            <h4 className="font-semibold mb-2 text-gray-800">🏠 House {index + 1}</h4>
            {house.residents.map((person, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-sm mb-1 px-2 py-1 rounded ${ageGroupColor[person.ageGroup]}`}
              >
                <span>{ageGroupIcon[person.ageGroup]}</span>
                <span className="capitalize">{person.ageGroup}</span>
                <span className="text-gray-500">💰 ${person.income}</span>
                <span className="text-gray-500">🚗 {person.commuteDistance} mi</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* {(currentStage === 1) && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.keys(ageGroupCounts).map((group) => (
            <div key={group}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {ageGroupIcon[group]} {group}
              </label>
              <input
                type="number"
                min="0"
                value={ageGroupCounts[group]}
                onChange={(e) =>
                  setAgeGroupCounts({
                    ...ageGroupCounts,
                    [group]: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-center"
              />
            </div>
          ))}
        </div>
      )} */}

      {(currentStage == 1 || currentStage === 2 || currentStage == 3) && (
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter your estimate"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
            className="w-full md:w-1/3 px-3 py-2 border rounded text-center text-lg"
          />
        </div>
      )}

      <div className="text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          onClick={handleSubmit}
          disabled={
            (currentStage === 1 &&
              // Object.values(ageGroupCounts).some((v) => v === "" || isNaN(Number(v)))
              (estimate === "" || isNaN(Number(estimate)))
            ) ||
            ((currentStage === 2 || currentStage === 3) &&
              (estimate === "" || isNaN(Number(estimate))))
          }
          
        >
          Submit
        </button>
      </div>
    </div>
  );
}





