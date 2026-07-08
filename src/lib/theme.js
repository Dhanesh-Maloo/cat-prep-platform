import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cat-prep-theme'

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    // Belt-and-braces: some Tailwind v4 + Lightning CSS builds nest hand-authored
    // body rules such that `.dark body { ... }` loses to the plain `body { ... }`
    // rule despite higher specificity. Setting it inline sidesteps that entirely.
    document.body.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#f9fafb'
    document.body.style.color = theme === 'dark' ? '#e5e7eb' : '#1f2937'
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
