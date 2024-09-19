import React from 'react';
import FriendRequestButton from './FriendRequestButton.jsx';

// Используем React.memo для предотвращения лишних рендеров
export default function UserItem({ users, type }) {
    console.log('FriendItem render');

    return (
        <div className='grid grid-cols-3 gap-4'>
            {users.map(user => (
                <div key={user._id} className='flex flex-col text-white  items-center mb-4'>
                    <img
                        src={user.avatar}
                        alt='изображение'
                        className='w-12 h-12 rounded-full mr-4'
                    />
                    <p>{user.firstName} {user.lastName}</p>
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

