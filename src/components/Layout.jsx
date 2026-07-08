import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useIsAdmin } from '../api/hooks/useIsAdmin'
import { useTheme } from '../lib/theme'

export function Layout() {
  const { user, signOut } = useAuth()
  const { isAdmin } = useIsAdmin(user?.id)
  const { theme, toggleTheme } = useTheme()
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
          <Link to="/mistakes" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Mistakes</Link>
        </>
      )}
      {isAdmin && <Link to="/admin" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Admin</Link>}
      {user ? (
        <>
          <Link to="/settings" className="text-gray-400 dark:text-gray-500 text-xs hover:text-indigo-600" onClick={() => setMenuOpen(false)}>{user.email}</Link>
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

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 -m-2 rounded-lg"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )

  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-900">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 relative">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-gray-100" onClick={() => setMenuOpen(false)}>
            CAT<span className="text-indigo-600 dark:text-indigo-400">Prep</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navLinks}
            {themeToggle}
          </nav>
          <div className="flex items-center gap-1 md:hidden">
            {themeToggle}
            <button
              type="button"
              className="text-gray-600 dark:text-gray-300 p-2 -mr-2"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-900">
            {navLinks}
          </nav>
        )}
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 text-gray-800 dark:text-gray-200">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-xs text-gray-400 dark:text-gray-500">
        CAT Prep Platform - Phase 1 MVP
      </footer>
    </div>
  )
}
