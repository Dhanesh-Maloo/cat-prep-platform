import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useIsAdmin } from '../api/hooks/useIsAdmin'

export function Layout() {
  const { user, signOut } = useAuth()
  const { isAdmin } = useIsAdmin(user?.id)
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-y-2">
          <Link to="/" className="text-lg font-semibold text-gray-900">
            CAT<span className="text-indigo-600">Prep</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-gray-600 flex-wrap">
            <Link to="/syllabus" className="hover:text-indigo-600">Syllabus</Link>
            <Link to="/mock-tests" className="hover:text-indigo-600">Mock Tests</Link>
            <Link to="/analytics" className="hover:text-indigo-600">Analytics</Link>
            <Link to="/resources" className="hover:text-indigo-600">Resources</Link>
            {user && (
              <>
                <Link to="/planner" className="hover:text-indigo-600">Planner</Link>
                <Link to="/bookmarks" className="hover:text-indigo-600">Bookmarks</Link>
              </>
            )}
            {isAdmin && <Link to="/admin" className="hover:text-indigo-600">Admin</Link>}
            {user ? (
              <>
                <Link to="/settings" className="text-gray-400 text-xs hover:text-indigo-600">{user.email}</Link>
                <button type="button" onClick={handleLogout} className="hover:text-indigo-600">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-600">Log in</Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        CAT Prep Platform - Phase 1 MVP
      </footer>
    </div>
  )
}
