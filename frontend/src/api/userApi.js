import axiosInstance from './axiosInstance';

const fetchFriends = async () => {
    const { data } = axiosInstance.get('/friends');
    return data;
}