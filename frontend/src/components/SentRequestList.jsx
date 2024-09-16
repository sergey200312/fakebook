import React from 'react';
import { useQuery } from 'react-query';
import { fetchSentFriendsRequest } from '../api/userApi';
import FriendItem from './FriendItem';
import Navbar from './Navbar';

export default function SentRequestList() {

    const { data, isLoading } = useQuery(['friends'], fetchSentFriendsRequest);
    console.log(data);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
            <div className='ml-8 w-full flex flex-col p-4 bg-gray-800 rounded-xl'>
                <Navbar />
                <h1 className='mt-5 text-white text-center'>Отправленные запросы</h1>
                <div className='mt-8 p-4 '>
                    <FriendItem friends={data?.sentFriendReq?.friendRequests?.sent || []} />
                </div>
            </div>
    );
}
