import { usePlayer, usePlayers, useStage } from "@empirica/core/player/classic/react";
import React from "react";

export function TaskQueue_Pooled() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();
  const tasks = stage.get("tasks") || [];
  const completedTasks = stage.get("completedTasks") || {};

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

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task Queue</h2>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => {
            const { status, count } = getTaskStatus(task.id);

            return (
              <div key={task.id} className="p-4 border rounded bg-gray-100 flex items-center justify-between gap-6">
                <div>
                  <p className="font-semibold">{task.clientName}</p>
                </div>
                <div>
                  {status === "completed" ? (
                    <button 
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSelectTask(task.id)}
                    >
                      ✅ Completed {count}x
                    </button>
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




