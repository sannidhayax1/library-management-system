// In-memory data store

export interface Author {
  id: string
  name: string
  email: string
  bio: string
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

// Sample data
export const authors: Author[] = []
export const posts: Post[] = []

// Add some initial data
import { v4 as uuidv4 } from "uuid"

// Create sample authors
const author1Id = uuidv4()
const author2Id = uuidv4()

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
  id: uuidv4(),
  title: "Getting Started with RESTful APIs",
  content:
    "RESTful APIs are a way to build web services that are lightweight, maintainable, and scalable. In this post, we'll explore the basics of REST architecture and how to design effective APIs.\n\nREST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. RESTful APIs use HTTP requests to perform CRUD operations (Create, Read, Update, Delete) on resources, which are represented as URLs.\n\nThe key principles of REST include:\n- Statelessness\n- Client-server architecture\n- Cacheability\n- Layered system\n- Uniform interface",
  authorId: author1Id,
  createdAt: now,
  updatedAt: now,
})

posts.push({
  id: uuidv4(),
  title: "Understanding Express.js Middleware",
  content:
    "Middleware functions are the backbone of Express.js applications. They have access to the request and response objects, and can perform actions on them, modify them, or terminate the request-response cycle.\n\nIn this post, we'll dive deep into how middleware works in Express and how you can leverage it to build robust web applications.\n\nMiddleware functions can perform the following tasks:\n- Execute any code\n- Make changes to the request and response objects\n- End the request-response cycle\n- Call the next middleware in the stack",
  authorId: author1Id,
  createdAt: now,
  updatedAt: now,
})

posts.push({
  id: uuidv4(),
  title: "The Future of Web Development",
  content:
    "Web development is constantly evolving, with new frameworks, libraries, and tools emerging every year. In this post, we'll look at some of the trends that are shaping the future of web development.\n\nServerless architectures are becoming increasingly popular, allowing developers to focus on writing code without worrying about infrastructure. This approach can lead to more scalable and cost-effective applications.\n\nWebAssembly is another technology that's gaining traction, enabling high-performance code to run in the browser. This opens up new possibilities for web applications, including games, video editing, and more.",
  authorId: author2Id,
  createdAt: now,
  updatedAt: now,
})

