import { Fragment } from 'react'
import { facilities } from '@@/data/facilities.en'
import { Hero } from '@@/components/Hero/Hero'
import { FacilityCard } from './FacilityCard'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Premier Care Homes Facilities | Elegant Care Homes in Salem, Oregon',
  description: `Discover Premier Care Homes' elegant facilities in Salem, Oregon. Each home, including Baxter, Hallet, Madrona, and Trapper, offers serene living spaces tailored for exceptional care. Our homes provide a comfortable and intimate setting with private bedrooms and high-quality amenities. Visit us to learn more about our beautifully maintained care homes designed to provide the best residential care experience.`
}

// ts-unused-exports:disable-next-line
export default function FacilitiesPage() {
  return (
    <Fragment>
      <Hero
        title="FACILITIES"
        text="Elegant Living Spaces Tailored for Exceptional Care"
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/facilities-hero.jpg"
      />
      <section className="flex flex-wrap justify-evenly py-10 show-on-scroll bg-mint">
        {facilities.map(facility => (
          <FacilityCard facility={facility} key={facility.id} />
        ))}
      </section>
    </Fragment>
  )
}
