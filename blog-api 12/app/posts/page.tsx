"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react"
import PostForm from "@/components/post-form"

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
}

interface PostWithAuthor extends Post {
  author?: Author
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [currentPost, setCurrentPost] = useState<PostWithAuthor | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch posts
      const postsResponse = await fetch("/api/posts")
      const postsData = await postsResponse.json()

      // Fetch authors
      const authorsResponse = await fetch("/api/authors")
      const authorsData = await authorsResponse.json()

      // Map author data to posts
      const postsWithAuthors = postsData.map((post: Post) => {
        const author = authorsData.find((a: Author) => a.id === post.authorId)
        return { ...post, author }
      })

      setPosts(postsWithAuthors)
      setAuthors(authorsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        })
        fetchData()
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  const handleEdit = (post: PostWithAuthor) => {
    setCurrentPost(post)
    setShowForm(true)
  }

  const handleFormSubmit = async (post: Omit<Post, "id" | "createdAt" | "updatedAt"> & { id?: string }) => {
    try {
      if (post.id) {
        // Update existing post
        await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
      } else {
        // Create new post
        await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
      }
      setShowForm(false)
      setCurrentPost(null)
      fetchData()
    } catch (error) {
      console.error("Error saving post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          </div>
          <button
            onClick={() => {
              setCurrentPost(null)
              setShowForm(true)
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            disabled={authors.length === 0}
          >
            <PlusCircle className="h-5 w-5" />
            Add Post
          </button>
        </div>

        {authors.length === 0 && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-700">
              You need to create at least one author before you can add posts.{" "}
              <Link href="/authors" className="font-medium underline">
                Create an author
              </Link>
            </p>
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <PostForm
              post={currentPost}
              authors={authors}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false)
                setCurrentPost(null)
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No posts found. Add your first blog post!</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-gray-500 truncate max-w-xs">{post.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{post.author?.name || "Unknown"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </Link>
                          <button onClick={() => handleEdit(post)} className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

