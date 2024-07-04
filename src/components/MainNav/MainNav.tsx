import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { DesktopList } from './DesktopList'
import { HeaderBackground } from './HeaderBackground'

export function MainNav() {
  return (
    <HeaderBackground>
      <div className="mx-2 items-center justify-start cursor-pointer">
        <Link href="/" className="flex items-center">
          <img
            src="https://premier-care-homes.s3.amazonaws.com/assets/other/premier-care-homes-logo1.png"
            className="h-16 min-w-[12rem] lg:h-20 lg:min-w-[15rem] hover:cursor-pointer"
            alt="Premier Care Homes Logo"
          />
        </Link>
      </div>
      <DesktopList />
      <div className="flex-none mx-2 lg:hidden">
        <button className="btn btn-square btn-ghost">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </div>
      {/* <main-nav-mobile-list :is-open="isOpen" :list-items="listItems" /> */}
    </HeaderBackground>
  )
}
