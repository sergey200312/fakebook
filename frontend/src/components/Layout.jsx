import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className='flex justify-center items-center'>
                <div className='flex mt-24 w-[900px]'>
                    { children }
                </div>
        </div>
    );
}