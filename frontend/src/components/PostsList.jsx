import React, { useState } from "react";
import { useQuery } from "react-query";
import { getFeed, getPosts } from "../api/postApi";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";

export default function PostsList({ feedType }) {
  const { id } = useParams();
  const fetchFunction = feedType === "feed" ? getFeed : getPosts;
  const { data, isLoading } = useQuery(["posts", feedType, id], () =>
    fetchFunction(feedType === "feed" ? "" : id)
  );
  console.log(data);

  if (isLoading) return <div>Загрузка..</div>;

  return (
      <div className="px-10">
        <p className='text-white font-bold text-2xl mb-4'>Посты</p>
        <div className="flex flex-col items-start">
          {data?.posts.map((post) => (
            <div className="w-full border-2 border-gray-900 mb-5">
              <PostItem post={post} />
            </div>
          ))}
        </div>
      </div>
  );
}
