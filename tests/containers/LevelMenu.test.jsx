import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  Container as LevelMenuContainer,
  mapStateToProps,
} from '../../src/containers/LevelMenu'; // Make sure the import path is correct
import { RESET_BOARD } from '../../src/actions/boardActions';
import Levels from '../../src/reducers/Levels';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('LevelMenu Container', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      board: {
        // Mock your initial state of the board here if needed
      },
    });
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

  // it("maps state to props correctly", () => {
  //   const state = {
  //     board: {
  //       // Mock board state
  //     },
  //   };
  //
  //   const expectedProps = {
  //     gameLevels: Object.keys(Levels()).map((id) => ({ id, name: Levels()[id].name })),
  //     activeLevel: expect.any(String), // You can set this to a specific value based on your logic
  //   };
  //
  //   expect(mapStateToProps(state)).toEqual(expectedProps);
  // });
});
