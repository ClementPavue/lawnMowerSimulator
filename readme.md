# Lawn Mower Simulation

This is a TypeScript-based simulation for controlling an automatic lawn mower over a rectangular grid. The mower can rotate and move forward based on given commands and is constrained within a defined lawn area.

## Features
	•	Simulate mowers navigating a rectangular grid.
	•	Commands for the mower: L (rotate left), R (rotate right), F (move forward).
	•	Handles multiple mowers with sequential command execution.
	•	Validates movement and prevents out-of-bounds actions.

## Getting Started

Follow the instructions below to set up and run the project locally.

## Prerequisites
	•	Node.js (version 22 or later)
	•	npm (Node package manager)


## Installation

1.	Clone the repository:
``` sh
git clone https://github.com/ClementPavue/lawnMowerSimulator
cd lawn-mower-simulation
```

2.	Install the dependencies:
``` sh
npm install
```

3. Build and run project

This command will build and execute the instructions given in the technical test
``` sh
npm run release
```

To execute a custom instruction file

``` sh
npm run release your_file
```

Alternatively if the project is already built you can execute it with

``` sh
npm run start:release
```

## Execute the tests

``` sh
npm run test
```

Test will be be execute and the code coverage will be prompted
