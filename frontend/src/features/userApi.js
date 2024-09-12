import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api'}),
    endpoints: (builder) => ({
        getAllFriends: builder.query({
            query: () => '/friends',
            providesTags: ['Friends'],
        }),
    }),
});

exports const { useGetAllFriendsQuery } = userApi;