import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";

export default function Sidebar() {
    return (
        <div className='fixed h-screen border-r border-gray-700 '>
            <nav className='flex flex-col mt-24 text-lg text-white  py-4 w-60'>
                <ul>
                    <li className='mb-4 hover:text-gray-300 flex gap-2'>
                        <AiFillHome />
                        <Link to='/feed'>Главная</Link>
                    </li>
                    <li className='mb-4 hover:text-gray-300 flex gap-2'>
                        <FaUser />
                        <Link to='/profile'>Профиль</Link>
                    </li>
                    <li className='mb-4 hover:text-gray-300 flex gap-2 '>
                        <RiUserSearchLine />
                        <Link to='/friends'>Пользователи</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
