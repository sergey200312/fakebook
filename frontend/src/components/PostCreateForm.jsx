import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createPost } from '../api/postApi';
import { imageUpload } from '../api/postApi';

export default function PostCreateForm() {
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        image: '',
        content: ''
    })

    const postMutation = useMutation(() => createPost(postData), {

        onSuccess: (data) => (
            console.log("Успешно")
        ),
        onError: (error) => (
            console.log('Недуачно')
        )
    })

    const uploadMutation = useMutation((formData) => imageUpload(formData), {
        onSuccess: (data) => {
            setPostData(prev => ({
                ...prev, 
                image: data.imageUrl
            }))
            console.log('Изображение успешно загружено');
        },
        onError: (error) => {
            console.error('Ошибка загрузки изображения', error);
        },
        onSettled: () => {
            setIsUploading(false);
        }
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            uploadMutation.mutate(formData);
        } else {
            setImageFile(null);
        }
    };

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setPostData(prevData => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        postMutation.mutate();
    };

    return (
        <div className='container mx-auto mt-16 flex items-center min-h-screen justify-center'>
            <div className='p-8 rounded-lg shadow-lg w-full'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='content'>Содержание поста:</label>
                        <textarea
                            id='content'
                            name='content'
                            value={postData.content}
                            placeholder='Введите содержание...'
                            onChange={handleChange}
                            rows={15}
                            required
                            className='w-full mt-2 border border-black rounded-lg pl-1'
                        />
                    </div>
                    <div className='mb-8'>
                        <label htmlFor='image'>Загрузить изображение:</label>
                        <input
                            type='file'
                            id='image'
                            name='imageUrl'
                            onChange={handleImageUpload}
                            className='ml-4 mt-2 border border-black rounded-lg'
                        />
                        {isUploading && (
                            <p className='mt-2 text-red-500'>Загрузка изображения...</p>
                        )}
                        {imageFile && (
                            <div className='flex justify-center mt-4'>
                                <img src={postData.image} alt='Uploaded' className='rounded-md w-1/2 h-1/2' />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='p-2 rounded-lg border border-black bg-black text-white hover:bg-gray-700'>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}