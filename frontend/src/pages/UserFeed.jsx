import React from 'react'
import Layout from '../components/Layout'
import PostsList from '../components/PostsList'

export default function UserFeed() {
  return (
    <Layout>
      <PostsList feedType = 'feed' />
    </Layout>
  )
}
