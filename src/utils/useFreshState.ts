import { useCallback, useRef, useState } from 'react'

/** State management hook similar to useState
 * Provides state via a callback to avoid staleness
 */
export function useFreshState<T>(
  initialState: T
): [() => T, (nextState: T) => void] {
  const { 1: setHiddenState } = useState<T>(initialState)
  const stateReference = useRef<T>(initialState)

  const getState = useCallback(() => {
    return stateReference.current
  }, [])

  const setState = useCallback(
    (nextState: T) => {
      if (nextState !== stateReference.current) {
        stateReference.current = nextState
        setHiddenState(nextState)
      }
    },
    [setHiddenState]
  )

  return [getState, setState]
}
