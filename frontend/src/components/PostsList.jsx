import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getFeed, getPosts } from '../api/postApi';
import { useParams } from 'react-router-dom';
import PostItem from './PostItem';

export default function PostsList({ feedType }) {
    const { id } = useParams();
    const [likesCount, setLikesCount] = useState()
    const fetchFunction = feedType === 'feed' ? getFeed : getPosts;
    const { data, isLoading } = useQuery(['posts', feedType, id], () => fetchFunction(feedType === 'feed' ? '' : id));
    console.log(data);

   

    if (isLoading) return <div>Загрузка..</div>

    return (
        <div className='mt-5 ml-8 p-10 bg-gray-800 rounded-xl'>
            <div className='flex flex-col items-start'>
                <PostItem posts = {data.posts} />
            </div>
        </div>
    )
}
