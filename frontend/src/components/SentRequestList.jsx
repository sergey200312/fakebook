import React from 'react';
import { useQuery } from 'react-query';
import { fetchSentFriendsRequest } from '../api/userApi';
import UserItem from './UserItem.jsx';
import Navbar from './Navbar';
import FriendRequestButton from './FriendRequestButton.jsx';

export default function SentRequestList() {

    const { data, isLoading } = useQuery(['sent'], fetchSentFriendsRequest);
    console.log(data);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 mt-10 w-full flex flex-col p-4 rounded-xl border shadow-xl'>
            <Navbar />
            <h1 className='mt-5 text-white text-center'>Отправленные запросы</h1>
            <div className='mt-8 p-4 '>
                <UserItem
                    users={data?.sentFriendReq?.friendRequests?.sent || []}
                    type='sent' />
            </div>
        </div>
    );
}
