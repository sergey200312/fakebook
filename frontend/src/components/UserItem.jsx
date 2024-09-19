import React from 'react';
import FriendRequestButton from './FriendRequestButton.jsx';
import { Link } from 'react-router-dom';

// Используем React.memo для предотвращения лишних рендеров
export default function UserItem({ users, type }) {
    console.log('FriendItem render');

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {users.map(user => (

                <div key={user._id} className='flex flex-col text-white  items-center mb-4'>
                    <Link to={`/profile/${user._id}`}>
                        <div className='flex justify-center'>
                            <img
                                src={user.avatar}
                                alt='изображение'
                                className='w-12 h-12 rounded-full'
                            />
                        </div>
                        <p>{user.firstName} {user.lastName}</p>
                    </Link>
                    <FriendRequestButton
                        userId={user._id}
                        sentRequestStatus={type === 'sent'}
                        friendStatus={type === 'friend'}
                        receivedStatus={type === 'received'} />
                </div>
            ))}
        </div>
    );
};

