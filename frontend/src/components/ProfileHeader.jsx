import React from 'react';
import { useQuery } from 'react-query';
import { fetchProfileDetails } from '../api/userApi';
import { useParams } from 'react-router-dom';
import { formattedDate } from '../utils/DateFormatter';
import { useSelector } from 'react-redux';
import FriendRequestButton from './FriendRequestButton.jsx';

export default function ProfileHeader() {

    const { id } = useParams();
    const { data, isLoading } = useQuery(['profile', id], () => fetchProfileDetails(id));
    const currentUser = useSelector((state) => state.auth.currentUser);
    console.log(currentUser)
    console.log(data);

    const isCurrentUser = id === currentUser;

    return (
        <div className='ml-8 p-10 rounded-xl bg-gray-800'>
            <div className='flex justify-between'>
                <div className='flex-col'>

                    {isLoading ?
                        <div className='text-white'>Загрузка...</div> :
                        <div>
                            <p className='text-white mb-2'>{data?.user?.firstName} {data?.user?.lastName}</p>
                            <p className='text-white mb-2'>{formattedDate(data?.user?.createdAt)}</p>
                            <p className='text-white mb-2'>{data.friendsCount} Друзья</p>
                            <p className='text-white mb-2'>{data.subscriptionsCount} Подписчики</p>
                        </div>

                    }
                </div>
                <div>
                    <img className='h-48 rounded-full'
                        src={data?.user?.avatar}
                        alt={`${data?.user?.firstName} ${data?.user?.lastName}`}
                    />
                </div>
            </div>
             { !isCurrentUser && (<div>
                <FriendRequestButton
                    sentRequestStatus={data?.sentRequestStatus}
                    friendStatus={data?.friendStatus}
                    receivedStatus={data?.receivedStatus}
                    userId={data?.user?._id} />
            </div>)}
        </div>
    )
}
