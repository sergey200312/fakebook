import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchFriends } from '../api/userApi';
import Navbar from './Navbar';
import UserItem from './UserItem';

export default function FriendsList() {
    console.log('list')


    const { data, isLoading } = useQuery(['friends'], fetchFriends);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 mt-10 flex flex-col p-4 bg-gray-800 rounded-xl'>
            <Navbar />
            <h1 className='mt-5 text-white text-center'>Список друзей</h1>
            <div className='mt-8 p-4 '>
                <UserItem
                    users={data?.user?.friends || []}
                    type='friend' />
            </div>
        </div>
    );
}
