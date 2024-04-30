import { useQuery } from 'react-query';
import axios from 'axios';
import { INSTRUMENTS_URL } from '../const/endpoints';

const useGetInstruments = () => {
  return useQuery({
    staleTime: Infinity,
    queryKey: ['instruments'],
    queryFn: async () => {
      const response = await axios.get(INSTRUMENTS_URL);
      return response.data;
    },
  });
};

export default useGetInstruments;
