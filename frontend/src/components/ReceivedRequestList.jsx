import React from 'react'
import { fetchReceivedRequest } from '../api/userApi';
import { useQuery } from 'react-query';
import UserItem from './UserItem';
import Navbar from './Navbar';
export default function ReceivedRequestList() {
    const { data, isLoading } = useQuery(['received'], fetchReceivedRequest);
    console.log(data);



    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 mt-10 w-full flex flex-col p-4 rounded-xl border shadow-xl'>
            <Navbar />
            <h1 className='mt-5 text-white text-center'>Полученные запросы</h1>
            <div className='mt-8 p-4 '>
                <UserItem
                    users={data?.receivedFriendReq?.friendRequests?.received || []}
                    type='received' />
            </div>
        </div>
    );
}
