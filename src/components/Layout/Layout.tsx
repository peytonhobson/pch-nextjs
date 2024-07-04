import { Fragment } from 'react'
import { Footer } from '../Footer/Footer'
import { MainNav } from '../MainNav/MainNav'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <MainNav />
      <div id="scroll-trigger"></div>
      {children}
      <Footer />
    </Fragment>
  )
}
