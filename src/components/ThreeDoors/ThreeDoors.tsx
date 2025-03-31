/*
    This is a simulation calculation for a Three Doors problem:
    You are presented with three doors where one hides a prize and two others are empty
    As you choose a door, the host opens up an empty door that you didn't choose and offers
    for you to change your original selection to the door still closed.
    Changing your original door to the remaining closed increases your success probability to 66.6%

    component displays a number of successful tries out of 100
*/
import { useState } from "react";

const DOORS_NUMBER = 3;
const TRIES = 100;

const pickRandomDoor = (number: number) => Math.floor(Math.random() * number);

// generating a list of three doors problem
const generateThreeDoors = () => {
  const randomIndex = pickRandomDoor(DOORS_NUMBER);
  const doors = Array.from({ length: DOORS_NUMBER }).fill(false);
  doors[randomIndex] = true;
  return doors;
};

const calculateProbability = (): number => {
  let successfulDoors = 0;
  for (let index = 0; index < TRIES; index++) {
    // initial doors array filled with two false and a single true
    const doorsInit = generateThreeDoors();
    // console.log("Init Doors: ", doorsInit);
    // picking a random door
    const doorPickedFirst = pickRandomDoor(DOORS_NUMBER);
    // console.log("picked door index: ", doorPickedFirst);
    // finding index of the door that is false and not doorPickedFirst
    const doorToEliminate = doorsInit.findIndex(
      (door, index) => !door && index !== doorPickedFirst
    );
    // console.log("door to eliminate: ", doorToEliminate);
    // eliminating found false door
    const newDoors = doorsInit.map((door, index) =>
      index !== doorToEliminate ? door : "open"
    );
    // console.log("new doors: ", newDoors);

    const newPickedDoor = newDoors.find(
      (door, index) => door !== "open" && index !== doorPickedFirst
    );

    if (newPickedDoor) successfulDoors++;
    // console.log("new picked door: ", newPickedDoor);
  }
  return successfulDoors;
};

export default function ThreeDoors() {
  const [result, setResult] = useState(0);

  return (
    <div style={{ border: "1px solid white", borderRadius: "8px" }}>
      <h2>Three Doors Problem</h2>
      <button onClick={() => setResult(calculateProbability())}>
        Calculate Probability
      </button>
      <p>{result}</p>
    </div>
  );
}
