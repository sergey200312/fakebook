import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/postApi';

export default function PostsList() {
    const { data, isLoading } = useQuery(['posts'], getPosts);
    console.log(data);

    if (isLoading) return <div>Загрузка..</div>

    return (
        <div className='mt-5 ml-8 p-10 bg-gray-800 rounded-xl'>
            <div className='flex flex-col items-start'>
                {data?.posts.map(post => (
                    <div className='w-full border-2 border-gray-900 mb-5'>
                        <div key={post._id} className='mb-5 p-2 text-white '>
                            <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
