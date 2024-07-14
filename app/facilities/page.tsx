import { Fragment } from 'react'
import { facilities } from '@@/data/facilities.en'
import { Hero } from '@@/components/Hero/Hero'
import { FacilityCard } from './FacilityCard'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Premier Care Homes',
  description: 'When only the best will do.'
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
