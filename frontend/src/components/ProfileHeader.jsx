import React from 'react';
import { useQuery } from 'react-query';
import { fetchProfileDetails } from '../api/userApi';
import { useParams } from 'react-router-dom';

export default function ProfileHeader() {

    const { id } = useParams();
    const { data, isLoading } = useQuery(['profile', id], () => fetchProfileDetails(id));
    console.log(data);

  return (
    <div>ProfileHeader</div>
  )
}
