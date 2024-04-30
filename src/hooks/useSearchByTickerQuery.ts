import { useQuery } from 'react-query';
import axios from 'axios';
import { SEARCH_URL } from '../const/endpoints';

const useSearchByTickerQuery = (searchQuery: string) => {
  return useQuery({
    staleTime: Infinity,
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await axios.get(
        `${SEARCH_URL}?query=${searchQuery.toUpperCase()}`,
      );
      return response.data[0];
    },
    onError: error => {
      return `Error: Hay un error ${error}`;
    },
  });
};

export default useSearchByTickerQuery;
