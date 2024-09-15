import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchFriends, fetchSentFriendsRequest } from '../api/userApi';
import FriendItem from './FriendItem';
import Layout from './Layout';

export default function FriendsList() {

    const { data, isLoading } = useQuery(['friends'], fetchSentFriendsRequest);
    console.log(data);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
            <div className='ml-8 w-full flex flex-col p-4 bg-gray-800 rounded-xl'>
                <h1 className='mt-5 text-white text-center'>Список друзей</h1>
                <div className='mt-8 p-4 '>
                    <FriendItem friends={data?.user?.friends || []} />
                </div>
            </div>
    );
}
