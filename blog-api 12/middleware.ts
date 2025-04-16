import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Log all API requests
  if (request.nextUrl.pathname.startsWith("/api/")) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`)
  }

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }

  return NextResponse.next()
}

// Configure middleware to run only on API routes and OPTIONS requests
export const config = {
  matcher: ["/api/:path*"],
}

