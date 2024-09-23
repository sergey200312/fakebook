import { axiosInstance } from "./axiosInstance";

export const getComments = async (postId) => {
    const response = await axiosInstance.get('/comments/get', { params: { postId } } )

    return response.data;
}