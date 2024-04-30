import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { wrapper } from '../../utils/testUtils';
import InstrumentsRow from './InstrumentsRow';

describe('<InstrumentRow />', () => {
  const mockinstrument = {
    id: 26,
    ticker: 'ARS',
    name: 'Pesos',
    type: 'MONEDA',
    last_price: 1,
    close_price: 1,
  };

  it('mostrar datos del row correctamente', () => {
    render(<InstrumentsRow number={0} instrument={mockinstrument} />, {
      wrapper,
    });

    expect(screen.getByText('ARS')).toBeInTheDocument();
    expect(screen.getByText('ARS 1')).toBeInTheDocument();
    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });

  it('al hacer click en Comprar abrir modal', async () => {
    render(<InstrumentsRow number={0} instrument={mockinstrument} />, {
      wrapper,
    });

    fireEvent.click(screen.getByText('Comprar'));

    waitFor(() => {
      expect(screen.getByText('Tipo de Operacion')).toBeInTheDocument();
      expect(
        screen.getByRole('select', { name: 'Compra' }),
      ).toBeInTheDocument();
    });
  });
});
