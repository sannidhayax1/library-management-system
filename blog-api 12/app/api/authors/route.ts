import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { authors } from "@/lib/data"

// GET /api/authors - Get all authors
export async function GET() {
  return NextResponse.json(authors)
}

// POST /api/authors - Create a new author
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Create new author
    const newAuthor = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      bio: body.bio || "",
    }

    // Add to in-memory data store
    authors.push(newAuthor)

    return NextResponse.json(newAuthor, { status: 201 })
  } catch (error) {
    console.error("Error creating author:", error)
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
  }
}

