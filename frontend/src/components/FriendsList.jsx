import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchFriends } from '../api/userApi';
import FriendItem from './FriendItem';

export default function FriendsList() {
    console.log('list')
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
   
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); 

        return () => {
            clearTimeout(handler); 
        };
    }, [searchTerm]);
   
    const { data, isLoading } = useQuery(['friends', debouncedSearchTerm], () => fetchFriends(debouncedSearchTerm), {
        enabled: true, 
    });

    const handleChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, [])
    
    if (isLoading) return <h1>Загрузка...</h1>;

    return (
        <div className='ml-8 w-full flex flex-col p-4 bg-gray-800 rounded-xl'>
            <h1 className='text-white text-center'>Friends List</h1>
            <div className='mt-8 p-4 '>
                <input
                type="text"
                placeholder="Поиск друзей"
                value={searchTerm}
                onChange={handleChange}
            />
                <FriendItem friends={data?.user?.friends || []} />
            </div>
        </div>
    );
}
