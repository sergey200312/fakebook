import { axiosInstance } from "./axiosInstance";

export const getPosts = async () => {
    const response = await axiosInstance.get('/post/get');

    return response.data
}