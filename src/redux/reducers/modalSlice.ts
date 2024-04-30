import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SIDE, SideType } from '../../const/config';

interface ModalState {
  isModalOpen: boolean;
  ticker: string;
  side: SideType;
}

const initialState: ModalState = {
  isModalOpen: false,
  ticker: '',
  side: SIDE.BUY,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.isModalOpen = false;
    },
    openModal: (state, action: PayloadAction<SideType>) => {
      state.isModalOpen = true;
      state.side = action.payload;
    },
    setTicker: (state, action: PayloadAction<string>) => {
      state.ticker = action.payload;
    },
  },
});

export const { openModal, setTicker, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
