import Link from 'next/link'
import NextImage from 'next/image'
import { DesktopList } from './DesktopList'
import { HeaderBackground } from './HeaderBackground'
import { MainNavMobile } from './MainNavMobile'

export function MainNav() {
  return (
    <HeaderBackground>
      <div className="mx-2 items-center justify-start cursor-pointer">
        <Link href="/" className="flex items-center">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/assets/other/premier-care-homes-logo1.png"
            height={80}
            width={240}
            className=" hover:cursor-pointer"
            alt="Premier Care Homes Logo"
          />
        </Link>
      </div>
      <DesktopList />
      <MainNavMobile />
    </HeaderBackground>
  )
}
