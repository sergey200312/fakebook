import React, { useState } from "react";
import CommentList from "./CommentList";
import { formattedDatePost } from "../utils/DateFormatter";
import { toggleLike, toggleDislike } from "../api/postApi";
import { useMutation } from "react-query";

export default function PostItem({ post }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);

  const setDislikeMutation = useMutation(() => toggleDislike(post._id), {
    onSuccess: (data) => {
      setDislikesCount(data.count);
      console.log(data) 
    },
    onError: (error) => {
      console.error('Ошибка при изменении лайка:', error);
    }
  });

  const setLikeMutation = useMutation(() => toggleLike(post._id), {
    onSuccess: (data) => {
      setLikesCount(data.count);
      console.log(data) 
    },
    onError: (error) => {
      console.error('Ошибка при изменении лайка:', error);
    }
  });

  const handleLikeStatus = (e) => {
    e.preventDefault();
    setLikeMutation.mutate();
  };

  const handleDislikeStatus = (e) => {
    e.preventDefault();
    setDislikeMutation.mutate();
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
        <div className='flex gap-6'>
            <button type='submit' onClick={handleLikeStatus}>{likesCount}</button>
            <button type='submit' onClick={handleDislikeStatus}>{dislikesCount}</button>
        </div>
        <div>
          <CommentList postId={post._id} />
        </div>
      </div>
    </>
  );
}
