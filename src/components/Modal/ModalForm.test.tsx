import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import useOrderMutationQuery from '../../hooks/useOrderMutationQuery';
import { mockInstrumentResponse } from '../../utils/testUtils';
import ModalForm from './ModalForm';

jest.mock('../../hooks/useGetPortfolio', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: [],
    isSuccess: true,
  })),
}));

jest.mock('../../hooks/useOrderMutationQuery', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
}));

describe('<ModalForm />', () => {
  const id = mockInstrumentResponse[0].id;

  it('se envia correctamente el form y se hace la post call', async () => {
    render(<ModalForm id={id} side="BUY" />);

    fireEvent.change(screen.getByLabelText('Cantidad de acciones'), {
      target: { value: '10' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    waitFor(() => {
      expect(useOrderMutationQuery).toHaveBeenCalledWith({
        instrument_id: id,
        side: 'BUY',
        type: 'MARKET',
        quantity: 10,
      });
    });
  });

  it('el boton de enviar se disablea y pone en carga', async () => {
    render(<ModalForm id={id} side="BUY" />);

    fireEvent.change(screen.getByLabelText('Cantidad de acciones'), {
      target: { value: '10' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Cargando')).toBeDisabled();
  });

  it('valido si no pongo la cantidad de acciones a comprar en una orden market', async () => {
    render(<ModalForm id={id} side="BUY" />);

    fireEvent.change(screen.getByLabelText('Cantidad de acciones'), {
      target: { value: '0' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Debes comprar/vender como mínimo 1 acción.'),
    ).toBeInTheDocument();
  });

  it('valido si no pongo el precio a comprar en una orden limit', async () => {
    render(<ModalForm id={id} side="BUY" />);

    fireEvent.change(screen.getByLabelText('Tipo de Orden'), {
      target: { value: 'LIMIT' },
    });

    fireEvent.change(screen.getByLabelText('Precio'), {
      target: { value: '0' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('El precio es obligatorio para órdenes con límite.'),
    ).toBeInTheDocument();
  });

  it('valido si pongo fracciones de accion en la cantidad a comprar', async () => {
    render(<ModalForm id={id} side="BUY" />);

    fireEvent.change(screen.getByLabelText('Cantidad de acciones'), {
      target: { value: '1.5' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Las acciones no pueden ser fraccionadas.'),
    ).toBeInTheDocument();
  });
});
