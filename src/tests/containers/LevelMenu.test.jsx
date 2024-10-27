import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import {
  // Container as LevelMenuContainer,
  // mapStateToProps,
// } from '../../containers/LevelMenu.js'; // Make sure the import path is correct
import { RESET_BOARD } from '../../actions/boardActions.js';
import Levels from '../../reducers/Levels.js';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LevelMenuContainer, {mapStateToProps} from '../../containers/LevelMenu.js';
import * as BoardHelpers from '../../reducers/BoardHelpers'; // Adjust the path if necessary

vi.mock('../reducers/BoardHelpers'); // Mock the BoardHelpers module
const middlewares = [];
const mockStore = configureMockStore(middlewares);
vi.mock('../../reducers/BoardHelpers', () => ({
  currentGameLevelId: vi.fn(), // Create a mock function
}));
describe('LevelMenu Container', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      board: {
        // Mock your initial state of the board here if needed
      },
    });
    vi.clearAllMocks();
  });


  it('renders LevelMenu with correct props', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LevelMenuContainer />
      </Provider>
    );

    // Check for the presence of level names
    const levelNames = Object.values(Levels()).map((level) => level.name);
    levelNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  it("maps state to props correctly", () => {
    const state = {
      board: {
        // Mock the board state as needed
        currentLevelId: "level1", // Example value
      },
    };

    const expectedProps = {
      gameLevels: Object.keys(Levels()).map((id) => ({ id, name: Levels()[id].name })),
      activeLevel: "level1", // Expected active level
    };

    // Set the mock implementation of currentGameLevelId
    BoardHelpers.currentGameLevelId.mockReturnValue("level1");

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
