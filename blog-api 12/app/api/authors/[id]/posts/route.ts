import { type NextRequest, NextResponse } from "next/server"
import { authors, posts } from "@/lib/data"

// GET /api/authors/:id/posts - Get all posts by an author
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const author = authors.find((a) => a.id === params.id)

  if (!author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 })
  }

  const authorPosts = posts.filter((post) => post.authorId === params.id)

  return NextResponse.json(authorPosts)
}

