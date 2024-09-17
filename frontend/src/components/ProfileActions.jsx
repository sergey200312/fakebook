import React from 'react'
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { sendFriendRequest } from '../api/userApi';

export default function ProfileActions() {
    const { id } = useParams();

    const mutation = useMutation(() => sendFriendRequest(id), {
        onSuccess: (data) => {
            console.log('Запрос отправлен:', data)
        },
        onError: (error) => {
            console.error('Ошибка отправки запроса:', error)
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate();
        console.log('click')

    }
  return (
    <>
        <button 
        type='sumbit' 
        onClick={handleSubmit}
        className='p-1 bg-lime-500 rounded-lg text-white hover:bg-lime-800'>Отправить запрос в друзья</button>
    </>
  )
}
