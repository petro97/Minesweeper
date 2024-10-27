import { mineLocationsFor } from "../../src/reducers/Levels.js";
import { describe, it, expect } from "vitest";

describe("mineLocationsFor", () => {
  const levels = [
    { level: "BEGINNER", expectedLength: 10 },
    { level: "INTERMEDIATE", expectedLength: 40 },
    { level: "EXPERT", expectedLength: 99 }
  ];

  levels.forEach(({ level, expectedLength }) => {
    it(`returns correct number of mines for ${level}`, () => {
      expect(mineLocationsFor(level)).toHaveLength(expectedLength);
    });
  });
});
