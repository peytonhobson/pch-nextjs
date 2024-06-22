import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DesktopList } from './DesktopList'

export function MainNav() {
  // const navClass = computed(() => {
  //       return {
  //         ["navbar-main"]: true,
  //         ["bg-transparent"]:
  //           transparentBackground.value &&
  //           !isOpen.value &&
  //           !route.path.match(/\/(facilities\/)/g),
  //         ["bg-white shadow-md"]:
  //           !transparentBackground.value ||
  //           isOpen.value ||
  //           route.path.match(/\/(facilities\/)/g),
  //       };
  //     });

  // TODO: ClassName
  return (
    <nav
      className="navbar w-full py-2 xl:h-[12vh] fixed flex flex-wrap justify-between items-center top-0 z-50 px-0;
  transition: background-color 0.5s ease 0s;"
    >
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
      <div v-else className="flex-none mx-2">
        <button className="btn btn-square btn-ghost">
          <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
        </button>
      </div>
      {/* <main-nav-mobile-list :is-open="isOpen" :list-items="listItems" /> */}
    </nav>
  )
}
