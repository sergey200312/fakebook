import axios from "axios";
import store from "../store/store";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token;
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  