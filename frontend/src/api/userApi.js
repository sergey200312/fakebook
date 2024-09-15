import { axiosInstance } from './axiosInstance';


export const fetchFriends = async () => {
    const response = await axiosInstance.get(`/friends`);

    return response.data;
};

export const fetchSentFriendsRequest = async () => {
    const response = await axiosInstance.get('/friends/request/sent')

    return response.data;
}