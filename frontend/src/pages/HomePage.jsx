import React from 'react';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
    return (
        <div className='flex justify-center items-center'>
            <div className='mt-24 w-[900px]'>
                <Sidebar />
            </div>
        </div>
    )
}
