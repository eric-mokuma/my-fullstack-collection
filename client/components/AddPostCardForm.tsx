import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PostCard from '../../models/postcardModel'
import { addPostcard, updatePostcard } from '../apis/postCardApi'

interface Props {
  postCardToEdit: PostCard | null
}

const AddNewPostCardForm: React.FC<Props> = ({ postCardToEdit }) => {
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState<PostCard>({
    from: '',
    phone: '',
    material: '',
    date: '',
  })

  const addMutation = useMutation({
    mutationFn: addPostcard,
    onSuccess: () => {
      queryClient.invalidateQueries(['postcard'])
      setFormState({ from: '', phone: '', material: '', date: '' })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (updatedPostCard: Partial<PostCard>) =>
      updatePostcard(postCardToEdit!.id!, updatedPostCard),
    onSuccess: () => {
      queryClient.invalidateQueries(['postcard'])
      setFormState({ from: '', phone: '', material: '', date: '' })
    },
  })

  useEffect(() => {
    if (postCardToEdit) {
      setFormState(postCardToEdit)
    }
  }, [postCardToEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (postCardToEdit) {
      updateMutation.mutate(formState)
    } else {
      addMutation.mutate(formState)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{postCardToEdit ? 'Edit Post Card' : 'Add New Post Card'}</h2>
      <label>
        From:
        <input
          type="text"
          name="from"
          value={formState.from}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Material:
        <input
          type="text"
          name="material"
          value={formState.material}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={formState.date}
          onChange={handleChange}
          required
        />
      </label>
      <button className="add-button" type="submit">
        {postCardToEdit ? 'Update Post Card' : 'Add Post Card'}
      </button>
    </form>
  )
}

export default AddNewPostCardForm
