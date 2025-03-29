import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title:
    'Premier Care Homes Locations | Find a Care Home Near You in Salem, Oregon',
  description:
    'Locate Premier Care Homes facilities in Salem, Oregon. We offer a range of residential care homes, each providing personalized and compassionate care for seniors. Explore our locations to find the nearest home and learn more about the unique features and services available at each site. Contact us for more information or to schedule a visit.'
}

// ts-unused-exports:disable-next-line
export default function LocationsPage() {
  console.log('Navigated to Locations')

  return (
    <Fragment>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-7.jpg"
        title="LOCATIONS"
      />
      <div className="flex flex-wrap w-full items-center justify-center bg-mint lg:h-screen">
        <div className="flex items-center justify-center w-full h-full py-20 px-10">
          <iframe
            className="h-full w-full card"
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
