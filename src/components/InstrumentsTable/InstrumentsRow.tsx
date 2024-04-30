import React, { useMemo, type ReactElement } from 'react';
import { GetInstrumentsResponse } from '../../types/queryResponse';
import { useDispatch } from 'react-redux';
import { openModal, setTicker } from '../../redux/reducers/modalSlice';
import { isPositiveNumber } from '../../utils/isPositiveNumber';
import { SIDE } from '../../const/config';

interface InstrumentsRowProps {
  number: number;
  instrument: GetInstrumentsResponse;
}

const InstrumentsRow = ({
  number,
  instrument,
}: InstrumentsRowProps): ReactElement => {
  const dispatch = useDispatch();
  const { ticker, name, last_price, close_price } = instrument;
  const id = number + 1;

  const returnValue = useMemo(() => {
    return (((last_price - close_price) / close_price) * 100).toFixed(2);
  }, [last_price, close_price]);

  const formattedReturnValue = `${returnValue}%`;

  const handleRowClick = (ticker: string) => {
    dispatch(setTicker(ticker));
    dispatch(openModal(SIDE.BUY));
  };
  console.log('intrument', instrument);

  return (
    <tr className="cocos__table__row">
      <td className="cocos__table__ticker">{id}</td>
      <td className="cocos__table__ticker">{ticker}</td>
      <td className="cocos__table__name">{name}</td>
      <td className="cocos__table__price">{`ARS ${last_price}`}</td>
      <td className={isPositiveNumber(+returnValue)}>{formattedReturnValue}</td>
      <td>
        <button
          onClick={() => handleRowClick(ticker)}
          className="cocos__table__actions-buttons"
        >
          Comprar
        </button>
      </td>
    </tr>
  );
};

export default InstrumentsRow;
