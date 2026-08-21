import { usePlayer, usePlayers, useStage, useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function TaskQueue() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();
  const tasks = stage.get("tasks") || [];
  const game = useGame();

  // Helper to map role -> column
  function roleToColumn(role) {
    switch (role) {
      case "AGE GROUPS":
        return 1;
      case "AVERAGE INCOME":
        return 2;
      case "CHILDREN'S COMMUTE DISTANCE":
        return 3;
      default:
        return null; 
    }
  }

  // The player’s assigned column based on role
  const playerColumn = roleToColumn(player.get("role"));

  const handleSelectTask = (taskId, column) => {
    // Only set if the column matches the player's role
    player.set("currentTask", taskId);
    player.set("currentColumn", column);
    player.set("view", "TaskScreen");
  };

  const taskStatus = (task, column) => {
    // Check if any player is currently working on this task-column
    const assigned = players.some(
      (p) => p.get("currentTask") === task.id && p.get("currentColumn") === column
    );
    // Check if the task is completed in this column
    const completedTasks = stage.get("completedTasks") || {};
    const taskCompletion = completedTasks[task.id]?.columns || {};
    const completedCount = taskCompletion[column] || 0;

    if (completedCount > 0) return "completed";
    if (assigned) return "in-progress";
    return "available";
  };

  const renderTaskCell = (task, column) => {
    const status = taskStatus(task, column);
    const completedTasks = stage.get("completedTasks") || {};
    const taskCompletion = completedTasks[task.id]?.columns || {};
    const completedCount = taskCompletion[column.toString()] || 0;

    // If this player's role maps to a different column, disable
    const isMyColumn = column === playerColumn;

    if (!isMyColumn) {
      return (
        <td className="border p-2 text-center">
          <button
            className="bg-gray-300 text-white px-2 py-1 rounded cursor-not-allowed"
            disabled
          >
            Locked
          </button>
        </td>
      );
    }

    if (status === "completed") {
      return (
        <td className="border p-2 text-center">
          <button 
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleSelectTask(task.id, column)}
          >
            ✅ Completed {completedCount}x
          </button>
        </td>
      );
    } else if (status === "in-progress") {
      return (
        <td className="border p-2 text-center">
          <span className="bg-red-500 text-white px-2 py-1 rounded">
            🔄 In Progress
          </span>
        </td>
      );
    } else {
      return (
        <td className="border p-2 text-center">
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            onClick={() => handleSelectTask(task.id, column)}
          >
            ⭕ Available
          </button>
        </td>
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Task Queue</h2>
      <div className="border p-2 rounded bg-gray-100">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Neighborhood</th>
                <th className="border p-2">Population Count</th>
                <th className="border p-2">Average Income</th>
                <th className="border p-2">Commute Distance</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border">
                  <td className="border p-2">{task.clientName}</td>
                  {renderTaskCell(task, 1)}
                  {renderTaskCell(task, 2)}
                  {renderTaskCell(task, 3)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}




