import React, { useMemo, type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { GetPortfolioResponse } from '../../types/queryResponse';
import { formatNumberRow } from '../../utils/formatNumberRow';
import { isPositiveNumber } from '../../utils/isPositiveNumber';
import { openModal, setTicker } from '../../redux/reducers/modalSlice';
import { SIDE, SideType } from '../../const/config';

interface PortfolioRowProps {
  number: number;
  position: GetPortfolioResponse;
}

const PortfolioRow = ({
  number,
  position,
}: PortfolioRowProps): ReactElement => {
  const dispatch = useDispatch();
  const { avg_cost_price, ticker, quantity, last_price } = position;
  const id = number + 1;
  const differencePrice = last_price - avg_cost_price;
  console.log('position', position);
  const marketValue = useMemo(() => {
    return (quantity * last_price).toFixed(2);
  }, [quantity, last_price]);

  const profit = useMemo(() => {
    return (differencePrice * quantity).toFixed(2);
  }, [differencePrice, quantity]);

  const totalReturn = useMemo(() => {
    return ((differencePrice / avg_cost_price) * 100).toFixed(2);
  }, [avg_cost_price, differencePrice]);

  const formattedMarketValue = `ARS ${marketValue}`;
  const formattedProfit = formatNumberRow(+profit);
  const formattedTotalReturn = `${formatNumberRow(+totalReturn)}%`;

  const handleRowClick = (ticker: string, action: SideType) => {
    dispatch(setTicker(ticker));
    dispatch(openModal(action));
  };

  return (
    <tr className="cocos__table__row">
      <td className="cocos__table__ticker">{id}</td>
      <td className="cocos__table__ticker">{ticker}</td>
      <td className="cocos__table__name">{quantity}</td>
      <td className="cocos__table__price">{formattedMarketValue}</td>
      <td className={isPositiveNumber(+profit)}>{formattedProfit}</td>
      <td className={isPositiveNumber(+totalReturn)}>{formattedTotalReturn}</td>
      <td>
        <button
          onClick={() => handleRowClick(ticker, SIDE.BUY)}
          className="cocos__table__actions-buttons"
        >
          Comprar
        </button>
        <button
          onClick={() => handleRowClick(ticker, SIDE.SELL)}
          className="cocos__table__actions-buttons"
        >
          Vender
        </button>
      </td>
    </tr>
  );
};

export default PortfolioRow;
