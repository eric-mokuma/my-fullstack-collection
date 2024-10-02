import React, { useState } from 'react'
import { usePostCard, useDeletePostCard } from '../hooks/postCardHook'
import AddNewPostCardForm from './AddPostCardForm'
import PostCardModel from '../../models/postcardModel'

function PostCard() {
  const { data, isLoading, isError, error } = usePostCard()
  const deleteMutation = useDeletePostCard()
  const [editingPostCard, setEditingPostCard] = useState<PostCardModel | null>(
    null,
  )

  // This should always be called and in the same order
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post card?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (postCard: PostCardModel) => {
    setEditingPostCard(postCard)
  }

  // Ensure hooks are called consistently and at the top level
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p>Error loading post cards</p>
  }

  if (!data || data.length === 0) {
    return <p>No post cards found</p>
  }

  return (
    <>
      <h1>Post Card</h1>
      {data.map((postCard) => (
        <div key={postCard.id} className="post-card">
          <h2>{postCard.from}</h2>
          <p>Phone: {postCard.phone}</p>
          <p>Material: {postCard.material}</p>
          <p>Date: {postCard.date}</p>
          <button className="edit" onClick={() => handleEdit(postCard)}>
            Edit
          </button>
          <button className="delete" onClick={() => handleDelete(postCard.id!)}>
            Delete
          </button>
        </div>
      ))}
      <AddNewPostCardForm postCardToEdit={editingPostCard} />
    </>
  )
}

export default PostCard
