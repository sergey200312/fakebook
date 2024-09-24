import React from 'react'
import ProfileHeader from '../components/ProfileHeader';
import Layout from '../components/Layout';
import PostsList from '../components/PostsList';

export default function ProfilePage() {
    return (
        <Layout>
            <ProfileHeader />
            <PostsList />
        </Layout>
    )
}
