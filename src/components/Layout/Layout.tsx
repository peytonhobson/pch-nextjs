import { Fragment } from 'react'
import { Open_Sans } from 'next/font/google'
import { Footer } from '../Footer/Footer'
import { MainNav } from '../MainNav/MainNav'

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin']
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={openSans.className}>
      <MainNav />
      {children}
      <Footer />
    </div>
  )
}
