import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { cancelFriendRequest, removeFriends, sendFriendRequest } from '../api/userApi';

export default function ProfileActions( { sentRequestStatus, friendStatus } ) {
    const { id } = useParams();
    const [requestSent, setRequestSent] = useState(sentRequestStatus);
    const [isFriend, setIsFriend] = useState(friendStatus);

    console.log(requestSent);
    console.log(friendStatus);

    useEffect(() => {
        setRequestSent(sentRequestStatus);
        setIsFriend(friendStatus);
    }, [sentRequestStatus, isFriend]);

    const removeFriendMutation = useMutation(() => removeFriends(id), {
        onSuccess: (data) => {
            setIsFriend(false);
            console.log('Пользователь удален из друзей', data);
        },
        onError: (error) => {
            console.log('Ошибка при удалении из друзей', error);
        }
    })

    const sendRequestMutation = useMutation(() => sendFriendRequest(id), {
        onSuccess: (data) => {
            setRequestSent(true);
            console.log('Запрос отправлен:', data)
            console.log(requestSent)
        },
        onError: (error) => {
            console.error('Ошибка отправки запроса:', error)
        }
    });

    const cancelRequestMutation = useMutation(() => cancelFriendRequest(id), {
        onSuccess: (data) => {
            setRequestSent(false);
            console.log('Запрос отменен')
            console.log(requestSent)
        },
        onError: (error) => {
            console.log('Ошибка при отмене запроса')
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFriend) {
            removeFriendMutation.mutate();
        } if (sentRequestStatus) {
            cancelRequestMutation.mutate();
        } else {
            sendRequestMutation.mutate();
        }

        console.log('click')

    }
  return (
    <>
        <button 
        type='button' 
        onClick={handleSubmit}
        className='p-1 bg-lime-500 rounded-lg text-white hover:bg-lime-800'>{isFriend ? 'Удалить из друзей' : sentRequestStatus ? 'Отменить запрос' : 'Отправить запрос'}</button>
    </>
  )
}
