import request from 'superagent'
import PostCardModel from '../../models/postcardModel'

export async function getPostcard(): Promise<PostCardModel[]> {
  const result = await request.get(`/api/v1/postcard`)
  console.log(result.body)
  return result.body
}

export async function getPostcardById(id: number): Promise<PostCardModel> {
  const result = await request.get(`/api/v1/postcard/${id}`)
  console.log(result.body)
  return result.body
}

export async function deletePostcardBy(id: number): Promise<void> {
  const result = await request.delete(`/api/v1/postcard/${id}`)
  console.log(result.statusCode)
}

export async function addPostcard(newPostCard: PostCardModel): Promise<void> {
  const result = await request.post(`/api/v1/postcard`).send(newPostCard)
  console.log(result.statusCode)
}

export async function updatePostcard(
  id: number,
  updatedPostCard: Partial<PostCardModel>,
): Promise<void> {
  const result = await request
    .patch(`/api/v1/postcard/${id}`)
    .send(updatedPostCard)
  console.log(result.statusCode)
}
