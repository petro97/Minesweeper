import { describe, it, expect } from 'vitest';
import { mapStateToProps } from '../../src/containers/Board.js';

describe('mapStateToProps', () => {
  const cell = {
    hasMine: false,
    hasFlag: false,
    isOpen: false,
    count: 0,
  };

  const board = {
    '0,0': cell,
    '0,1': cell,
    '1,0': cell,
    '1,1': cell,
  };

  it('is defined', () => {
    expect(mapStateToProps).toBeDefined();
  });

  it('returns a structured table from board state', () => {
    const props = mapStateToProps({ board });

    expect(props.table).toBeDefined();
    expect(props.table[0]).toBeDefined();
    expect(props.table[0][0]).toBeDefined();
    expect(props.table[0][0]).toEqual(cell);
    expect(props.table[0][1]).toEqual(cell);
    expect(props.table[1][0]).toEqual(cell);
    expect(props.table[1][1]).toEqual(cell);
  });
});
