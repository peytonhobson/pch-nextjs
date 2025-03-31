import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import { facilities } from '@@/data/facilities.en'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title:
    'Premier Care Homes Locations | Find a Care Home Near You in Salem, Oregon',
  description:
    'Locate Premier Care Homes facilities in Salem, Oregon. We offer a range of residential care homes, each providing personalized and compassionate care for seniors. Explore our locations to find the nearest home and learn more about the unique features and services available at each site. Contact us for more information or to schedule a visit.'
}

const formattedAddresses = facilities
  .map(facility => {
    // Replace spaces with + and include the name for better labeling
    const formattedAddress = facility.address.replace(/\s+/g, '+')
    return encodeURIComponent(`${facility.name}+${formattedAddress}`)
  })
  .join('|')

// Create Google Maps URL with multiple locations using the "search" mode
const googleMapsUrl = `https://www.google.com/maps/embed/v1/search?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${formattedAddresses}`

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
            src={googleMapsUrl}
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Fragment>
  )
}
