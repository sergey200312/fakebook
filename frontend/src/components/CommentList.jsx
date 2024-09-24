import React from 'react';
import { useQuery } from 'react-query';
import { getComments } from '../api/commentApi';


export default function CommentList({ postId }) {

    const { data, isLoading } = useQuery(['comments', postId], () => getComments(postId), {
        enabled: !!postId,
    });

    const comments = data?.response?.comments || [];
    const mainComments = comments.filter(comment => !comment.parentComment);
    const childComments = comments.filter(comment => comment.parentComment)
    console.log(comments);
    console.log(mainComments);
    console.log(childComments)
    return (
        <div className='mt-6'>
            Комментарии
            {mainComments.map(mainComment => (
                <div key={mainComment._id} className='mb-4'>
                    <p>{mainComment.text}</p>
                    <div className='ml-5'>
                        {childComments
                            .filter(child => child.parentComment === mainComment._id)
                            .map(childComment => (
                                <div key={childComment._id} className='p-2 border-l-2 bg-gray-600'>
                                    <p>{childComment.text}</p>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}