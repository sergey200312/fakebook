import React from 'react';
import { useQuery } from 'react-query';
import { fetchFriends } from '../api/userApi';

export default function FriendsList() {
    const { data, isLoading } = useQuery(['friends'], fetchFriends);

    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 w-full flex flex-col p-4 bg-gray-800 rounded-xl'>
            <h1 className='text-white text-center'>Friends List</h1>
            <div className='mt-8 p-4 '>
                <ul>
                    {data?.user?.friends?.map(friend => (
                        <li key={friend._id} className='text-white'>
                            <img
                               src={friend.avatar}
                               alt='изображение'/>
                            {friend.firstName} {friend.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
