import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { acceptFriendRequest, cancelFriendRequest, removeFriends, sendFriendRequest } from '../api/userApi';

export default function ProfileActions({ sentRequestStatus, friendStatus, receivedStatus }) {
    const { id } = useParams();
    const [requestSent, setRequestSent] = useState(sentRequestStatus);
    const [isFriend, setIsFriend] = useState(friendStatus);
    const [receivedRequest, setReceivedRequest] = useState(receivedStatus);

    console.log(requestSent);
    console.log(friendStatus);
    console.log(receivedRequest);

    useEffect(() => {
        setRequestSent(sentRequestStatus);
        setIsFriend(friendStatus);
        setReceivedRequest(receivedStatus);
    }, [sentRequestStatus, friendStatus, receivedStatus]);

    const removeFriendMutation = useMutation(() => removeFriends(id), {
        onSuccess: (data) => {
            setIsFriend(false);
            console.log('Пользователь удален из друзей', data);
        },
        onError: (error) => {
            console.log('Ошибка при удалении из друзей', error);
        }
    });

    const acceptRequestMutation = useMutation(() => acceptFriendRequest(id), {
        onSuccess: (data) => {
            setIsFriend(true);
            setReceivedRequest(false);
            setRequestSent(false);
            console.log('Пользователь добавлен в друзья', data);
        },
        onError: (error) => {
            console.log('Ошибка при добавлении в друзья', error)
        }
    });

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
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFriend) {
            removeFriendMutation.mutate();
            console.log('remove')
        } else if (receivedRequest) {
            acceptRequestMutation.mutate()
        } else if (requestSent) {
            cancelRequestMutation.mutate();
            console.log('sent')
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
                className='p-1 bg-lime-500 rounded-lg text-white hover:bg-lime-800'>
                {isFriend ?  'Удалить из друзей' : receivedRequest ?
                    'Принять запрос' : requestSent ?
                        'Отменить запрос' : 'Отправить запрос'}</button>
        </>
    )
}
