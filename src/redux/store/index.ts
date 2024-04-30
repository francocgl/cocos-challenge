import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducers/modalSlice';
import filterReducer from '../reducers/filterSlice';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: { modal: modalReducer, filter: filterReducer },
});
