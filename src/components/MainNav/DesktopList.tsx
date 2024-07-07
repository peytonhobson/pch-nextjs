'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import './MainNav.css'
import { classes } from '@@/utils/classes'
import { useHeader } from './HeaderBackground'
import { PAGE_LIST } from './MainNavMobile'

const SELECTED_CLASS = 'underline'

export function DesktopList() {
  const pathName = usePathname()
  const selectedRoute = pathName?.match(/\/\w+/)?.[0]
  const [showFacilitiesMenu, setShowFacilitiesMenu] = useState(false)

  const facilityLinks = [
    { text: 'Baxter', to: '/facilities/baxter' },
    { text: 'Hallet', to: '/facilities/hallet' },
    { text: 'Madrona', to: '/facilities/madrona' },
    { text: 'Trapper', to: '/facilities/trapper' }
  ]

  const { transparentBackground } = useHeader()

  return (
    <ul
      className={`flex-grow p-4 ml-5 mr-8 gap-5 max-w-3xl justify-between hidden lg:flex ${transparentBackground ? 'text-white' : 'text-brand-green-gray'}`}
      role="group"
    >
      {PAGE_LIST.map(page => (
        <li key={page.text} id={page.text.replace(' ', '-')}>
          {page.text === 'Facilities' ? (
            <div
              className="relative flex justify-center"
              onMouseEnter={() => setShowFacilitiesMenu(true)}
              onMouseLeave={() => setShowFacilitiesMenu(false)}
            >
              <Link
                href={page.to}
                className={classes(
                  selectedRoute === page.to ? SELECTED_CLASS : undefined,
                  'nav-list-item',
                  showFacilitiesMenu ? 'text-brand-green-gray' : undefined
                )}
                onClick={() => setShowFacilitiesMenu(false)}
                aria-current={selectedRoute === page.to ? 'page' : undefined}
              >
                {page.text}
              </Link>
              {showFacilitiesMenu && (
                <Fragment>
                  <div className="absolute top-7 h-2 w-full opacity-0" />
                  <ul className="menu bg-white border absolute top-9 w-40 p-2 rounded-box">
                    {facilityLinks.map(link => (
                      <li key={link.text}>
                        <Link
                          href={link.to}
                          className="flex justify-center text-black hover:bg-brand-green-gray hover:text-white prose"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Fragment>
              )}
            </div>
          ) : (
            <Link
              href={page.to}
              className={classes(
                pathName === page.to ? SELECTED_CLASS : undefined,
                'nav-list-item'
              )}
              aria-current={
                (page.to === '/' ? pathName === '/' : selectedRoute === page.to)
                  ? 'page'
                  : undefined
              }
            >
              {page.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
