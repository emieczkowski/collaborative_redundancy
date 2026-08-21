import React, { useState } from "react";
import { usePlayer, useGame } from "@empirica/core/player/classic/react";

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

const correctAnswers = {
  1: 2,
  2: 40000,
  3: 15,
};

export function Training() {
  const player = usePlayer();
  const game = useGame();
  const role = player.get("role");
  const column =
    role === "AVERAGE PEOPLE" ? 1 :
    role === "MAXIMUM INCOME" ? 2 :
    role === "CHILDREN'S COMMUTE DISTANCE" ? 3 : null;

  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [ageCounts, setAgeCounts] = useState({ child: "", adult: "", elderly: "" });
  const [estimate, setEstimate] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    // if (column === 1) {
    //   const correct = correctAnswers[1];
    //   const isCorrect =
    //     Number(ageCounts.child) === correct.child &&
    //     Number(ageCounts.adult) === correct.adult &&
    //     Number(ageCounts.elderly) === correct.elderly;
  
    //   if (isCorrect) {
    //     setSubmitted(true);
    //     setShowAnswer(true);
    //   } else {
    //     alert("❌ Incorrect. Please try again!");
    //   }
    // }

    if (column === 1) {
      const num = Number(estimate);
      if (num === correctAnswers[1]) {
        setSubmitted(true);
        setShowAnswer(true);
      } else {
        alert("❌ Incorrect. Please try again!");
      }
    }
  
    if (column === 2) {
      const num = Number(estimate);
      if (num === correctAnswers[2]) {
        setSubmitted(true);
        setShowAnswer(true);
      } else {
        alert("❌ Incorrect. Please try again!");
      }
    }
  
    if (column === 3) {
      const num = Number(estimate);
      if (num === correctAnswers[3]) {
        setSubmitted(true);
        setShowAnswer(true);
      } else {
        alert("❌ Incorrect. Please try again!");
      }
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Training Stage</h2>

      {/* Instructions based on role */}
      <div className="mb-4">
        {column === 1 && (
          <p>
            Calculate the average number of <span className="font-bold text-blue-600">people per household</span> in this neighborhood.
            Add up the total number of people, and divide by the number of houses. <i>Your answer should be a whole number (no rounding needed)</i>.
          </p>
        )}
        {column === 2 && (
          <p>
            Find the <span className="font-bold text-green-600">maximum household income</span> in this neighborhood. To calculate a household income, add up the incomes of each person in that house. <i>Hover your mouse over each house to see who lives inside.</i>
          </p>
        )}
        {column === 3 && (
          <p>
            Add up the <span className="font-bold text-purple-600">total commute distance for children</span> in the neighborhood. <i>Hover your mouse over each house to see who lives inside.</i>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {trainingNeighborhood.houses.map((house, index) => (
          <div key={index} className="relative border rounded-lg shadow-sm p-4 bg-white group">
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-300">
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

      {/* Input fields */}
      {/* {!submitted && column === 1 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.keys(ageCounts).map((group) => (
            <div key={group}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {ageGroupIcon[group]} {group}
              </label>
              <input
                type="number"
                min="0"
                value={ageCounts[group]}
                onChange={(e) =>
                  setAgeCounts({
                    ...ageCounts,
                    [group]: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-center"
              />
            </div>
          ))}
        </div>
      )} */}

      {!submitted && (column == 1 | column === 2 || column === 3) && (
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

      {/* Submit button */}
      {!submitted && (
        <div className="text-center mb-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            disabled={
              (column === 1 &&
                Object.values(ageCounts).some((v) => v === "" || isNaN(Number(v)))) ||
              ((column === 2 || column === 3) && (estimate === "" || isNaN(Number(estimate))))
            }
          >
            Submit
          </button>
        </div>
      )}

      {/* Correct answer shown only after submission */}
      {/* {showAnswer && (
        <div className="bg-green-100 text-green-800 p-4 rounded text-center mb-4">
          <strong>✅ Correct Answer:</strong>
          {column === 1 && (
            <p>
              Average number of people = {correctAnswers[1]}
            </p>
          )}
          {column === 2 && <p>Maximum income = {correctAnswers[2]}</p>}
          {column === 3 && <p>Total commute distance = {correctAnswers[3]}</p>}
        </div>
      )} */}

      {submitted && (
        <div className="text-center mt-6">
          <p className="text-gray-600 italic">Good job! Waiting for other players to finish training...</p>
        </div>
      )}
    </div>
  );
}

