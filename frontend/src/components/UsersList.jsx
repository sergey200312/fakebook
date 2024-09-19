import React from 'react'
import { fetchRandomUsers } from '../api/userApi';
import Navbar from './Navbar';
import UserItem from './UserItem';
import { useQuery } from 'react-query';

export default function UsersList() {
    const { data, isLoading } = useQuery(['users'], fetchRandomUsers);
    console.log(data);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 w-full flex flex-col p-4 bg-gray-800 rounded-xl'>
            <Navbar />
            <h1 className='mt-5 text-white text-center'>Пользователи</h1>
            <div className='mt-8 p-4 '>
                <UserItem
                    users={data || []}
                    type='' />
            </div>
        </div>
    );
}
