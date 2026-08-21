// Training_Pooled_Stage2.jsx
import React, { useState } from "react";

const trainingNeighborhood = {
  id: "neighborhood_1",
  clientName: "West Village",
  houses: [
    {
      residents: [
        { ageGroup: "child", income: 0, commuteDistance: 5 },
        { ageGroup: "adult", income: 10000, commuteDistance: 12 },
      ],
    },
    {
      residents: [
        { ageGroup: "adult", income: 20000, commuteDistance: 12 },
        { ageGroup: "child", income: 20000, commuteDistance: 10 },
      ],
    },
  ],
};

const correctAnswer = 40000; 

const ageGroupIcon = { child: "🧒", adult: "🧑", elderly: "👵" };
const ageGroupColor = {
  child: "bg-blue-100",
  adult: "bg-green-100",
  elderly: "bg-yellow-100",
};

export function Training_Pooled2() {
  const [estimate, setEstimate] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const task = trainingNeighborhood;

  const handleSubmit = () => {
    const num = Number(estimate);
    if (num === correctAnswer) {
      setIsCorrect(true);
      setWaiting(true);
    } else {
      alert("❌ Incorrect. Please try again!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Training – Stage 2</h2>
      {!waiting && (
        <p>
          Find the <span className="font-bold text-green-600">maximum household income</span> in this neighborhood. To calculate a household income, add up the incomes of each person in that house. <i>Hover your mouse over each house to see who lives inside.</i>
        </p>
      )}

      {/* Show the houses */}
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
            <h4 className="font-semibold mb-2 text-gray-800">
              🏠 House {index + 1}
            </h4>
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

      {/* If not waiting, show input */}
      {!waiting && (
        <div className="mb-4 text-center">
          <label className="block mb-2">Enter your estimate</label>
          <input
            type="number"
            placeholder="Maximum income"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
            className="px-3 py-2 border rounded text-center text-lg"
          />
        </div>
      )}

      <div className="text-center">
        {!waiting ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            onClick={handleSubmit}
            disabled={!estimate}
          >
            Submit
          </button>
        ) : (
          <div className="text-lg font-semibold text-green-600 mt-4">
            Correct! Waiting for other players to finish Stage 2...
          </div>
        )}
      </div>
      <p className="mt-4 text-sm">
        This stage automatically ends after 60s.
      </p>
    </div>
  );
}
