import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Premier Care Homes',
  description: 'When only the best will do.'
}

// ts-unused-exports:disable-next-line
export default function LocationsPage() {
  return (
    <Fragment>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-7.jpg"
        title="LOCATIONS"
      />
      <div className="flex flex-wrap w-full items-center justify-center bg-mint lg:h-screen">
        <div className="flex items-center justify-center w-full h-full py-20 px-10">
          <iframe
            className="h-144 w-full card"
            src="https://storage.googleapis.com/maps-solutions-vc5lhmrtc4/locator-plus/4rmr/locator-plus.html"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Fragment>
  )
}
