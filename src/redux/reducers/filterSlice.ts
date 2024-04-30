import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const filterReducer = createSlice({
  name: 'filter',
  initialState: {
    filterTickers: '',
  },
  reducers: {
    setFilterTickers: (state, action: PayloadAction<string>) => {
      state.filterTickers = action.payload;
    },
  },
});

export const { setFilterTickers } = filterReducer.actions;

export default filterReducer.reducer;
