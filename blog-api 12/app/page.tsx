import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog API Dashboard</h1>
          <p className="text-lg text-gray-600">A RESTful API for managing blog posts and authors</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/authors" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authors</h2>
            <p className="text-gray-600 mb-4">Manage blog authors</p>
            <div className="text-blue-600 font-medium">View Authors →</div>
          </Link>

          <Link href="/posts" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Blog Posts</h2>
            <p className="text-gray-600 mb-4">Manage blog posts</p>
            <div className="text-blue-600 font-medium">View Posts →</div>
          </Link>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Authors</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">GET /api/authors</code> - Get all authors
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">GET /api/authors/:id</code> - Get author by ID
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">POST /api/authors</code> - Create a new author
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">PUT /api/authors/:id</code> - Update an author
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">DELETE /api/authors/:id</code> - Delete an author
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">GET /api/authors/:id/posts</code> - Get all posts by
                  an author
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Blog Posts</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">GET /api/posts</code> - Get all posts
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">GET /api/posts/:id</code> - Get post by ID
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">POST /api/posts</code> - Create a new post
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">PUT /api/posts/:id</code> - Update a post
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">DELETE /api/posts/:id</code> - Delete a post
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

