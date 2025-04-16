import { type NextRequest, NextResponse } from "next/server"
import { posts, authors } from "@/lib/data"

// GET /api/posts/:id - Get post by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json(post)
}

// PUT /api/posts/:id - Update a post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postIndex = posts.findIndex((p) => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

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

    // Update post
    const updatedPost = {
      ...posts[postIndex],
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      updatedAt: new Date().toISOString(),
    }

    posts[postIndex] = updatedPost

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

// DELETE /api/posts/:id - Delete a post
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const postIndex = posts.findIndex((p) => p.id === params.id)

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  // Remove post from the array
  posts.splice(postIndex, 1)

  return NextResponse.json({ success: true })
}

