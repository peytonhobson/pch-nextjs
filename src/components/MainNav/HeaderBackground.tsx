'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type HeaderContextType = {
  transparentBackground: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

const NAV_CLASSES =
  'navbar w-full py-2 fixed flex flex-wrap justify-between items-center top-0 z-10 px-0 transition-colors duration-500 ease'

export function HeaderBackground({ children }: { children: React.ReactNode }) {
  const [transparentBackground, setTransparentBackground] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setTransparentBackground(false)
      } else {
        setTransparentBackground(true)
      }
    }

    if (window.scrollY > 10) setTransparentBackground(false)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HeaderContext.Provider
      value={{ transparentBackground, mobileMenuOpen, setMobileMenuOpen }}
    >
      <nav
        className={`${NAV_CLASSES} ${transparentBackground && !mobileMenuOpen ? 'bg-transparent' : 'bg-white'}`}
      >
        {children}
      </nav>
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}
