import { usePlayer, useStage, useGame } from "@empirica/core/player/classic/react";
import React, { useEffect } from "react";
import { TaskQueue } from "./TaskQueue.jsx";
import { TaskScreen } from "./TaskScreen.jsx";
import { TaskScreen_Pooled } from "./TaskScreen_Pooled.jsx";
import { TaskQueue_Pooled } from "./TaskQueue_Pooled.jsx";
import { Training } from "./Training.jsx";
import { Training_Pooled1 } from "./Training_Pooled1.jsx";
import { Training_Pooled2 } from "./Training_Pooled2.jsx";
import { Training_Pooled3 } from "./Training_Pooled3.jsx";
import { ChatStage } from "./ChatStage.jsx";
import { ButtonCheck } from "./ButtonCheck.jsx";
import { TimeToBegin } from "./TimeToBegin.jsx";

const predefinedTasks = [
  {
    id: "neighborhood_1",
    clientName: "Bellman Village",
    houses: [
      {
        residents: [
          { ageGroup: "adult", income: 55000, commuteDistance: 10 },
          { ageGroup: "child", income: 0, commuteDistance: 1 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 22000, commuteDistance: 3 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 60000, commuteDistance: 15 },
          { ageGroup: "child", income: 0, commuteDistance: 0 },
        ],
      },
      {
        residents: [
          { ageGroup: "child", income: 0, commuteDistance: 5 },
          { ageGroup: "child", income: 1000, commuteDistance: 4 },
          { ageGroup: "elderly", income: 5000, commuteDistance: 7 },
        ],
      },
    ],
  },
  {
    id: "neighborhood_2",
    clientName: "Priorsburg",
    houses: [
      {
        residents: [
          { ageGroup: "adult", income: 48000, commuteDistance: 8 },
          { ageGroup: "child", income: 1000, commuteDistance: 3 },
          { ageGroup: "child", income: 0, commuteDistance: 12 },
        ],
      },
      {
        residents: [
          { ageGroup: "child", income: 1000, commuteDistance: 1 },
          { ageGroup: "elderly", income: 20000, commuteDistance: 2 },
          { ageGroup: "elderly", income: 0, commuteDistance: 0 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 51000, commuteDistance: 10 },
          { ageGroup: "adult", income: 2500, commuteDistance: 3 },
          { ageGroup: "elderly", income: 500, commuteDistance: 4 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 47000, commuteDistance: 9 },
          { ageGroup: "child", income: 0, commuteDistance: 13 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 18000, commuteDistance: 1 },
          { ageGroup: "elderly", income: 20000, commuteDistance: 3 },
          { ageGroup: "child", income: 0, commuteDistance: 0 },
          { ageGroup: "child", income: 0, commuteDistance: 0 },
        ],
      },
    ],
  },
  {
    id: "neighborhood_3",
    clientName: "Stochasti City",
    houses: [
      {
        residents: [
          { ageGroup: "adult", income: 52000, commuteDistance: 13 },
          { ageGroup: "adult", income: 0, commuteDistance: 0 },
          { ageGroup: "child", income: 1000, commuteDistance: 6 },
          { ageGroup: "child", income: 0, commuteDistance: 5 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 60000, commuteDistance: 4 },
          { ageGroup: "adult", income: 1500, commuteDistance: 4 },
          { ageGroup: "child", income: 0, commuteDistance: 1 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 25000, commuteDistance: 3 },
          { ageGroup: "adult", income: 58000, commuteDistance: 11 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 2500, commuteDistance: 7 },
          { ageGroup: "child", income: 0, commuteDistance: 4 },
          { ageGroup: "adult", income: 49000, commuteDistance: 8 },
          { ageGroup: "elderly", income: 500, commuteDistance: 2 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 62000, commuteDistance: 16 },
          { ageGroup: "adult", income: 20000, commuteDistance: 1 },
          { ageGroup: "child", income: 0, commuteDistance: 10 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 19000, commuteDistance: 2 },
          { ageGroup: "child", income: 1500, commuteDistance: 3 },
        ],
      },
    ],
  },
  {
    id: "neighborhood_4",
    clientName: "Divergence Drive",
    houses: [
      {
        residents: [
          { ageGroup: "adult", income: 75000, commuteDistance: 2 },
          { ageGroup: "child", income: 0, commuteDistance: 2 },
          { ageGroup: "child", income: 0, commuteDistance: 7 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 55000, commuteDistance: 10 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 20000, commuteDistance: 2 },
          { ageGroup: "elderly", income: 4000, commuteDistance: 1 },
          { ageGroup: "child", income: 0, commuteDistance: 9 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 60000, commuteDistance: 14 },
        ],
      },
    ],
  },
  {
    id: "neighborhood_5",
    clientName: "Turing Town",
    houses: [
      {
        residents: [
          { ageGroup: "adult", income: 53000, commuteDistance: 9 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 23000, commuteDistance: 2 },
          { ageGroup: "child", income: 4000, commuteDistance: 1 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 49000, commuteDistance: 5 },
          { ageGroup: "child", income: 0, commuteDistance: 2 },
          { ageGroup: "child", income: 0, commuteDistance: 3 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 50000, commuteDistance: 11 },
          { ageGroup: "child", income: 4000, commuteDistance: 7 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 19000, commuteDistance: 1 },
          { ageGroup: "child", income: 1000, commuteDistance: 3 },
        ],
      },
    ],
  },
  {
    id: "neighborhood_6",
    clientName: "Gibbs Grove",
    houses: [
      {
        residents: [
          { ageGroup: "child", income: 0, commuteDistance: 1 },
          { ageGroup: "adult", income: 52000, commuteDistance: 13 },
          { ageGroup: "child", income: 3000, commuteDistance: 4 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 35000, commuteDistance: 13 },
          { ageGroup: "adult", income: 3000, commuteDistance: 6 },
          { ageGroup: "child", income: 0, commuteDistance: 17 },
        ],
      },
      {
        residents: [
          { ageGroup: "elderly", income: 25000, commuteDistance: 3 },
          { ageGroup: "child", income: 0, commuteDistance: 1 },
          { ageGroup: "elderly", income: 2000, commuteDistance: 3 },
          { ageGroup: "adult", income: 1000, commuteDistance: 10 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 61000, commuteDistance: 15 },
          { ageGroup: "child", income: 0, commuteDistance: 2 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 61000, commuteDistance: 15 },
          { ageGroup: "child", income: 0, commuteDistance: 2 },
        ],
      },
      {
        residents: [
          { ageGroup: "adult", income: 1500, commuteDistance: 2 },
          { ageGroup: "adult", income: 61000, commuteDistance: 15 },
          { ageGroup: "child", income: 0, commuteDistance: 2 },
          { ageGroup: "child", income: 4000, commuteDistance: 1 },
        ],
      }
    ],
  },
  {
    id: "neighborhood_7",
    clientName: "Hastings Metropolis",
    houses: [
      {
        residents: [
          {ageGroup: "adult", income: 60000, commuteDistance: 12},
          {ageGroup: "adult", income: 4000, commuteDistance: 11},
          {ageGroup: "elderly", income: 8000, commuteDistance: 18}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 22000, commuteDistance: 11},
          {ageGroup: "adult", income: 41500, commuteDistance: 2}
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 35000, commuteDistance: 18},
          {ageGroup: "elderly", income: 40000, commuteDistance: 7},
          {ageGroup: "child", income: 0, commuteDistance: 5}
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 60000, commuteDistance: 12}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 58000, commuteDistance: 18},
          {ageGroup: "elderly", income: 3700, commuteDistance: 10}
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 30500, commuteDistance: 5}
        ]
      }
    ]
  },
  {
    id: "neighborhood_8",
    clientName: "Convex Corner",
    houses: [
      {
        residents: [
          {ageGroup: "adult", income: 58500, commuteDistance: 17},
          {ageGroup: "adult", income: 56000, commuteDistance: 16},
          {ageGroup: "child", income: 500, commuteDistance: 14},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 24500, commuteDistance: 17},
          {ageGroup: "adult", income: 10000, commuteDistance: 0},
          {ageGroup: "child", income: 1000, commuteDistance: 14},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 27000, commuteDistance: 11}
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 60000, commuteDistance: 1}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 3400, commuteDistance: 17},
          {ageGroup: "adult", income: 65000, commuteDistance: 11}
        ]
      },
    ]
  },
  {
    id: "neighborhood_9",
    clientName: "Hessian Heights",
    houses: [
      {
        residents: [
          {ageGroup: "child", income: 0, commuteDistance: 12},
          {ageGroup: "elderly", income: 0, commuteDistance: 20},
          {ageGroup: "adult", income: 0, commuteDistance: 2},
          {ageGroup: "adult", income: 40000, commuteDistance: 11},
          {ageGroup: "elderly", income: 50000, commuteDistance: 7}
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 63000, commuteDistance: 19},
          {ageGroup: "child", income: 3000, commuteDistance: 17},
          {ageGroup: "adult", income: 50000, commuteDistance: 11}
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 36500, commuteDistance: 7},
          {ageGroup: "elderly", income: 10000, commuteDistance: 4},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 75000, commuteDistance: 10},
          {ageGroup: "adult", income: 5000, commuteDistance: 1}
        ]
      }
    ]
  },
  {
    id: "neighborhood_10",
    clientName: "Polynomial Park",
    houses: [
      {
        residents: [
          {ageGroup: "adult", income: 50000, commuteDistance: 12},
          {ageGroup: "elderly", income: 40300, commuteDistance: 11},
          {ageGroup: "child", income: 0, commuteDistance: 4},
          {ageGroup: "child", income: 0, commuteDistance: 1},
          {ageGroup: "elderly", income: 50000, commuteDistance: 2}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 60000, commuteDistance: 17},
          {ageGroup: "adult", income: 5500, commuteDistance: 16},
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 5400, commuteDistance: 19},
          {ageGroup: "adult", income: 70000, commuteDistance: 11},
          {ageGroup: "child", income: 0, commuteDistance: 5},
          {ageGroup: "child", income: 1000, commuteDistance: 1}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 80000, commuteDistance: 10},
          {ageGroup: "child", income: 500, commuteDistance: 3},
          {ageGroup: "adult", income: 20000, commuteDistance: 1}
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 6000, commuteDistance: 17},
          {ageGroup: "elderly", income: 20000, commuteDistance: 11},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 33000, commuteDistance: 12},
          {ageGroup: "child", income: 5000, commuteDistance: 11},
        ]
      }
    ]
  },
  {
    id: "neighborhood_11",
    clientName: "Euler Estates",
    houses: [
      {
        residents: [
          {ageGroup: "adult", income: 50000, commuteDistance: 12},
          {ageGroup: "child", income: 4000, commuteDistance: 1},
          {ageGroup: "elderly", income: 2500, commuteDistance: 2}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 60000, commuteDistance: 17},
          {ageGroup: "adult", income: 38000, commuteDistance: 11},
          {ageGroup: "child", income: 10000, commuteDistance: 4},
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 5400, commuteDistance: 0},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 80000, commuteDistance: 10},
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 6000, commuteDistance: 1},
          {ageGroup: "elderly", income: 20000, commuteDistance: 11},
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 33000, commuteDistance: 12},
          {ageGroup: "child", income: 5000, commuteDistance: 11},
        ]
      }
    ]
  },
  {
    id: "neighborhood_12",
    clientName: "Bayesian Borough",
    houses: [
      {
        residents: [
          {ageGroup: "adult", income: 4000, commuteDistance: 1},
          {ageGroup: "adult", income: 3500, commuteDistance: 12},
          {ageGroup: "child", income: 1000, commuteDistance: 6}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 50000, commuteDistance: 0},
          {ageGroup: "adult", income: 7000, commuteDistance: 2},
        ]
      },
      {
        residents: [
          {ageGroup: "elderly", income: 5400, commuteDistance: 19},
          {ageGroup: "child", income: 25000, commuteDistance: 5},
          {ageGroup: "elderly", income: 60000, commuteDistance: 2}
        ]
      },
      {
        residents: [
          {ageGroup: "adult", income: 90000, commuteDistance: 10},
        ]
      },
      {
        residents: [
          {ageGroup: "child", income: 6000, commuteDistance: 4},
        ]
      }
    ]
  },
  {
    id: "neighborhood_13",
    clientName: "Frequentist Flats",
    "houses": [
      {
        "residents": [
          {"ageGroup": "adult", "income": 32000, "commuteDistance": 3},
          {"ageGroup": "child", "income": 500, "commuteDistance": 0}
        ]
      },
      {
        "residents": [
          {"ageGroup": "elderly", "income": 45000, "commuteDistance": 1}
        ]
      },
      {
        "residents": [
          {"ageGroup": "adult", "income": 61000, "commuteDistance": 15},
          {"ageGroup": "adult", "income": 59000, "commuteDistance": 15}
        ]
      },
      {
        "residents": [
          {"ageGroup": "child", "income": 1200, "commuteDistance": 2},
          {"ageGroup": "elderly", "income": 3500, "commuteDistance": 0},
          {"ageGroup": "adult", "income": 7800, "commuteDistance": 8}
        ]
      }
    ]
  },
  {
    "id": "neighborhood_14",
    "clientName": "Utility Heights",
    "houses": [
      {
        "residents": [
          {"ageGroup": "adult", "income": 42000, "commuteDistance": 6},
          {"ageGroup": "adult", "income": 30000, "commuteDistance": 7}
        ]
      },
      {
        "residents": [
          {"ageGroup": "child", "income": 1500, "commuteDistance": 1},
          {"ageGroup": "child", "income": 1800, "commuteDistance": 0}
        ]
      },
      {
        "residents": [
          {"ageGroup": "elderly", "income": 9000, "commuteDistance": 3},
          {"ageGroup": "child", "income": 1800, "commuteDistance": 11},
          {"ageGroup": "child", "income": 1800, "commuteDistance": 20}
        ]
      },
      {
        "residents": [
          {"ageGroup": "adult", "income": 102000, "commuteDistance": 12},
          {"ageGroup": "adult", "income": 98000, "commuteDistance": 10}
        ]
      },
      {
        "residents": [
          {"ageGroup": "elderly", "income": 37000, "commuteDistance": 0}
        ]
      }
    ]
  }  
];


export function Stage() {
  const player = usePlayer();
  const stage = useStage();
  const game = useGame();
  const { playerCount, networkStruct } = game.get("treatment");
  console.log(stage.get("name"));
  console.log(stage.name);

  useEffect(() => {
    if (!stage.get("tasks")) {
      stage.set("tasks", predefinedTasks);
    }
  }, []); 

  if (stage.get("name") === "ButtonCheck") return <ButtonCheck />;
  if (stage.get("name") === "TimeToBegin") return <TimeToBegin />;

  if (stage.get("name") === "Training") {
    return <Training />;
  } if (stage.get("name") === "Training_Stage1") {
    return <Training_Pooled1 />;
  } if (stage.get("name") === "Training_Stage2") {
    return <Training_Pooled2 />;
  } if (stage.get("name") === "Training_Stage3") {
    return <Training_Pooled3 />;
  }

  if (stage.get("name") == "Discussion") {
    return <ChatStage />;
  }

  const currentTask = player.get("currentTask");

  if (networkStruct == "pooled") {
    return currentTask ? <TaskScreen_Pooled /> : <TaskQueue_Pooled />;
  } else {
    return currentTask ? <TaskScreen /> : <TaskQueue />;
  }
}

