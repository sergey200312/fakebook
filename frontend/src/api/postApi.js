import { axiosInstance } from "./axiosInstance";

export const getPosts = async (userId) => {
    const response = await axiosInstance.get(`/post/get/${userId}`);

    return response.data
};


export const getFeed = async () => {
    const response = await axiosInstance.get('/feed');

    return response.data;
};

export const toggleLike = async (postId) => {
    const response = await axiosInstance.post(`/post/${postId}/toggleLike`);
    console.log(response.data.statusCode);
    return response.data;
};

export const toggleDislike = async (postId) => {
    const response = await axiosInstance.post(`/post/${postId}/toggleDislike`);

    return response.data;
};

export const createPost = async (postData) => {
    const response = await axiosInstance.post('/post/create', postData)

    return response.data;
};

export const imageUpload = async (formData) => {
    const response = await axiosInstance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    return response.data;
}