import {
  emptyBoard, hasLost, hasWon, resetBoard, open, toggleFlag
} from "/src/reducers/BoardHelpers";
import { describe, it, expect, beforeEach } from "vitest";

const boardFixture = {
  "0,0": { hasMine: true, hasFlag: false, isOpen: false },
  "0,1": { hasMine: false, hasFlag: false, isOpen: false },
  "1,0": { hasMine: false, hasFlag: false, isOpen: false },
  "1,1": { hasMine: false, hasFlag: false, isOpen: false }
};

describe("BoardHelpers", () => {
  describe("hasLost", () => {
    it("returns false when you haven't lost", () => {
      expect(hasLost(boardFixture)).toBeFalsy();
    });

    it("returns true when you lose", () => {
      const lostBoard = { ...boardFixture, "0,0": { hasMine: true, hasFlag: false, isOpen: true } };
      expect(hasLost(lostBoard)).toBeTruthy();
    });
  });

  describe("hasWon", () => {
    it("returns false when you haven't won", () => {
      expect(hasWon(boardFixture)).toBeFalsy();
    });

    it("returns true when you win", () => {
      const wonBoard = {
        "0,0": { hasMine: true, hasFlag: true, isOpen: false },
        "0,1": { hasMine: false, hasFlag: false, isOpen: true },
        "1,0": { hasMine: true, hasFlag: true, isOpen: false },
        "1,1": { hasMine: false, hasFlag: false, isOpen: true }
      };
      expect(hasWon(wonBoard)).toBeTruthy();
    });
  });

  describe("emptyBoard()", () => {
    it("builds an object with 9x9 (81 keys)", () => {
      const board = emptyBoard(9);
      expect(Object.keys(board)).toHaveLength(81);
      expect(board["3,3"]).toBeDefined();
      expect(board["18,18"]).not.toBeDefined();
    });

    it("sets the properties of each cell", () => {
      expect(Object.keys(emptyBoard(9)["3,3"])).toEqual(["hasMine", "hasFlag", "isOpen", "count", "id"]);
    });
  });

  describe("resetBoard", () => {
    let board;
    beforeEach(() => {
      board = resetBoard(3, ["1,1", "2,2"]);
    });

    it("sets correct true hasMine values", () => {
      expect(board["1,1"].hasMine).toBe(true);
      expect(board["2,2"].hasMine).toBe(true);
    });

    it("sets correct false hasMine values", () => {
      expect(board["0,0"].hasMine).toBe(false);
      expect(board["1,0"].hasMine).toBe(false);
    });
  });

  describe("flag and open actions", () => {
    let board;
    const boardSize = 3;
    const mineLocations = ["1,1", "2,2"];

    describe("open", () => {
      it("sets isOpen when default", () => {
        board = resetBoard(boardSize, mineLocations);
        const newBoard = open(board, "0,1");
        expect(newBoard["0,1"].isOpen).toBe(true);
      });

      it("does not set isOpen if hasFlag is true", () => {
        board = resetBoard(boardSize, mineLocations);
        board["0,1"].hasFlag = true;
        const newBoard = open(board, "0,1");
        expect(newBoard["0,1"].isOpen).toBe(false);
        expect(newBoard["0,1"].hasFlag).toBe(true);
      });
    });

    describe("flag", () => {
      it("sets hasFlag when false", () => {
        board = resetBoard(boardSize, mineLocations);
        board["0,1"].hasFlag = false;
        const newBoard = toggleFlag(board, "0,1");
        expect(newBoard["0,1"].hasFlag).toBe(true);
      });

      it("removes hasFlag when true", () => {
        board = resetBoard(boardSize, mineLocations);
        board["0,1"].hasFlag = true;
        const newBoard = toggleFlag(board, "0,1");
        expect(newBoard["0,1"].hasFlag).toBe(false);
      });
    });
  });

  describe("openAround", () => {
    let board;
    const boardSize = 5;
    const mineLocations = ["1,3", "3,3"];

    beforeEach(() => {
      board = resetBoard(boardSize, mineLocations);
    });

    it("opens cells around zero cell", () => {
      const newBoard = open(board, "1,1");
      expect(newBoard["1,1"].isOpen).toBe(true);
      expect(newBoard["0,0"].isOpen).toBe(true);
      expect(newBoard["0,1"].isOpen).toBe(true);
      expect(newBoard["0,2"].isOpen).toBe(true);
      expect(newBoard["1,0"].isOpen).toBe(true);
      expect(newBoard["1,2"].isOpen).toBe(true);
      expect(newBoard["2,0"].isOpen).toBe(true);
      expect(newBoard["2,1"].isOpen).toBe(true);
      expect(newBoard["2,2"].isOpen).toBe(true);
    });
  });
});