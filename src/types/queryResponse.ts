import { OrderType, SideType, Status } from '../const/config';

export type OrderDataTypes = {
  instrument_id: number;
  side: SideType;
  type: OrderType;
  quantity: number;
  price?: number;
};

export type GetInstrumentsResponse = {
  close_price: number;
  id: number;
  last_price: number;
  name: string;
  ticker: string;
  type: string;
};

export type GetPortfolioResponse = {
  avg_cost_price: number;
  close_price: number;
  instrument_id: number;
  last_price: number;
  quantity: number;
  ticker: string;
};

export type OrderMutationResponse = {
  id: number;
  instrument_id: number;
  side: SideType;
  type: OrderType;
  quantity: number;
  status: Status;
  price?: number;
};
