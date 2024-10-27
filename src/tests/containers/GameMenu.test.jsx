import React from 'react';
import { describe, it, expect } from 'vitest';
import { mapStateToProps } from '../../containers/GameMenu'; // Adjust import based on your project structure

describe('mapStateToProps', () => {
  it('is defined', () => {
    expect(mapStateToProps).toBeDefined();
  });

  describe('when no cells are open and no flags', () => {
    const cell = { hasFlag: false, isOpen: false, hasMine: false };
    const board = {
      '0,0': cell,
      '0,1': cell,
      '1,0': cell,
      '1,1': cell,
    };

    it("returns gameStatus 'notPlaying' and flagCount 0", () => {
      const props = mapStateToProps({ board });
      expect(props.gameStatus).toEqual('notPlaying');
      expect(props.flagCount).toEqual(0);
    });
  });

  describe('when cells are open and no flags', () => {
    const cell = { hasFlag: false, isOpen: false, hasMine: false };
    const board = {
      '0,0': cell,
      '0,1': cell,
      '1,0': cell,
      '1,1': { hasFlag: false, isOpen: true, hasMine: false },
    };

    it("returns gameStatus 'playing' and flagCount 0", () => {
      const props = mapStateToProps({ board });
      expect(props.gameStatus).toEqual('playing');
      expect(props.flagCount).toEqual(0);
    });
  });

  describe('when a cell is flagged', () => {
    const cell = { hasFlag: false, isOpen: false, hasMine: false };
    const board = {
      '0,0': cell,
      '0,1': cell,
      '1,0': cell,
      '1,1': { hasFlag: true, isOpen: false, hasMine: true },
    };

    it("returns gameStatus 'playing' and flagCount 1", () => {
      const props = mapStateToProps({ board });
      expect(props.gameStatus).toEqual('playing');
      expect(props.flagCount).toEqual(1);
    });
  });

  describe('when lost', () => {
    const cell = { hasFlag: false, isOpen: false, hasMine: false };
    const board = {
      '0,0': cell,
      '0,1': cell,
      '1,0': cell,
      '1,1': { hasFlag: false, isOpen: true, hasMine: true },
    };

    it("returns gameStatus 'loser'", () => {
      const props = mapStateToProps({ board });
      expect(props.gameStatus).toEqual('loser');
      expect(props.flagCount).toEqual(0);
    });
  });

  describe('when won with 1 flagged mine', () => {
    const cell = { hasFlag: false, isOpen: true, hasMine: false };
    const board = {
      '0,0': cell,
      '0,1': cell,
      '1,0': cell,
      '1,1': { hasFlag: true, isOpen: false, hasMine: true },
    };

    it("returns gameStatus 'winner' and flagCount 1", () => {
      const props = mapStateToProps({ board });
      expect(props.gameStatus).toEqual('winner');
      expect(props.flagCount).toEqual(1);
    });
  });
});
