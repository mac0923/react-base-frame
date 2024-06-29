import { useEffect } from 'react'
import { createGlobalState, useLocalStorage } from 'react-use'
import { ThemeKey } from '@/config/storageKeys'

type ThemeType = 'dark' | 'light'
const DefaultTheme = 'light'

function getThemeFromSystem(): ThemeType | undefined {
  if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    return undefined
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
}

function getThemeFromStorage(): ThemeType | undefined {
  const v = window.localStorage.getItem(ThemeKey)
  const t = v ? JSON.stringify(v) : undefined

  if (!t || (t !== 'dark' && t !== 'light')) {
    return undefined
  }
  return t
}

function getDefaultTheme(): ThemeType {
  let t = getThemeFromStorage()

  if (t) {
    return t
  }

  t = getThemeFromSystem()
  if (t) {
    return t
  }

  return DefaultTheme
}

const defaultTheme = getDefaultTheme()

const useThemeState = createGlobalState(defaultTheme)

export function useThemeLocalStorage() {
  const [themeState, updateThemeState] = useThemeState()
  const [, updateThemeToStorage] = useLocalStorage<ThemeType | undefined | null>(ThemeKey)

  useEffect(() => {
    updateThemeState(defaultTheme)
    updateThemeToStorage(defaultTheme)
  }, [])

  const updateTheme = (theme: ThemeType) => {
    updateThemeState(theme)
    updateThemeToStorage(theme)
  }

  return [themeState, updateTheme] as const
}
