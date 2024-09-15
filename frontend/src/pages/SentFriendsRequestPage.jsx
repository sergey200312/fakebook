import React from 'react'
import Sidebar from '../components/Sidebar'

export default function SentFriendsRequestPage() {
    return (
        <div className='flex justify-center items-center'>
                <div className='flex mt-24 w-[900px]'>
                    <Sidebar />
                    <SentFriendsRequestPage/>
                </div>
        </div>
    )
}
