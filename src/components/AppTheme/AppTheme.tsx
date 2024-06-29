import { useEffect } from 'react'
import { Theme } from '@radix-ui/themes'

import { useThemeLocalStorage } from '@/libs/theme'

export default function AppTheme({ children }: { children: React.ReactElement }) {
  const [theme, updateTheme] = useThemeLocalStorage()

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        updateTheme(e.media.includes('dark') ? 'dark' : 'light')
      }
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)')

    darkModeQuery.addEventListener('change', handleChange)
    lightModeQuery.addEventListener('change', handleChange)

    return () => {
      darkModeQuery.removeEventListener('change', handleChange)
      lightModeQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <>
      <Theme appearance={theme} accentColor="green">
        {children}
      </Theme>
    </>
  )
}
