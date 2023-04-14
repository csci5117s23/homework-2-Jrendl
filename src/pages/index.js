import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      </Head>
      <main className="hero is-primary is-fullheight">
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <p className='title'>
              Joe's Todo App!
            </p>
            <Link className="subtitle" href='/login'>Login to start making your list!</Link>
          </div>
        </div>
      </main>
    </>
  )
}
