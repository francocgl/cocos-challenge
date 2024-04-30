import React, { ChangeEvent, useRef, type ReactElement } from 'react';
import { setFilterTickers } from '../../redux/reducers/filterSlice';
import { useDispatch } from 'react-redux';

const SearchInput = (): ReactElement => {
  const dispatch = useDispatch();
  const debounceRef = useRef<number | null>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(setFilterTickers(value.trim().toUpperCase()));
    }, 500) as unknown as number;
  };

  return (
    <input
      className="cocos__search-input"
      placeholder="Buscar tickers"
      autoComplete="off"
      type="text"
      name="search"
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
