import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cell from '../../src/components/Cell';

describe('Cell Component', () => {
  const baseProps = {
    id: '0,0',
    count: 1,
    hasMine: false,
    isOpen: false,
    hasFlag: false,
    onOpen: vi.fn(),
    onFlagToggle: vi.fn(),
  };

  it('renders ClosedCell when cell is not open and does not have a flag', () => {
    const { container } = render(<Cell {...baseProps} />);
    expect(container.querySelector('.Cell__cover')).toBeInTheDocument();
  });

  it('renders FlagCell when cell has a flag but is not open', () => {
    const { container } = render(<Cell {...baseProps} hasFlag={true} />);
    expect(container.querySelector('.Cell__flag')).toBeInTheDocument();
  });

  it('renders OpenCell with count when cell is open and does not have a mine', () => {
    const { getByText } = render(<Cell {...baseProps} isOpen={true} />);
    expect(getByText('1')).toBeInTheDocument();
  });

  it('renders OpenCell with bomb icon when cell is open and has a mine', () => {
    const { container } = render(
      <Cell {...baseProps} isOpen={true} hasMine={true} />
    );
    expect(container.querySelector('.Cell__bomb')).toBeInTheDocument();
  });

  it('calls onOpen with correct id when cell is clicked', () => {
    const { getByRole } = render(<Cell {...baseProps} />);
    fireEvent.click(getByRole('cell'));
    expect(baseProps.onOpen).toHaveBeenCalledWith('0,0');
  });

  it('calls onFlagToggle with correct id when right-clicked', () => {
    const { getByRole } = render(<Cell {...baseProps} />);
    fireEvent.contextMenu(getByRole('cell'));
    expect(baseProps.onFlagToggle).toHaveBeenCalledWith('0,0');
  });
});
