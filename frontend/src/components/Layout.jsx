import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className='flex justify-center mt-24'>
            <Sidebar/>
                <div className='flex flex-col w-[900px]'>
                    { children }
                </div>
        </div>
    );
}