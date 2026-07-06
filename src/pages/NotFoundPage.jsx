import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="btn inline-block">
        Back to Home
      </Link>
    </div>
  )
}
