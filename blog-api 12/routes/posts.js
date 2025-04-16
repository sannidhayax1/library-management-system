const express = require("express")
const router = express.Router()
const { posts, authors, generateId } = require("../data")

// GET /api/posts - Get all posts
router.get("/", (req, res) => {
  res.json(posts)
})

// GET /api/posts/:id - Get post by ID
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id)

  if (!post) {
    return res.status(404).json({ error: "Post not found" })
  }

  res.json(post)
})

// POST /api/posts - Create a new post
router.post("/", (req, res) => {
  const { title, content, authorId } = req.body

  // Validate required fields
  if (!title || !content || !authorId) {
    return res.status(400).json({ error: "Title, content, and authorId are required" })
  }

  // Validate author exists
  const authorExists = authors.some((author) => author.id === authorId)
  if (!authorExists) {
    return res.status(400).json({ error: "Author not found" })
  }

  // Create new post
  const now = new Date().toISOString()
  const newPost = {
    id: generateId(),
    title,
    content,
    authorId,
    createdAt: now,
    updatedAt: now,
  }

  // Add to in-memory data store
  posts.push(newPost)

  res.status(201).json(newPost)
})

// PUT /api/posts/:id - Update a post
router.put("/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id)

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" })
  }

  const { title, content, authorId } = req.body

  // Validate required fields
  if (!title || !content || !authorId) {
    return res.status(400).json({ error: "Title, content, and authorId are required" })
  }

  // Validate author exists
  const authorExists = authors.some((author) => author.id === authorId)
  if (!authorExists) {
    return res.status(400).json({ error: "Author not found" })
  }

  // Update post
  const updatedPost = {
    ...posts[postIndex],
    title,
    content,
    authorId,
    updatedAt: new Date().toISOString(),
  }

  posts[postIndex] = updatedPost

  res.json(updatedPost)
})

// DELETE /api/posts/:id - Delete a post
router.delete("/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id)

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" })
  }

  // Remove post from the array
  posts.splice(postIndex, 1)

  res.json({ success: true })
})

module.exports = router

