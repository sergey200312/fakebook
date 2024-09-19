import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { acceptFriendRequest, cancelFriendRequest, removeFriends, sendFriendRequest } from '../api/userApi';

export default function FriendRequestButton({ userId, sentRequestStatus, friendStatus, receivedStatus }) {
    const [requestSent, setRequestSent] = useState(sentRequestStatus);
    const [isFriend, setIsFriend] = useState(friendStatus);
    const [receivedRequest, setReceivedRequest] = useState(receivedStatus);

    const queryClient = useQueryClient();

    console.log(requestSent);
    console.log(friendStatus);
    console.log(receivedRequest);
    console.log(userId)

    useEffect(() => {
        setRequestSent(sentRequestStatus);
        setIsFriend(friendStatus);
        setReceivedRequest(receivedStatus);
    }, [sentRequestStatus, friendStatus, receivedStatus, userId]);

    const removeFriendMutation = useMutation(() => removeFriends(userId), {
        onSuccess: (data) => {
            setIsFriend(false);
            console.log('Пользователь удален из друзей', data);
            queryClient.invalidateQueries(['friends']);
        },
        onError: (error) => {
            console.log('Ошибка при удалении из друзей', error);
        }
    });

    const acceptRequestMutation = useMutation(() => acceptFriendRequest(userId), {
        onSuccess: (data) => {
            setIsFriend(true);
            setReceivedRequest(false);
            setRequestSent(false);
            console.log('Пользователь добавлен в друзья', data);
            queryClient.invalidateQueries(['received']);
        },
        onError: (error) => {
            console.log('Ошибка при добавлении в друзья', error)
        }
    });

    const sendRequestMutation = useMutation(() => sendFriendRequest(userId), {
        onSuccess: (data) => {
            setRequestSent(true);
            console.log('Запрос отправлен:', data)
            console.log(requestSent)
        },
        onError: (error) => {
            console.error('Ошибка отправки запроса:', error)
        }
    });

    const cancelRequestMutation = useMutation(() => cancelFriendRequest(userId), {
        onSuccess: (data) => {
            setRequestSent(false);
            console.log('Запрос отменен')
            console.log(requestSent)
            queryClient.invalidateQueries(['sent']);
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

    const getButtonLabel = () => {
        if (friendStatus) {
            return 'Удалить из друзей'
        } if (receivedRequest) {
            return 'Принять запрос'
        } if (requestSent) {
            return 'Отменить запрос'
        }

        return 'Отправить запрос'
    }
    return (
        <>
            <button
                type='button'
                onClick={handleSubmit}
                className='p-1 bg-lime-500 rounded-lg text-white hover:bg-lime-800'>{getButtonLabel()}</button>
        </>
    )
}
