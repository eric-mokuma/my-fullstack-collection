import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addPostcard,
  getPostcard,
  updatePostcard,
  deletePostcardBy,
} from '../apis/postCardApi'
import PostCardModel from '../../models/postcardModel'

export function usePostCard() {
  return useQuery({
    queryKey: ['postcard'],
    queryFn: getPostcard,
  })
}

export function usePostCardById(id: number) {
  return useQuery<PostCardModel>({
    queryKey: ['postcard', id],
    queryFn: () => getPostcard(id),
    staleTime: 5000,
  })
}

export function useDeletePostCard() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePostcardBy(id),
    onSuccess: () => {
      client.invalidateQueries(['postcard'])
      alert('Postcard is deleted')
    },
    onError: (error: Error) => {
      console.error('Error deleting postcard:', error)
    },
  })
}

export function useCreatePostCard() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (postcard: PostCardModel) => addPostcard(postcard),
    onSuccess: () => {
      client.invalidateQueries(['postcard'])
      alert('Postcard is added')
    },
    onError: (error: Error) => {
      console.error('Error creating postcard:', error)
    },
  })
}

export function useUpdatePostCard() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (postcard: PostCardModel) =>
      updatePostcard(postcard.id!, postcard),
    onSuccess: () => {
      client.invalidateQueries(['postcard'])
      alert('Postcard is updated')
    },
    onError: (error: Error) => {
      console.error('Error updating postcard:', error)
    },
  })
}
