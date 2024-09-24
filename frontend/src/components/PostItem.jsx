import React from 'react';
import CommentList from './CommentList';
import { formattedDatePost } from '../utils/DateFormatter';

export default function PostItem({ posts }) {
  return (
    <>
    {posts.map(post => (
        <div className='w-full border-2 border-gray-900 mb-5'>
            <div key={post._id} className='mb-5 p-2 text-white '>
                <div className='flex justify-between mb-2'>
                    <p>{post.user.firstName} {post.user.lastName}</p>
                    <p>{formattedDatePost(post.createdAt)}</p>
                </div>
                <p>{post.content}</p>
                {/* <div className='mt-2'>
                    <button
                </div> */}
                <div>
                    <CommentList postId = {post._id} />
                </div>
            </div>
        </div>
    ))}
    </>
  )
}
