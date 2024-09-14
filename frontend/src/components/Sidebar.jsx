import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className='flex flex-col h-screen w-64 text-white bg-gray-800 rounded-xl p-4'>
            <ul>
                <li className='mb-4'>
                    <Link to='/'>Главная</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/profile'>Профиль</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/followers'>Подписчики</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/following'>Подписки</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/friends'>Друзья</Link>
                </li>
            </ul>
        </nav>
    )
}
