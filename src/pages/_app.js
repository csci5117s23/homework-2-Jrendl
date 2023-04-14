// import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from "@/components/header";


export default function App({ Component, pageProps }) {
  
  return (
    <ClerkProvider {...pageProps} >
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      <Header></Header>
      <Component {...pageProps} />

    </ClerkProvider>
  )
}