import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const currentUser = useSelector((state) => state.auth.currentUser)
    console.log(currentUser)
    return (
        <div className='fixed h-screen  border-gray-700 '>
            <nav className='p-8 flex flex-col mt-12 text-lg  w-60 border shadow-xl rounded-xl'>
                <ul>
                    <li className='mb-4 hover:text-gray-700 flex gap-2'>
                        <AiFillHome />
                        <Link to='/feed'>Главная</Link>
                    </li>
                    <li className='mb-4 hover:text-gray-700 flex gap-2'>
                        <FaUser />
                        <Link to='/profile'>Профиль</Link>
                    </li>
                    <li className='mb-4 hover:text-gray-700 flex gap-2 '>
                        <RiUserSearchLine />
                        <Link to='/friends'>Пользователи</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
