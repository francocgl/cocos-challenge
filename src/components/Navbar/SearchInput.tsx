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
      console.log('fetching');
      dispatch(setFilterTickers(value.toUpperCase()));
    }, 500) as unknown as number;
  };

  return (
    <input
      className="cocos__search-input"
      placeholder="Buscar tickers"
      type="text"
      name="search"
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
