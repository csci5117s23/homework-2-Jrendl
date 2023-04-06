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
        <title>Joe's Todo App!</title>
      </Head>
      <main className={styles.main}>
       <div>Joe's Todo App!</div>
       <Link href='/login'>Login to start making your list!</Link>
      </main>
    </>
  )
}
