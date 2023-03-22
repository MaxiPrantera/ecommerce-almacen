import 'npm install typescript @types/react @types/react-dom @types/node --save-dev/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
