export type ComponentStateTypes = 'portfolio' | 'instruments' | 'orders';

export const COMPONENT_STATE: { [key in string]: ComponentStateTypes } = {
  PORTFOLIO: 'portfolio',
  INSTRUMENTS: 'instruments',
  ORDERS: 'orders',
};

export type OrderType = 'LIMIT' | 'MARKET';

export const ORDER: { [key in string]: OrderType } = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET',
};

export type SideType = 'BUY' | 'SELL';

export const SIDE: { [key in string]: SideType } = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export type Status = 'PENDING' | 'FILLED' | 'REJECTED';

export const STATUS: { [key in string]: Status } = {
  PENDING: 'PENDING',
  FILLED: 'FILLED',
  REJECTED: 'REJECTED',
};
