import { useState, useCallback } from 'react'
import type { Position } from '../types'

const KEY = 'sctp_positions'

function load(): Position[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(positions: Position[]) {
  localStorage.setItem(KEY, JSON.stringify(positions))
}

export function usePortfolio() {
  const [positions, setPositions] = useState<Position[]>(load)

  const upsertPosition = useCallback((pos: Position) => {
    setPositions((prev) => {
      const next = prev.filter((p) => p.symbol !== pos.symbol)
      if (pos.shares > 0) next.push(pos)
      save(next)
      return next
    })
  }, [])

  const deletePosition = useCallback((symbol: string) => {
    setPositions((prev) => {
      const next = prev.filter((p) => p.symbol !== symbol)
      save(next)
      return next
    })
  }, [])

  return { positions, upsertPosition, deletePosition }
}
