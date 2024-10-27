import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const GameMenu = ({ gameStatus, resetGame, flagCount }) => {
  const [counter, setCounter] = useState(0);
  const [resetTimer, setResetTimer] = useState(true);
  console.log('counter', counter);
  console.log('gameStatus', gameStatus);
  // Define the tick function with useCallback to avoid re-creating it on each render
  const tick = useCallback(() => {
    if (gameStatus === 'notPlaying') {
      setCounter(0);
      setResetTimer(true);
    } else if (gameStatus === 'playing') {
      setCounter((prevCounter) => (resetTimer ? 0 : prevCounter + 1));
      setResetTimer(false);
    } else {
      setResetTimer(true);
    }
  }, [gameStatus, resetTimer]);

  // Start the timer on moeunt and clear it on unmount
  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  return (
    <div>
      <span className="MineSweeper__flagNum">{`${flagCount}`}</span>
      <span className="MineSweeper__face">
        <span
          className={`button ${gameStatus}`}
          role="button"
          onClick={resetGame}
        />
      </span>
      <span className="MineSweeper__time">{counter}</span>
    </div>
  );
};

GameMenu.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
  flagCount: PropTypes.number.isRequired,
};

export default GameMenu;
