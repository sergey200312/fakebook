import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editProfile, fetchMe } from "../api/userApi";
import { FaCloudDownloadAlt } from "react-icons/fa";


export default function EditProfile({ closeModal, modalIsOpen }) {
  const { data, isLoading } = useQuery(["me"], fetchMe);
  console.log(data);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  });

  const queryClient = useQueryClient();

  const editProfileMutation = useMutation(() => editProfile(formData), {
    onSuccess:(data) => {
      console.log('Профиль успешно обновлен');
      queryClient.invalidateQueries(['profile'])
    },
    onError: (error) => {
      console.log('Ошибка при обновлении профиля')
    }
  }) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.currentUser.firstName,
        lastName: data.currentUser.lastName,
        bio: data.currentUser.bio,
        avatar: data.currentUser.avatar,
      });
    }
  }, [data]);
  
  const handleClick  = (e) => {
    e.preventDefault();
    closeModal();
    editProfileMutation.mutate();
  }

  if (isLoading) return <div>Загрузка..</div>;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Модальное окно в дочернем компоненте"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className=" bg-white  rounded-lg  max-w-lg p-8 w-full A">
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col justify-center">
              <input
                className="mb-6 border-[1px] border-black rounded-lg"
                type="text"
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
              />
              <input
                className="mb-10 border-[1px] border-black rounded-lg"
                type="text"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="relative inline-block">
              <img
                className="h-24 rounded-full ml-20"
                src={formData.avatar}
                alt={`${formData.firstName} ${formData.lastName}`}
              />
              <input type="file" className='hidden' />
              <FaCloudDownloadAlt className="absolute bottom-0 right-0 mr-10 h-6 w-6" />
              </div>
          </div>
          <div className="">
            <textarea
              className="border-[1px] w-full  border-black rounded-lg"
              type="text"
              value={formData.bio}
              name="bio"
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="flex justify-center">
            <button onClick={handleClick}>Сохранить</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
