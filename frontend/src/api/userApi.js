import axios from 'axios';
import { axiosInstance } from './axiosInstance';


export const fetchFriends = async () => {
    const response = await axiosInstance.get(`/friends`);

    return response.data;
};

export const fetchSentFriendsRequest = async () => {
    const response = await axiosInstance.get('/friends/request/sent');

    return response.data;
};

export const fetchProfileDetails = async (id) => {
    const response = await axiosInstance.get(`/profile/${id}`);

    return response.data;
};

export const sendFriendRequest = async (id) => {
    const response = await axiosInstance.post('/friends/request', { receivedUserId: id });

    return response.data
};

export const cancelFriendRequest = async (id) => {
    const response = await axiosInstance.delete('/friends/cancel', {
        params: { receivedUserId: id }
    });

    return response.data;
};

export const removeFriends = async (id) => {
    const response = await axiosInstance.delete('/friends/remove', {
        params: { friendToRemoveId: id}
    });

    return response.data;
};

export const acceptFriendRequest = async (id) => {
    const response = await axiosInstance.put('/friends/accept', { requestId: id });

    return response.data;
};

export const fetchReceivedRequest = async () => {
    const response = await axiosInstance.get('/friends/request/received');

    return response.data;
}