import React, { useMemo, type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import useGetPortfolio from '../../hooks/useGetPortfolio';
import { GetPortfolioResponse } from '../../types/queryResponse';
import { RootState } from '../../redux/store';
import { MessageWrapper, Table } from '../common';
import PortfolioRow from './PortfolioRow';

const PortfolioTable = (): ReactElement => {
  const { data: portfolio, isLoading, isSuccess, error } = useGetPortfolio();
  const filterTickers = useSelector(
    (state: RootState) => state.filter.filterTickers,
  );

  const filteredInstruments = useMemo(() => {
    if (!isSuccess || !portfolio) return portfolio;
    return portfolio.filter((item: GetPortfolioResponse) =>
      item.ticker.includes(filterTickers),
    );
  }, [isSuccess, portfolio, filterTickers]);

  const portfolioHeaders = [
    '#',
    'Ticker',
    'Cantidad',
    'Valor de mercado',
    'Ganancia',
    'Rendimiento',
    'Acciones',
  ];

  if (isLoading) return <MessageWrapper text="Cargando datos" />;
  if (error) return <MessageWrapper text={`Error: ${error}`} />;
  if (!portfolio)
    return <MessageWrapper text="No tienes acciones en tu portfolio." />;
  if (!filteredInstruments.length)
    return (
      <MessageWrapper
        text={`No existen acciones para la busqueda ${filterTickers}`}
      />
    );

  return (
    <Table tableHeader={portfolioHeaders}>
      <tbody>
        {filteredInstruments.map(
          (position: GetPortfolioResponse, index: number) => (
            <PortfolioRow
              key={`${position.instrument_id}_${index}`}
              number={index}
              position={position}
            />
          ),
        )}
      </tbody>
    </Table>
  );
};

export default PortfolioTable;
