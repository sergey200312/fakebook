import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className='flex px-40'>
            <Sidebar />
            <div className='flex flex-col ml-60 w-full'> {/* Отступ для сайдбара */}
                {children}
            </div>
        </div>
    );
}
