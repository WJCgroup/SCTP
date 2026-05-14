import { useState, useCallback } from 'react'
import type { DCAEntry } from '../types'

const KEY = 'sctp_dca'

function load(): DCAEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(entries: DCAEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries))
}

export function useDCA() {
  const [entries, setEntries] = useState<DCAEntry[]>(load)

  const addEntry = useCallback((entry: DCAEntry) => {
    setEntries((prev) => {
      const next = [entry, ...prev]
      save(next)
      return next
    })
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id)
      save(next)
      return next
    })
  }, [])

  return { entries, addEntry, deleteEntry }
}
