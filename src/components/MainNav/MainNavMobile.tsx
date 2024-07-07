'use client'

import { Fragment, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useHeader } from './HeaderBackground'

export const PAGE_LIST = [
  { text: 'Home', to: '/' },
  { text: 'Services', to: '/services' },
  { text: 'Facilities', to: '/facilities' },
  { text: 'Testimonials', to: '/testimonials' },
  { text: 'About Us', to: '/about-us' }
]

export function MainNavMobile() {
  const pathname = usePathname()

  const { transparentBackground, setMobileMenuOpen, mobileMenuOpen } =
    useHeader()

  const navItemClass = useCallback(
    (to: string) => {
      const baseClass =
        'block py-2 pr-4 pl-3 md:px-0 md:py-5 hover:text-brand-green-gray text-unset font-bold text-lg md:text-base underline-offset-8 decoration-4 hover:underline bg-transparent'
      const selectedClass = 'underline text-brand-green-gray'
      return `${baseClass} ${pathname === to ? selectedClass : ''}`
    },
    [pathname]
  )

  return (
    <Fragment>
      <div className="flex-none mx-2 lg:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            color={transparentBackground && !mobileMenuOpen ? 'white' : 'black'}
          />
        </button>
      </div>

      <div className={`w-full ${!mobileMenuOpen && 'hidden'} bg-white`}>
        <ul className="flex flex-col p-4 w-full justify-evenly text-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
          {PAGE_LIST.map(listItem => (
            <li key={listItem.text}>
              <Link
                href={listItem.to}
                onClick={() => setMobileMenuOpen(false)}
                className={navItemClass(listItem.to)}
                aria-current={pathname === listItem.to ? 'page' : undefined}
              >
                {listItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}
