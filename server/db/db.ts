import PostCardModel from '../../models/postcardModel'
import connection from './connection'

const db = connection

export function getAllPostCards(): Promise<PostCardModel[]> {
  return db('postcard').select('id', 'from', 'phone', 'material', 'date')
}

export function getPostCardById(id: number): Promise<PostCardModel> {
  return db('postcard')
    .where({ id })
    .select('id', 'from', 'phone', 'material', 'date')
    .first()
}

export function deletePostCard(id: number) {
  return db('postcard').where({ id }).del()
}

export function addPostCard(newCard: PostCardModel) {
  return db('postcard').insert(newCard)
}

export function updatePostCard(
  id: number,
  updatedCard: Partial<PostCardModel>,
) {
  return db('postcard').where({ id }).update(updatedCard)
}
