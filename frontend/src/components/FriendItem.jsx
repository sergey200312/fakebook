import React from 'react';

// Используем React.memo для предотвращения лишних рендеров
const FriendItem = React.memo(({ friends }) => {
    console.log('FriendItem render');

    return (
        <div className='grid grid-cols-3 gap-4'>
            {friends.map(friend => (
                <div key={friend._id} className='flex flex-col text-white  items-center mb-4'>
                    <img
                        src={friend.avatar || 'default-avatar.png'}
                        alt='изображение'
                        className='w-12 h-12 rounded-full mr-4'
                    />
                    <p>{friend.firstName} {friend.lastName}</p>
                </div>
            ))}
        </div>
    );
});

export default FriendItem;
