import React from 'react';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import useGetInstruments from '../../hooks/useGetInstruments';
import { mockInstrumentResponse, wrapper } from '../../utils/testUtils';
import InstrumentsTable from '.';

jest.mock('../../hooks/useGetInstruments');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('<InstrumentsTable />', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue('');
  });

  it('mostrar mensaje cuando no hay datos en portfolio', () => {
    (useGetInstruments as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    render(<InstrumentsTable />, { wrapper });

    expect(
      screen.getByText('No hay instrumentos disponibles.'),
    ).toBeInTheDocument();
  });

  it('mostrar mensaje de carga', () => {
    (useGetInstruments as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    render(<InstrumentsTable />, { wrapper });

    expect(screen.getByText('Cargando datos')).toBeInTheDocument();
  });

  it('mostrar la tabla con sus respectivos valores correctamente', () => {
    (useGetInstruments as jest.Mock).mockReturnValue({
      data: mockInstrumentResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<InstrumentsTable />, { wrapper });

    expect(screen.getByText('Ticker')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Último Precio')).toBeInTheDocument();
    expect(screen.getByText('Retorno')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
    expect(screen.getByText('MOLA')).toBeInTheDocument();
  });

  it('mostrar que no hay resultados para la busqueda', () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue('foo');
    (useGetInstruments as jest.Mock).mockReturnValue({
      data: mockInstrumentResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<InstrumentsTable />, { wrapper });

    expect(
      screen.getByText('No existen instrumentos para la busqueda foo.'),
    ).toBeInTheDocument();
  });

  it('mostrar resultados filtrados por busqueda', () => {
    const mockSearchVal = 'MOLA';
    jest.spyOn(Redux, 'useSelector').mockReturnValue(mockSearchVal);
    (useGetInstruments as jest.Mock).mockReturnValue({
      data: mockInstrumentResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<InstrumentsTable />, { wrapper });

    const mockSearchResult = screen.getAllByText(mockSearchVal)[0];

    expect(mockSearchResult).toBeInTheDocument();
    expect(screen.queryByText('MING')).not.toBeInTheDocument();
  });
});
