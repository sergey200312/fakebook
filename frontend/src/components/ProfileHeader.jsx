import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchProfileDetails } from "../api/userApi";
import { useParams } from "react-router-dom";
import { formattedDate } from "../utils/DateFormatter";
import { useSelector } from "react-redux";


export default function ProfileHeader() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["profile", id], () =>
    fetchProfileDetails(id)
  );
  const [modalIsOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const currentUser = useSelector((state) => state.auth.currentUser);


  const isCurrentUser = id === currentUser;

  return (
    <div className="mt-12 ml-10 p-10 rounded-xl border flex-grow shadow-xl ">
      <div className='flex flex-col'>
        <div className="flex mb-20">
          <div className=''>
            <img
              className="h-24 rounded-full"
              src={data?.user?.avatar}
              alt={`${data?.user?.firstName} ${data?.user?.lastName}`}
            />

          </div>
          <div className='flex flex-col'>
            <p className="text-white font-bold text-xl ml-6">
              {data?.user?.firstName} {data?.user?.lastName}
            </p>
            {data?.user?.bio && (
              <p className='text-gray-400 text-lg mb-2 ml-6'>О себе: {data.user.bio}</p>
            )}
            <p className="text-gray-400 text-lg font-serif mb-2 ml-6">
              {formattedDate(data?.user?.createdAt)}
            </p>
          </div>
        </div>
        <div className="mb-6">
          {isLoading ? (
            <div className="text-white">Загрузка...</div>
          ) : (
            <div className="flex justify-around items-center">
              <div className='flex flex-col'>
                <p className=" text-center font-bold mb-2">{data.friendsCount}</p>
                <p className='text-gray-400 font-serif'>Друзья</p>
              </div>
              <div>
                <p className=" text-center font-bold mb-2">{data.subscriptionsCount} </p>
                <p className='text-gray-400 font-serif'>Подписчики</p>
              </div>
              <div>
                <p className=" text-center font-bold mb-2">{data.subscribersCount} </p>
                <p className='text-gray-400 font-serif'>Подписки</p>
              </div>

            </div>
          )}
        </div>

        {/* <button onClick={openModal}>Открыть модальное окно</button>
        <EditProfile closeModal={closeModal} modalIsOpen={modalIsOpen} /> */}
      </div>
      {/* {!isCurrentUser && (
        <div>
          <FriendRequestButton
            sentRequestStatus={data?.sentRequestStatus}
            friendStatus={data?.friendStatus}
            receivedStatus={data?.receivedStatus}
            userId={data?.user?._id}
          />
        </div>
      )} */}
    </div>
  );
}
