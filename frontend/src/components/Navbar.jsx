import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className=' p-4 text-base ml-8 border-b-2'>
            <ul className='flex justify-center items-center space-x-4'>
                <li className='hover:text-gray-700'><Link to='/friends'>Друзья</Link></li>
                <li className='hover:text-gray-700'><Link to='/sent-requests'>Отправленные запросы</Link></li>
                <li className='hover:text-gray-700'><Link to='/received-requests'>Полученные запросы</Link></li>
                <li className='hover:text-gray-700'><Link to='/users'>Найти друзей</Link></li>
            </ul>
        </nav>
    );
}