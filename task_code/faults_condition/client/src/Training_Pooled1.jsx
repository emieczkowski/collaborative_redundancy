// Training_Pooled_Stage1.jsx
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

// const correctAnswers = { child: 1, adult: 2, elderly: 0 };
const correctAnswer = 2; 

const ageGroupIcon = { child: "🧒", adult: "🧑", elderly: "👵" };
const ageGroupColor = {
  child: "bg-blue-100",
  adult: "bg-green-100",
  elderly: "bg-yellow-100",
};

export function Training_Pooled1() {
  // const [ageGroupCounts, setAgeGroupCounts] = useState({
  //   child: "",
  //   adult: "",
  //   elderly: "",
  // });
  const [estimate, setEstimate] = useState("");

  // Whether the user has submitted the correct answer
  const [isCorrect, setIsCorrect] = useState(false);
  const [waiting, setWaiting] = useState(false);

  // const handleSubmit = () => {
  //   const userChild = Number(ageGroupCounts.child) || 0;
  //   const userAdult = Number(ageGroupCounts.adult) || 0;
  //   const userElderly = Number(ageGroupCounts.elderly) || 0;

  //   if (
  //     userChild === correctAnswers.child &&
  //     userAdult === correctAnswers.adult &&
  //     userElderly === correctAnswers.elderly
  //   ) {
  //     // Correct!
  //     setIsCorrect(true);
  //     setWaiting(true);
  //   } else {
  //     alert("❌ Incorrect. Please try again!");
  //   }
  // };

  const handleSubmit = () => {
    const num = Number(estimate);
    if (num === correctAnswer) {
      setIsCorrect(true);
      setWaiting(true);
    } else {
      alert("❌ Incorrect. Please try again!");
    }
  };

  const task = trainingNeighborhood;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Training – Stage 1</h2>

      {!waiting && (
        <p>
          Calculate the average number of <span className="font-bold text-blue-600">people per household</span> in this neighborhood.
          Add up the total number of people, and divide by the number of houses. <i>Your answer should be a whole number (no rounding needed)</i>.
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

      {/* If not waiting, show the input fields */}
      {!waiting && (
        <div className="mb-4 text-center">
          <label className="block mb-2">Enter your estimate</label>
          <input
            type="number"
            placeholder="Average people"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
            className="px-3 py-2 border rounded text-center text-lg"
          />
        </div>
      )}

      {/* The button or waiting message */}
      <div className="text-center">
        {!waiting ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <div className="text-lg font-semibold text-green-600 mt-4">
            Correct! Waiting for other players to finish training...
          </div>
        )}
      </div>
      <p className="mt-4 text-sm">
        This stage automatically ends after 60s. You can’t move on until the timer runs out.
      </p>
    </div>
  );
}

