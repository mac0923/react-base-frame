import { ReactElement } from 'react'
import { HashRouter } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'

import './App.scss'
import { wagmiConfig } from '@/config/wagmi-config'
import AppTheme from '@/components/AppTheme/AppTheme'
import FullRouter from '@/router/FullRouter'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useI18nLocalStorage } from '@/libs/i18n'

function FullApp({ children }: { children: ReactElement }) {
  return (
    <>
      <Header></Header>
      <div className="Container">{children}</div>
      {/* <ThemePanel></ThemePanel> */}
      <Footer></Footer>
    </>
  )
}

function App() {
  useI18nLocalStorage()

  return (
    <>
      <I18nProvider i18n={i18n}>
        <WagmiProvider config={wagmiConfig}>
          <AppTheme>
            <FullApp>
              <HashRouter>
                <FullRouter></FullRouter>
              </HashRouter>
            </FullApp>
          </AppTheme>
        </WagmiProvider>
      </I18nProvider>
    </>
  )
}

export default App
