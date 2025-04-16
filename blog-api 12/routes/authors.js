const express = require("express")
const router = express.Router()
const { authors, posts, generateId } = require("../data")

// GET /api/authors - Get all authors
router.get("/", (req, res) => {
  res.json(authors)
})

// GET /api/authors/:id - Get author by ID
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === req.params.id)

  if (!author) {
    return res.status(404).json({ error: "Author not found" })
  }

  res.json(author)
})

// POST /api/authors - Create a new author
router.post("/", (req, res) => {
  const { name, email, bio } = req.body

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  // Create new author
  const newAuthor = {
    id: generateId(),
    name,
    email,
    bio: bio || "",
  }

  // Add to in-memory data store
  authors.push(newAuthor)

  res.status(201).json(newAuthor)
})

// PUT /api/authors/:id - Update an author
router.put("/:id", (req, res) => {
  const authorIndex = authors.findIndex((a) => a.id === req.params.id)

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" })
  }

  const { name, email, bio } = req.body

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  // Update author
  const updatedAuthor = {
    ...authors[authorIndex],
    name,
    email,
    bio: bio || authors[authorIndex].bio,
  }

  authors[authorIndex] = updatedAuthor

  res.json(updatedAuthor)
})

// DELETE /api/authors/:id - Delete an author
router.delete("/:id", (req, res) => {
  const authorIndex = authors.findIndex((a) => a.id === req.params.id)

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" })
  }

  // Remove author from the array
  authors.splice(authorIndex, 1)

  // Optional: Remove or update associated posts
  // Here we're removing all posts by this author
  const authorId = req.params.id
  const postsToRemove = posts.filter((post) => post.authorId === authorId)

  postsToRemove.forEach((post) => {
    const postIndex = posts.findIndex((p) => p.id === post.id)
    if (postIndex !== -1) {
      posts.splice(postIndex, 1)
    }
  })

  res.json({ success: true })
})

// GET /api/authors/:id/posts - Get all posts by an author
router.get("/:id/posts", (req, res) => {
  const author = authors.find((a) => a.id === req.params.id)

  if (!author) {
    return res.status(404).json({ error: "Author not found" })
  }

  const authorPosts = posts.filter((post) => post.authorId === req.params.id)

  res.json(authorPosts)
})

module.exports = router

