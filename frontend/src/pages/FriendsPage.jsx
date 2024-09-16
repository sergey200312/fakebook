import React from 'react';
import Sidebar from '../components/Sidebar';
import FriendsList from '../components/FriendsList';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

export default function FriendsPage() {

    return (
        <Layout>
            <FriendsList />
        </Layout>
    )
}

