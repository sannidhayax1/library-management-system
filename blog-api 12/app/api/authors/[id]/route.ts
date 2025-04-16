import { type NextRequest, NextResponse } from "next/server"
import { authors, posts } from "@/lib/data"

// GET /api/authors/:id - Get author by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const author = authors.find((a) => a.id === params.id)

  if (!author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 })
  }

  return NextResponse.json(author)
}

// PUT /api/authors/:id - Update an author
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authorIndex = authors.findIndex((a) => a.id === params.id)

    if (authorIndex === -1) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Update author
    const updatedAuthor = {
      ...authors[authorIndex],
      name: body.name,
      email: body.email,
      bio: body.bio || authors[authorIndex].bio,
    }

    authors[authorIndex] = updatedAuthor

    return NextResponse.json(updatedAuthor)
  } catch (error) {
    console.error("Error updating author:", error)
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 })
  }
}

// DELETE /api/authors/:id - Delete an author
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authorIndex = authors.findIndex((a) => a.id === params.id)

  if (authorIndex === -1) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 })
  }

  // Remove author from the array
  authors.splice(authorIndex, 1)

  // Optional: Remove or update associated posts
  // Here we're removing all posts by this author
  const authorId = params.id
  const postsToRemove = posts.filter((post) => post.authorId === authorId)

  postsToRemove.forEach((post) => {
    const postIndex = posts.findIndex((p) => p.id === post.id)
    if (postIndex !== -1) {
      posts.splice(postIndex, 1)
    }
  })

  return NextResponse.json({ success: true })
}

