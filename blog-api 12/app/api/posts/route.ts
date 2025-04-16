import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { posts, authors } from "@/lib/data"

// GET /api/posts - Get all posts
export async function GET() {
  return NextResponse.json(posts)
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json({ error: "Title, content, and authorId are required" }, { status: 400 })
    }

    // Validate author exists
    const authorExists = authors.some((author) => author.id === body.authorId)
    if (!authorExists) {
      return NextResponse.json({ error: "Author not found" }, { status: 400 })
    }

    // Create new post
    const now = new Date().toISOString()
    const newPost = {
      id: uuidv4(),
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      createdAt: now,
      updatedAt: now,
    }

    // Add to in-memory data store
    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

