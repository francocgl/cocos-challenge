import { createSlice } from '@reduxjs/toolkit';
import { SIDE } from '../../const/config';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    ticker: '',
    side: SIDE.BUY,
  },
  reducers: {
    closeModal: state => {
      state.isModalOpen = false;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.side = action.payload;
    },
    setTicker: (state, action) => {
      state.ticker = action.payload;
    },
  },
});

export const { openModal, setTicker, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
