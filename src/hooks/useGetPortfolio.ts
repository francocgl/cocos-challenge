import { useQuery } from 'react-query';
import axios from 'axios';
import { PORTFOLIO_URL } from '../const/endpoints';

const useGetPortfolio = () => {
  return useQuery({
    staleTime: Infinity,
    queryKey: ['portfolio'],
    queryFn: async () => {
      const response = await axios.get(PORTFOLIO_URL);
      return response.data;
    },
    onError: error => {
      return `There is an error ${error}`;
    },
  });
};

export default useGetPortfolio;
