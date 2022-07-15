import '../styles/globals.css'
import 'react-notifications-component/dist/theme.css'
import type { AppProps } from 'next/app'
import { ReactNotifications } from 'react-notifications-component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ReactNotifications/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
