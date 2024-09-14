import { axiosInstance } from './axiosInstance';


export const fetchFriends = async (searchTerm = '') => {
    const params = searchTerm ? { search: searchTerm } : {};

    const response = await axiosInstance.get('/friends', { params });
    return response.data;
};