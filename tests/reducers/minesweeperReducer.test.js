import { it, expect } from 'vitest';
import minesweeperReducer from '/src/reducers/minesweeperReducer';

it('defines a board', () => {
  const initialState = minesweeperReducer();
  expect(initialState.board).toBeDefined();
});
