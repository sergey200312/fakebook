// queryClient.js
import { QueryClient } from 'react-query';
import store from '../store/store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const state = store.getState();
        const token = state.auth.token; // Получите токен из Redux store
        const response = await fetch(queryKey[0], {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    },
  },
});

export default queryClient;
