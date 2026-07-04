import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useIsAdmin } from '../api/hooks/useIsAdmin'

export function Layout() {
  const { user, signOut } = useAuth()
  const { isAdmin } = useIsAdmin(user?.id)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    setMenuOpen(false)
    await signOut()
    navigate('/')
  }

  const navLinks = (
    <>
      <Link to="/syllabus" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Syllabus</Link>
      <Link to="/mock-tests" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Mock Tests</Link>
      <Link to="/analytics" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Analytics</Link>
      <Link to="/resources" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Resources</Link>
      {user && (
        <>
          <Link to="/planner" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Planner</Link>
          <Link to="/bookmarks" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Bookmarks</Link>
        </>
      )}
      {isAdmin && <Link to="/admin" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Admin</Link>}
      {user ? (
        <>
          <Link to="/settings" className="text-gray-400 text-xs hover:text-indigo-600" onClick={() => setMenuOpen(false)}>{user.email}</Link>
          <button type="button" onClick={handleLogout} className="text-left hover:text-indigo-600">
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Log in</Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 inline-block w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </Link>
        </>
      )}
    </>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-gray-900" onClick={() => setMenuOpen(false)}>
            CAT<span className="text-indigo-600">Prep</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {navLinks}
          </nav>
          <button
            type="button"
            className="md:hidden text-gray-600 p-2 -mr-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-200 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600 bg-white">
            {navLinks}
          </nav>
        )}
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
