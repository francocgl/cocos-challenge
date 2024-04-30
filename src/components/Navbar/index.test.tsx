import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { wrapper } from '../../utils/testUtils';
import Navbar from './index';

describe('<Navbar />', () => {
  const setComponentStateMock = jest.fn();
  it('debe renderizar el componente correctamente', () => {
    render(
      <Navbar
        componentState="instruments"
        setComponentState={setComponentStateMock}
      />,
      { wrapper },
    );

    expect(screen.getByText('Instrumentos')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('debe cambiar de estado al hacer click', () => {
    render(
      <Navbar
        componentState="instruments"
        setComponentState={setComponentStateMock}
      />,
      { wrapper },
    );

    fireEvent.click(screen.getByText('Portfolio'));

    expect(setComponentStateMock).toHaveBeenCalledWith('portfolio');
  });
});
