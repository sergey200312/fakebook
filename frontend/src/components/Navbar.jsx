import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className=' p-4 text-white ml-8'>
            <ul className='flex justify-center items-center space-x-4'>
                <li className='hover:text-gray-300 hover:border-b-2 hover:border-white'><Link to='/friends'>Друзья</Link></li>
                <li className='hover:text-gray-300 hover:border-b-2 hover:border-white'><Link to='/sent-requests'>Отправленные запросы</Link></li>
                <li className='hover:text-gray-300 hover:border-b-2 hover:border-white'><Link to='/received-requests'>Полученные запросы</Link></li>
                <li className='hover:text-gray-300 hover:border-b-2 hover:border-white'><Link to='/users'>Найти друзей</Link></li>
            </ul>
        </nav>
    );
}