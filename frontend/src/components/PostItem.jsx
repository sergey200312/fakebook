import React, { useState } from "react";
import CommentList from "./CommentList";
import { formattedDatePost } from "../utils/DateFormatter";
import { toggleLike } from "../api/postApi";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";

export default function PostItem({ post }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const mutation = useMutation(() => toggleLike(post._id), {
    onSuccess: (data) => {
      setLikesCount(data.count); 
    },
    onError: (error) => {
      console.error('Ошибка при изменении лайка:', error);
    }
  });

  const handleLikeStatus = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <div key={post._id} className="mb-5 p-2 text-white ">
        <div className="flex justify-between mb-2">
          <p>
            {post.user.firstName} {post.user.lastName}
          </p>
          <p>{formattedDatePost(post.createdAt)}</p>
        </div>
        <p>{post.content}</p>
        <div>
            <button type='submit' onClick={handleLikeStatus}>{post.likes.isLikes} {likesCount}</button>
        </div>
        <div>
          <CommentList postId={post._id} />
        </div>
      </div>
    </>
  );
}
