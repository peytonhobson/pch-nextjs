import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const SELECTED_CLASS = 'underline-offset-8 underline text-brand-green-gray'

export function DesktopList() {
  const pathName = usePathname()

  const selectedRoute = pathName?.match(/\/\w+/)?.[0]

  const [showFacilitiesMenu, setShowFacilitiesMenu] = useState(false)

  const facilityLinks = [
    { text: 'Baxter', to: '/facilities/Baxter' },
    { text: 'Hallet', to: '/facilities/Hallet' },
    { text: 'Madrona', to: '/facilities/Madrona' },
    { text: 'Trapper', to: '/facilities/Trapper' }
  ]

  return (
    <ul
      className="flex flex-grow p-4 ml-5 mr-8 gap-5 max-w-3xl justify-between"
      role="group"
    >
      <li id="Home">
        <Link
          href="/"
          className={pathName === '/' ? SELECTED_CLASS : undefined}
        >
          Home
        </Link>
      </li>
      <li id="Services">
        <Link
          href="/services"
          className={selectedRoute === '/services' ? SELECTED_CLASS : undefined}
        >
          Services
        </Link>
      </li>
      <li
        id="Facilities"
        className="relative flex justify-center"
        onMouseEnter={() => setShowFacilitiesMenu(true)}
        onMouseLeave={() => setShowFacilitiesMenu(false)}
      >
        <Link
          href="/facilities"
          className={
            selectedRoute === '/facilities' ? SELECTED_CLASS : undefined
          }
          aria-current="page"
        >
          Facilities
        </Link>
        {showFacilitiesMenu && (
          <ul className="menu bg-base-100 border absolute top-9 w-40 p-2 rounded-box">
            {facilityLinks.map(link => (
              <li key={link.text}>
                <Link
                  href={link.to}
                  className="flex justify-center text-black hoverbg-brand-green-gray hovertext-white prose"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li id="Testimonials">
        <Link
          href="/testimonials"
          className={
            selectedRoute === '/testimonials' ? SELECTED_CLASS : undefined
          }
          aria-current="page"
        >
          Testimonials
        </Link>
      </li>
      <li id="About-Us">
        <Link
          href="/about-us"
          className={selectedRoute === '/about-us' ? SELECTED_CLASS : undefined}
          aria-current="page"
        >
          About Us
        </Link>
      </li>
    </ul>
  )
}
