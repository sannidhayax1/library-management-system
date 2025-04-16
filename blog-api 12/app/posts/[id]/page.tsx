"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

interface Author {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
  author?: Author
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        // Fetch post details
        const postResponse = await fetch(`/api/posts/${params.id}`)
        const postData = await postResponse.json()

        // Fetch author details
        const authorResponse = await fetch(`/api/authors/${postData.authorId}`)
        const authorData = await authorResponse.json()

        setPost({ ...postData, author: authorData })
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <Link href="/posts" className="text-blue-600 hover:underline">
            Back to Posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/posts" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Posts
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <span>By </span>
                  <Link href={`/authors/${post.authorId}`} className="ml-1 font-medium text-blue-600 hover:underline">
                    {post.author?.name || "Unknown Author"}
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link href={`/posts?edit=${post.id}`} className="flex items-center text-blue-600 hover:text-blue-800">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </div>
              </div>
            </header>

            <div className="prose max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

