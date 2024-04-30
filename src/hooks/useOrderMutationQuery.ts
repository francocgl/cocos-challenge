import axios from 'axios';
import { useMutation } from 'react-query';
import { ORDERS_URL } from '../const/endpoints';
import { OrderDataTypes } from '../types/queryResponse';

const useOrderMutationQuery = () => {
  return useMutation({
    mutationFn: async (order: OrderDataTypes) => {
      const response = await axios.post(ORDERS_URL, order);
      return response.data;
    },
  });
};

export default useOrderMutationQuery;
