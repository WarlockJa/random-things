import { it, expect, describe } from "vitest";
import trucksLoad from "./trucksLoad";

describe("optimistic tests", () => {
  it("should accept cargo [20,20,20] with target 20 and return [[20],[20],[20]]", () => {
    const cargo = [20, 20, 20];
    const target = 20;
    const expectedResult = [[20], [20], [20]];
    expect(trucksLoad(cargo, target)).toStrictEqual(expectedResult);
  });

  it("should accept cargo [19,20,18] with target 20 and return [[20],[19],[18]]", () => {
    const cargo = [19, 20, 18];
    const target = 20;
    const expectedResult = [[20], [19], [18]];
    expect(trucksLoad(cargo, target)).toStrictEqual(expectedResult);
  });

  it("should accept cargo [4,5,6,7,8,1,2,3,9] with target 20 and return [[9,8,3],[7,6,5,2],[4,1]]", () => {
    const cargo = [4, 5, 6, 7, 8, 1, 2, 3, 9];
    const target = 20;
    const expectedResult = [
      [9, 8, 3],
      [7, 6, 5, 2],
      [4, 1],
    ];
    expect(trucksLoad(cargo, target)).toStrictEqual(expectedResult);
  });

  it("should accept cargo [4,5,6,7,8,1,2,3,9,15] with target 20 and return [[15,5],[9,8,3],[7,6,4,2,1]]", () => {
    const cargo = [4, 5, 6, 7, 8, 1, 2, 3, 9, 15];
    const target = 20;
    const expectedResult = [
      [15, 5],
      [9, 8, 3],
      [7, 6, 4, 2, 1],
    ];
    expect(trucksLoad(cargo, target)).toStrictEqual(expectedResult);
  });

  it("should accept cargo [50,40,30,20,15,15,15,15] with target 100 and return [[50,30,20],[40,15,15,15,15]]", () => {
    const cargo = [50, 40, 30, 20, 15, 15, 15, 15];
    const target = 100;
    const expectedResult = [
      [50, 30, 20],
      [40, 15, 15, 15, 15],
    ];
    expect(trucksLoad(cargo, target)).toStrictEqual(expectedResult);
  });
});
