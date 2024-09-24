import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className='flex flex-col text-2xl w-64 text-white bg-gray-800 rounded-xl p-4'>
            <ul>
                <li className='mb-4'>
                    <Link to='/feed'>Главная</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/profile'>Профиль</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/friends'>Пользователи</Link>
                </li>
            </ul>
        </nav>
    )
}
