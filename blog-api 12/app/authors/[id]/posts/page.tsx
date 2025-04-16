"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Author {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function AuthorPostsPage({ params }: { params: { id: string } }) {
  const [author, setAuthor] = useState<Author | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAuthorAndPosts = async () => {
      setIsLoading(true)
      try {
        // Fetch author details
        const authorResponse = await fetch(`/api/authors/${params.id}`)
        const authorData = await authorResponse.json()
        setAuthor(authorData)

        // Fetch author's posts
        const postsResponse = await fetch(`/api/authors/${params.id}/posts`)
        const postsData = await postsResponse.json()
        setPosts(postsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthorAndPosts()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Author not found</h2>
          <Link href="/authors" className="text-blue-600 hover:underline">
            Back to Authors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/authors" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Authors
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Posts by {author.name}</h1>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">This author hasn't written any posts yet.</p>
            <Link href="/posts" className="mt-4 inline-block text-blue-600 hover:underline">
              View All Posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

