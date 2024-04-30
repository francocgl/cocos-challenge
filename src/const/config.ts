export type ComponentStateTypes = 'portfolio' | 'instruments' | 'orders';

export enum COMPONENT_STATE {
  PORTFOLIO = 'portfolio',
  INSTRUMENTS = 'instruments',
  ORDERS = 'orders',
}

export type OrderType = 'LIMIT' | 'MARKET';

export enum ORDER {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
}

export type SideType = 'BUY' | 'SELL';

export enum SIDE {
  BUY = 'BUY',
  SELL = 'SELL',
}

export type Status = 'PENDING' | 'FILLED' | 'REJECTED';

export enum STATUS {
  PENDING = 'PENDING',
  FILLED = 'FILLED',
  REJECTED = 'REJECTED',
}
