import { Router } from 'express'
import * as db from '../db/db'

const router = Router()

// GET 'api/v1/postcard'
router.get('/', async (req, res) => {
  try {
    const postCards = await db.getAllPostCards()
    res.json(postCards)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// GET 'api/v1/postcard/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const postCard = await db.getPostCardById(id)
    if (postCard) {
      res.json(postCard)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// POST 'api/v1/postcard'
router.post('/', async (req, res) => {
  const newPostCard = req.body
  try {
    await db.addPostCard(newPostCard)
    res.sendStatus(201)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// PUT 'api/v1/postcard/:id'
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const updatedPostCard = req.body
  try {
    const result = await db.updatePostCard(id, updatedPostCard)
    if (result) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// PATCH 'api/v1/postcard/:id'
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const partialUpdate = req.body

  try {
    const existingPostCard = await db.getPostCardById(id)
    if (!existingPostCard) {
      return res.sendStatus(404)
    }

    const result = await db.updatePostCard(id, partialUpdate)
    if (result) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// DELETE 'api/v1/postcard/:id'
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const result = await db.deletePostCard(id)
    if (result) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
