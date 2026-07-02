import { useState } from 'react'

const BUTTONS = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

export function Calculator({ onClose }) {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')

  function press(btn) {
    if (btn === '=') {
      try {
        // eslint-disable-next-line no-new-func
        const value = Function(`"use strict"; return (${expression || display})`)()
        setDisplay(String(value))
        setExpression(String(value))
      } catch {
        setDisplay('Error')
        setExpression('')
      }
      return
    }
    const next = (expression === '0' ? '' : expression) + btn
    setExpression(next)
    setDisplay(next)
  }

  function clear() {
    setDisplay('0')
    setExpression('')
  }

  return (
    <div className="w-56 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">Calculator</span>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 text-sm">✕</button>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded px-2 py-2 text-right font-mono text-lg mb-2 truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {BUTTONS.map((btn) => (
          <button
            key={btn}
            type="button"
            onClick={() => press(btn)}
            className="bg-gray-100 hover:bg-indigo-100 rounded py-1.5 text-sm font-medium text-gray-700"
          >
            {btn}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-1.5 w-full bg-red-50 hover:bg-red-100 text-red-600 rounded py-1.5 text-sm font-medium"
      >
        Clear
      </button>
    </div>
  )
}
