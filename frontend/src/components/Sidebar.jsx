import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className='flex flex-col h-screen text-white p-4'>
            <ul>
                <li className='mb-4'>
                    <Link to='/'>Главная</Link>
                </li>
                <li className='mb-4'>
                    <Link to='/profile'>Профиль</Link>
                </li>
            </ul>
        </nav>
    )
}
