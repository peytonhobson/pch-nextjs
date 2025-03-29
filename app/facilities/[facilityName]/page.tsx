import { Fragment } from 'react'
import { facilities } from '@@/data/facilities.en'
import { FacilityCard } from '../FacilityCard'
import { MapDirections } from './MapDirections'
import { FacilityCarousel } from './FacilityCarousel'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title:
    'Premier Care Homes Facilities | Quality Residential Care in Salem, Oregon',
  description: `Discover the quality residential care facilities at Premier Care Homes in Salem, Oregon. Each of our homes, including Baxter, Hallet, Madrona, and Trapper, offers personalized and compassionate care tailored to meet the needs of our residents. Learn more about our serene living environments and high caregiver-to-resident ratio. Contact us to schedule a visit and see why families trust us with their loved ones' care.`
}

// Helper function to monitor memory on page load/unload
function logMemoryUsage(facilityName: string) {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const memoryUsage = process.memoryUsage()

    // In production, log minimal information
    if (process.env.NODE_ENV === 'production') {
      // Only log high usage in production to avoid excessive logs
      const memoryUsedPercentage =
        (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
      if (memoryUsedPercentage > 75) {
        console.warn(
          `[Memory] High usage on ${facilityName} page: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB (${memoryUsedPercentage.toFixed(1)}%)`
        )
      }
    } else {
      // In development, log detailed information
      console.log(`[MEMORY] ${facilityName} page:`)
      console.log(`  RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`)
      console.log(
        `  Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
      )
      console.log(
        `  Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
      )
    }
  }
}

// ts-unused-exports:disable-next-line
export default function FacilityPage({
  params: { facilityName }
}: {
  params: { facilityName: string }
}) {
  const facility = facilities.find(f => f.name.toLowerCase() === facilityName)

  const otherFacilities = facilities.filter(
    f => f.name.toLowerCase() !== facilityName
  )

  if (facility === undefined) return <Fragment />

  // Log page visit and current memory usage
  console.count(`Navigated to ${facilityName}`)
  logMemoryUsage(facilityName)

  // TODO: Move some of this to layout.js
  return (
    <div className="pt-[96px] bg-mint">
      <div className="flex-col flex lg:flex-row lg:min-h-[88vh] md:py-10 md:px-20 gap-10 lg:gap-20 md:justify-center items-center">
        <FacilityCarousel facility={facility} />

        <div className="prose w-5/6 md:w-full md:max-w-lg lg:max-w-xl flex-col">
          <h2 className="mb-5 text-left">{facility.name}</h2>
          <p className="text-left " style={{ whiteSpace: 'pre-line' }}>
            {facility?.description}
          </p>
          <MapDirections locationLink={facility.location} />
        </div>
      </div>
      <section className="pt-12">
        <h2 className="w-5/6 w-auto text-4xl font-semibold text-center">
          See Our Other Facilities
        </h2>
        <div className="flex flex-wrap justify-around pt-5 pb-10 show-on-scroll">
          {otherFacilities.map(otherFacility => (
            <FacilityCard key={otherFacility.id} facility={otherFacility} />
          ))}
        </div>
      </section>
    </div>
  )
}
