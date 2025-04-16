const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Import routes
const authorRoutes = require("./routes/authors")
const postRoutes = require("./routes/posts")

// Use routes
app.use("/api/authors", authorRoutes)
app.use("/api/posts", postRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running",
    endpoints: {
      authors: "/api/authors",
      posts: "/api/posts",
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  })
})

module.exports = app

