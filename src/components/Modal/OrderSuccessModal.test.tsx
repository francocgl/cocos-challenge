import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { wrapper } from '../../utils/testUtils';
import OrderSuccessModal from './OrderSuccessModal';
import { ORDER, SIDE, STATUS } from '../../const/config';

describe('<OrderSuccessModal />', () => {
  const mockOrder = {
    instrument_id: 3,
    side: SIDE.BUY,
    type: ORDER.MARKET,
    quantity: 123,
    id: 930804,
    price: 31.95,
    status: STATUS.FILLED,
  };
  const mockOrderNumber = `Orden Nro 930804`;

  it('debe renderizar todos los campos de la orden', () => {
    render(<OrderSuccessModal order={mockOrder} />, { wrapper });

    expect(screen.getByText(mockOrderNumber)).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText(ORDER.MARKET)).toBeInTheDocument();
    expect(screen.getByText('Operacion')).toBeInTheDocument();
    expect(screen.getByText(SIDE.BUY)).toBeInTheDocument();
    expect(screen.getByText('Precio ejecutado')).toBeInTheDocument();
    expect(screen.getByText('ARS 31,95')).toBeInTheDocument();
    expect(screen.getByText('Cantidad de acciones')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText(STATUS.FILLED)).toBeInTheDocument();
  });

  it('debe cerrarse el modal al aceptar', async () => {
    render(<OrderSuccessModal order={mockOrder} />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));

    waitFor(() => {
      expect(screen.queryByText(mockOrderNumber)).not.toBeInTheDocument();
    });
  });
});
