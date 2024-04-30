import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { wrapper } from '../../utils/testUtils';
import PortfolioRow from './PortfolioRow';

describe('<PortfolioRow />', () => {
  const mockPosition = {
    instrument_id: 5,
    ticker: 'MIRG',
    quantity: 2,
    last_price: 40.88,
    close_price: 37.74,
    avg_cost_price: 74.17,
  };

  it('mostrar datos del row correctamente', () => {
    render(<PortfolioRow number={0} position={mockPosition} />, { wrapper });

    expect(screen.getByText('MIRG')).toBeInTheDocument();
    expect(screen.getByText('ARS 81,76')).toBeInTheDocument();
    expect(screen.getByText('-44.88%')).toBeInTheDocument();
  });

  it('al hacer click en Comprar abrir modal', async () => {
    render(<PortfolioRow number={0} position={mockPosition} />, { wrapper });

    fireEvent.click(screen.getByText('Comprar'));

    waitFor(() => {
      expect(screen.getByText('Tipo de Operacion')).toBeInTheDocument();
      expect(
        screen.getByRole('select', { name: 'Compra' }),
      ).toBeInTheDocument();
    });
  });

  it('al hacer click en Vender abrir modal', () => {
    render(<PortfolioRow number={0} position={mockPosition} />, { wrapper });

    fireEvent.click(screen.getByText('Comprar'));
    waitFor(() => {
      expect(screen.getByText('Tipo de Operacion')).toBeInTheDocument();
      expect(screen.getByRole('select', { name: 'Venta' })).toBeInTheDocument();
    });
  });
});
