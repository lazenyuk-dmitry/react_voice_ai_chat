import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(key: string, initialState: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialState
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialState
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state]);

  const reset = () => {
    localStorage.setItem(key, JSON.stringify(initialState))
    setState(initialState)
  }

  const remove = () => {
    localStorage.removeItem(key)
    setState(initialState)
  }

  return [state, setState, reset, remove] as const;
}
