# Collaborative Redundancy

Materials for the multiplayer census-task experiment (N = 841 participants, 189 teams
of 3-6) and simulations reported in "Redundancy Protects Human Collaborations from Failure"
(Mieczkowski, Dubey, Vélez, & Griffiths, 2026).

## Contents

- `task_code/` — the two Empirica app builds used to run the study.
  - `faults_condition/` — app used for the fault condition (participants experience
    randomly timed 60-second outages).
  - `no_faults_condition/` — app used for the no-fault condition.
  - Each contains a `client/` (React/Vite front end) and `server/` (Empirica callbacks)
    directory. `node_modules/` is not included — run `npm install` in `client/` and
    `server/` to restore dependencies (see `package.json` in each for versions).
  - `.empirica/empirica.toml` in each has had its auth token and admin password
    redacted (`REDACTED_FOR_PUBLIC_RELEASE`); regenerate your own via
    `empirica create` if you need to run the app locally.
- `data/` — raw Empirica session exports for all six data-collection batches
  (`Faults_1`-`Faults_4`, `NoFaults_1`, `NoFaults_2`), one CSV per Empirica data
  scope (`batch`, `game`, `global`, `player`, `playerGame`, `playerRound`,
  `playerStage`, `round`, `stage`).
  - The `participantIdentifier` column (the participant's Prolific ID) has been
    removed from every `player.csv` for participant privacy. The remaining
    `participantID` column is Empirica's own internal session identifier and is
    unrelated to Prolific.
  - `exp1_team_summary.csv` / `exp1_responses_long.csv` are derived, team-level and
    response-level tables produced by `analysis/Experiment1Analysis.ipynb`.
- `simulations/` — the queueing-theoretic simulations (generalist vs. specialist,
  M/M/c vs. parallel M/M/c queues) reported in the Results, plus the scripts used to
  generate the census-task stimuli (`generate_neighborhoods.py`,
  `generated_tasks.js`) and stimulus role-allocation logic (`GenerateStimuli.ipynb`).
- `analysis/Experiment1Analysis.ipynb` — the full analysis pipeline: data loading,
  the preregistered factorial OLS/ANOVA (fault condition x team size x team
  structure), and the reported effect sizes. Runs end-to-end from a fresh kernel
  against the CSVs in `data/`.

## Reproducing the analysis

```
cd analysis
jupyter nbconvert --to notebook --execute --inplace Experiment1Analysis.ipynb
```

## Data dictionary notes

Each data-collection batch was exported directly from Empirica and contains one CSV
per data scope. Key identifiers for joining across files:
- `id` columns are Empirica-generated session/entity IDs (ULIDs), not linked to any
  external participant identity.
- `team_id` in the analysis notebook's output tables is a stable hash derived from
  the set of Empirica player IDs on a team (see `preprocess()` in the analysis
  notebook), not a raw participant identifier.

## License

MIT — see [LICENSE](LICENSE).
