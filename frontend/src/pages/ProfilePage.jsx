import React from 'react'
import ProfileHeader from '../components/ProfileHeader';
import Layout from '../components/Layout';
import UserFeed from '../components/UserFeed';

export default function ProfilePage() {
    return (
        <Layout>
            <ProfileHeader />
            <UserFeed />
        </Layout>
    )
}
