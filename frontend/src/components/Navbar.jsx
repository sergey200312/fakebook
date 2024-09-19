import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='bg-gray-800 p-4 text-white ml-8'>
            <ul className='flex justify-center items-center space-x-4'>
                <li><Link to='/friends'>Друзья</Link></li>
                <li><Link to='/sent-requests'>Отправленные запросы</Link></li>
                <li><Link to='/received-requests'>Полученные запросы</Link></li>
                <li><Link to='/users'>Найти друзей</Link></li>
            </ul>
        </nav>
    );
}