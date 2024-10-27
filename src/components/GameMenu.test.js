import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameMenu from './GameMenu.jsx';

describe('GameMenu Component', () => {
  const baseProps = {
    gameStatus: 'notPlaying',
    resetGame: vi.fn(),
    flagCount: 0,
  };

  beforeEach(() => {
    vi.useFakeTimers(); // Set up fake timers to control the interval
  });

  afterEach(() => {
    vi.useRealTimers(); // Clean up timers after each test
  });

  it('renders flag count and timer elements', () => {
    const { getByText, container } = render(<GameMenu {...baseProps} />);
    expect(getByText('0')).toBeInTheDocument(); // flag count
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '0'
    ); // timer starts at 0
  });

  it("resets timer when gameStatus is 'notPlaying'", () => {
    const { container, rerender } = render(
      <GameMenu {...baseProps} gameStatus="playing" />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '3'
    );

    rerender(<GameMenu {...baseProps} gameStatus="notPlaying" />);
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '0'
    );
  });

  it("increments timer every second when gameStatus is 'playing'", () => {
    const { container } = render(
      <GameMenu {...baseProps} gameStatus="playing" />
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '5'
    );
  });

  it("pauses timer when gameStatus is 'winner' or 'loser'", () => {
    const { container, rerender } = render(
      <GameMenu {...baseProps} gameStatus="playing" />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '3'
    );

    rerender(<GameMenu {...baseProps} gameStatus="winner" />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '3'
    );

    rerender(<GameMenu {...baseProps} gameStatus="loser" />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(container.querySelector('.MineSweeper__time')).toHaveTextContent(
      '3'
    );
  });

  it('calls resetGame function on button click', () => {
    const { getByRole } = render(<GameMenu {...baseProps} />);
    const button = getByRole('button');

    fireEvent.click(button);
    expect(baseProps.resetGame).toHaveBeenCalled();
  });
});
