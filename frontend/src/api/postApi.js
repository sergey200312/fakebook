import { axiosInstance } from "./axiosInstance";

export const getPosts = async (userId) => {
    const response = await axiosInstance.get(`/post/get/${userId}`);

    return response.data
};

export const getFeed = async () => {
    const response = await axiosInstance.get('/feed');

    return response.data;
}