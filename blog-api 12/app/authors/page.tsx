"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react"
import AuthorForm from "@/components/author-form"

interface Author {
  id: string
  name: string
  email: string
  bio: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null)

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/authors")
      const data = await response.json()
      setAuthors(data)
    } catch (error) {
      console.error("Error fetching authors:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this author?")) {
      try {
        await fetch(`/api/authors/${id}`, {
          method: "DELETE",
        })
        fetchAuthors()
      } catch (error) {
        console.error("Error deleting author:", error)
      }
    }
  }

  const handleEdit = (author: Author) => {
    setCurrentAuthor(author)
    setShowForm(true)
  }

  const handleFormSubmit = async (author: Omit<Author, "id"> & { id?: string }) => {
    try {
      if (author.id) {
        // Update existing author
        await fetch(`/api/authors/${author.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(author),
        })
      } else {
        // Create new author
        await fetch("/api/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(author),
        })
      }
      setShowForm(false)
      setCurrentAuthor(null)
      fetchAuthors()
    } catch (error) {
      console.error("Error saving author:", error)
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
            <h1 className="text-3xl font-bold text-gray-900">Authors</h1>
          </div>
          <button
            onClick={() => {
              setCurrentAuthor(null)
              setShowForm(true)
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5" />
            Add Author
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <AuthorForm
              author={currentAuthor}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false)
                setCurrentAuthor(null)
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading authors...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {authors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No authors found. Add your first author!</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {authors.map((author) => (
                    <tr key={author.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{author.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{author.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 truncate max-w-xs">{author.bio}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link href={`/authors/${author.id}/posts`} className="text-blue-600 hover:text-blue-900">
                            View Posts
                          </Link>
                          <button onClick={() => handleEdit(author)} className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(author.id)} className="text-red-600 hover:text-red-900">
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

