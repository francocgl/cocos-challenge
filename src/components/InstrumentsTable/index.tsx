import React, { type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import useGetInstruments from '../../hooks/useGetInstruments';
import { GetInstrumentsResponse } from '../../types/queryResponse';
import { RootState } from '../../redux/store';
import { MessageWrapper, Table } from '../common';
import InstrumentsRow from './InstrumentsRow';

const InstrumentsTable = (): ReactElement => {
  const {
    data: instruments,
    isLoading,
    error,
    isSuccess,
  } = useGetInstruments();
  const filterTickers = useSelector(
    (state: RootState) => state.filter.filterTickers,
  );
  const filterInstruments = isSuccess
    ? instruments.filter((item: GetInstrumentsResponse) =>
        item.ticker.includes(filterTickers),
      )
    : instruments;

  const instrumentsHeader = [
    '#',
    'Ticker',
    'Nombre',
    'Último Precio',
    'Retorno',
    'Acciones',
  ];

  if (isLoading) return <MessageWrapper text="Cargando datos" />;
  if (error) return <MessageWrapper text={`Error: ${error}`} />;
  if (!instruments)
    return <MessageWrapper text="No hay instrumentos disponibles." />;
  if (!filterInstruments.length)
    return (
      <MessageWrapper
        text={`No existen instrumentos para la busqueda ${filterTickers}.`}
      />
    );

  return (
    <Table tableHeader={instrumentsHeader}>
      <tbody>
        {instruments &&
          filterInstruments.map(
            (instrument: GetInstrumentsResponse, index: number) => (
              <InstrumentsRow
                key={instrument.id}
                instrument={instrument}
                number={index}
              />
            ),
          )}
      </tbody>
    </Table>
  );
};

export default InstrumentsTable;
