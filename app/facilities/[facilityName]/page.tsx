import { Fragment } from 'react'
import { facilities } from '@@/data/facilities.en'
import { FacilityCard } from '../FacilityCard'
import { MapDirections } from './MapDirections'
import { FacilityCarousel } from './FacilityCarousel'

export default function FacilityPage({
  params: { facilityName }
}: {
  params: { facilityName: string }
}) {
  console.log(facilityName)

  const facility = facilities.find(f => f.name.toLowerCase() === facilityName)

  const otherFacilities = facilities.filter(
    f => f.name.toLowerCase() !== facilityName
  )

  if (facility === undefined) return <Fragment />

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
      <section className=" pt-12">
        <h2 className="text-4xl font-semibold text-center">
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