import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Board from '../../components/Board.jsx';

describe('Board Component', () => {
  const mockTable = [
    [{ id: '0-0' }, { id: '0-1' }],
    [{ id: '1-0' }, { id: '1-1' }],
  ];
  const mockLevel = 'BEGINNER';

  it('renders without crashing', () => {
    render(<Board table={mockTable} activeLevel={mockLevel} />);
  });

  it('renders LevelMenu and GameMenu components', () => {
    const { container } = render(
      <Board table={mockTable} activeLevel={mockLevel} />
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('applies the correct activeLevel class', () => {
    const { container } = render(
      <Board table={mockTable} activeLevel={mockLevel} />
    );
    const boardDiv = container.querySelector('.MineSweeper');
    expect(boardDiv).toHaveClass('BEGINNER');
  });

  it('renders a table with the correct structure and cells', () => {
    const { container } = render(
      <Board table={mockTable} activeLevel={mockLevel} />
    );
    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(2);

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      expect(cells).toHaveLength(2);
    });
  });
});
