import { axiosInstance } from './axiosInstance';


export const fetchFriends = async () => {
    const response = await axiosInstance.get(`/friends`);

    return response.data;
};

export const fetchSentFriendsRequest = async () => {
    const response = await axiosInstance.get('/friends/request/sent');

    return response.data;
}

export const fetchProfileDetails = async (id) => {
    const response = await axiosInstance.get(`/profile/${id}`);

    return response.data;
}

export const sendFriendRequest = async (id) => {
    const response = await axiosInstance.post('/friends/request', { receivedUserId: id });
}