/*
Given a number of cargo boxes with set weight and a maximum weight a truck can carry 
return a minimum amount of trucks needed to deliver all boxes

Example: cargo: [20,20,20], target: 20, result: [[20],[20],[20]]

Example: cargo: [50,40,30,20,15,15,15,15], target: 100, result: [[50,30,20],[40,15,15,15,15]]
*/

interface CargoSet {
  weight: number;
  set: number[];
  remains: number[];
}

export default function trucksLoad(
  cargo: number[],
  target: number
): number[][] {
  const result: number[][] = [];
  // creating sorted stack
  let stack: number[] = cargo.sort((a, b) => a - b);

  while (stack.length > 0) {
    // finding closest to target value starting with the biggest number
    const biggestValue = stack.pop() as number;
    if (biggestValue > target) throw "Incorrect array value";
    let currentMax: CargoSet = {
      weight: biggestValue,
      set: [biggestValue],
      remains: [...stack],
    };

    // skipping the rest of logic if biggest value already equals target
    if (currentMax.weight < target) {
      for (let i = stack.length - 1; i >= 0; i--) {
        const currentStack = stack.slice(0, i + 1);

        const current: CargoSet = {
          weight: biggestValue,
          set: [biggestValue],
          remains: stack.slice(i + 1).reverse(), // reversing sliced remains to keep order when pushing in new items
        };

        while (currentStack.length > 0 && current.weight < target) {
          const cargoItem = currentStack.pop() as number;
          // check if single cargo item exceeds target
          if (cargoItem > target) throw "Incorrect array value";

          if (current.weight + cargoItem <= target) {
            current.set.push(cargoItem);
            current.weight += cargoItem;
          } else {
            current.remains.push(cargoItem);
          }
        }

        // because we are pushing elements in remains it needs to be reversed to stay sorted
        // combining with current stack in case of premature loop exit when target value is met
        current.remains = currentStack.concat(current.remains.reverse());

        // if found max target combination exiting loop
        if (current.weight === target) {
          currentMax = current;
          break;
        }

        // comparing branch results with current max
        if (current.weight > currentMax.weight) {
          currentMax = current;
        }
      }
    }

    result.push(currentMax.set);
    stack = currentMax.remains;
  }

  return result;
}
