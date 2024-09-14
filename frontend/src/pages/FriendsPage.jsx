import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useQuery } from 'react-query';
import { fetchFriends } from '../api/userApi';
import FriendsList from '../components/FriendsList';

export default function FriendsPage() {
    
    return (
        <div className='flex justify-center items-center'>
            <div className='flex mt-24 w-[900px]'>
                <Sidebar />
                <FriendsList />
            </div>
        </div>
    )
}

