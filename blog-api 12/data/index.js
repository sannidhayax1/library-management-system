// In-memory data store

// Sample data
const authors = []
const posts = []

// Generate a simple UUID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Add some initial data
const author1Id = generateId()
const author2Id = generateId()

authors.push({
  id: author1Id,
  name: "Jane Doe",
  email: "jane@example.com",
  bio: "Jane is a tech enthusiast and software developer with over 5 years of experience.",
})

authors.push({
  id: author2Id,
  name: "John Smith",
  email: "john@example.com",
  bio: "John is a content creator and marketing specialist focused on emerging technologies.",
})

// Create sample posts
const now = new Date().toISOString()

posts.push({
  id: generateId(),
  title: "Getting Started with RESTful APIs",
  content:
    "RESTful APIs are a way to build web services that are lightweight, maintainable, and scalable. In this post, we'll explore the basics of REST architecture and how to design effective APIs.",
  authorId: author1Id,
  createdAt: now,
  updatedAt: now,
})

posts.push({
  id: generateId(),
  title: "Understanding Express.js Middleware",
  content:
    "Middleware functions are the backbone of Express.js applications. They have access to the request and response objects, and can perform actions on them, modify them, or terminate the request-response cycle.",
  authorId: author1Id,
  createdAt: now,
  updatedAt: now,
})

posts.push({
  id: generateId(),
  title: "The Future of Web Development",
  content:
    "Web development is constantly evolving, with new frameworks, libraries, and tools emerging every year. In this post, we'll look at some of the trends that are shaping the future of web development.",
  authorId: author2Id,
  createdAt: now,
  updatedAt: now,
})

module.exports = {
  authors,
  posts,
  generateId,
}

