import React from 'react';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import useGetPortfolio from '../../hooks/useGetPortfolio';
import { mockPortfolioResponse, wrapper } from '../../utils/testUtils';
import PortfolioTable from '.';

jest.mock('../../hooks/useGetPortfolio');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('<PortfolioTable />', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue('');
  });

  it('mostrar mensaje cuando no hay datos en portfolio', () => {
    (useGetPortfolio as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    render(<PortfolioTable />, { wrapper });

    expect(
      screen.getByText('No tienes acciones en tu portfolio.'),
    ).toBeInTheDocument();
  });

  it('mostrar mensaje de carga', () => {
    (useGetPortfolio as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    render(<PortfolioTable />, { wrapper });

    expect(screen.getByText('Cargando datos')).toBeInTheDocument();
  });

  it('mostrar la tabla con sus respectivos valores correctamente', () => {
    (useGetPortfolio as jest.Mock).mockReturnValue({
      data: mockPortfolioResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<PortfolioTable />, { wrapper });

    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Valor de mercado')).toBeInTheDocument();
    expect(screen.getByText('Ganancia')).toBeInTheDocument();
    expect(screen.getByText('Ticker')).toBeInTheDocument();
    expect(screen.getByText('Rendimiento')).toBeInTheDocument();
    expect(screen.getByText('MIRG')).toBeInTheDocument();
  });

  it('mostrar que no hay resultados para la busqueda', () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue('foo');
    (useGetPortfolio as jest.Mock).mockReturnValue({
      data: mockPortfolioResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<PortfolioTable />, { wrapper });

    expect(
      screen.getByText('No existen acciones para la busqueda foo'),
    ).toBeInTheDocument();
  });

  it('mostrar resultados filtrados por busqueda', () => {
    const mockSearchVal = 'CELU';
    jest.spyOn(Redux, 'useSelector').mockReturnValue(mockSearchVal);
    (useGetPortfolio as jest.Mock).mockReturnValue({
      data: mockPortfolioResponse,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<PortfolioTable />, { wrapper });

    const mockSearchResult = screen.getAllByText(mockSearchVal)[0];

    expect(mockSearchResult).toBeInTheDocument();
    expect(screen.queryByText('MING')).not.toBeInTheDocument();
  });
});
