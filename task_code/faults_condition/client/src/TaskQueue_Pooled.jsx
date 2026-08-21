import { usePlayer, usePlayers, useStage } from "@empirica/core/player/classic/react";
import React, { useEffect, useState } from "react";

export function TaskQueue_Pooled() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();
  const tasks = stage.get("tasks") || [];
  const completedTasks = stage.get("completedTasks") || {};
  const [isFaulted, setIsFaulted] = useState(false);

  useEffect(() => {
    const stageStartTime = stage.get("startTime");
    console.log("Stage Start Time: ", stageStartTime);
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

  const handleSelectTask = (taskId) => {
    player.set("currentTask", taskId);
    player.set("view", "TaskScreen");
  };
  
  const getTaskStatus = (taskId) => {
    const assigned = players.some(
      (p) => p.get("currentTask") === taskId
    );
    const taskData = completedTasks[taskId];
    const completedCount = taskData?.totalCount || 0;

    if (completedCount > 0) return { status: "completed", count: completedCount };
    if (assigned) return { status: "in-progress" };
    return { status: "available" };
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
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">Task Queue</h2>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[75vh]">
          {tasks.map((task) => {
            const { status, count } = getTaskStatus(task.id);

            return (
              <div key={task.id} className="p-4 border rounded bg-gray-100 flex items-center justify-between gap-6">
                <div>
                  <p className="font-semibold">{task.clientName}</p>
                </div>
                <div>
                  {status === "completed" ? (
                    <span 
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      ✅ Completed {count}x
                    </span>
                  ) : status === "in-progress" ? (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">
                      🔄 In Progress
                    </span>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleSelectTask(task.id)}
                    >
                      ⭕ Available
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}




