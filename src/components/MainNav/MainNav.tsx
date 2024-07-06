import Link from 'next/link'
import { DesktopList } from './DesktopList'
import { HeaderBackground } from './HeaderBackground'
import { MainNavMobile } from './MainNavMobile'

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
      <MainNavMobile />
    </HeaderBackground>
  )
}
