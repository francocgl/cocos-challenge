import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export const mockPortfolioResponse = [
  {
    instrument_id: 5,
    ticker: 'MIRG',
    quantity: 25,
    last_price: 40.88,
    close_price: 37.74,
    avg_cost_price: 86.75,
  },
  {
    instrument_id: 24,
    ticker: 'CELU',
    quantity: 12,
    last_price: 72.51,
    close_price: 65.25,
    avg_cost_price: 8.67,
  },
  {
    instrument_id: 24,
    ticker: 'CELU',
    quantity: 25,
    last_price: 72.51,
    close_price: 65.25,
    avg_cost_price: 90.36,
  },
  {
    instrument_id: 22,
    ticker: 'BBAR',
    quantity: 5,
    last_price: 79.36,
    close_price: 71.67,
    avg_cost_price: 22.36,
  },
];

export const mockInstrumentResponse = [
  {
    id: 1,
    ticker: 'DYCA',
    name: 'Dycasa S.A.',
    type: 'ACCIONES',
    last_price: 45.72,
    close_price: 50.07,
  },
  {
    id: 2,
    ticker: 'CAPX',
    name: 'Capex S.A.',
    type: 'ACCIONES',
    last_price: 53.68,
    close_price: 49.71,
  },
  {
    id: 3,
    ticker: 'PGR',
    name: 'Phoenix Global Resources',
    type: 'ACCIONES',
    last_price: 31.95,
    close_price: 28.57,
  },
  {
    id: 4,
    ticker: 'MOLA',
    name: 'Molinos Agro S.A.',
    type: 'ACCIONES',
    last_price: 92.15,
    close_price: 84.13,
  },
  {
    id: 5,
    ticker: 'MIRG',
    name: 'Mirgor',
    type: 'ACCIONES',
    last_price: 40.88,
    close_price: 37.74,
  },
];

export const wrapper = ({ children }: { children?: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};
