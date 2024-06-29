import { Box } from '@radix-ui/themes'
import { t } from '@lingui/macro'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import './Header.scss'
import { useI18nLocalStorage } from '@/libs/i18n'
import { useThemeLocalStorage } from '@/libs/theme'

function NavContainer() {
  return (
    <>
      <div className="nav-item">{t`Development tool`}</div>
    </>
  )
}

function LanguageButton() {
  const [local, setLocal] = useI18nLocalStorage()

  const updateLocal = () => {
    setLocal(local === 'zh' ? 'en' : 'zh')
  }

  return (
    <>
      <div className="language-button" onClick={updateLocal}>
        {local === 'zh' ? 'EN' : '中'}
      </div>
    </>
  )
}

function ThemeButton() {
  const [theme, setTheme] = useThemeLocalStorage()

  const updateTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <div className="theme-button" onClick={updateTheme}>
        {theme === 'dark' ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>}
      </div>
    </>
  )
}

export default function Header() {
  return (
    <>
      <Box
        width="100%"
        height={'54px'}
        top={'0'}
        style={{
          background: 'var(--color-background)',
          borderBottom: '1px solid var(--gray-7)',
        }}
        position="sticky"
      >
        <div className="Header">
          <div className="left-container">
            <div className="logo"></div>
            <div className="nav">
              <NavContainer />
            </div>
          </div>
          <div className="right-container">
            <ThemeButton></ThemeButton>
            <LanguageButton></LanguageButton>
          </div>
        </div>
      </Box>
    </>
  )
}
