import Link from 'next/link'
import type { Facility } from '@@/data/facilities'

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link
      href={`/facilities/${facility.name.toLowerCase()}`}
      className="w-5/6 md:w-2/5 xl:h-60 my-10 hover:cursor-pointer"
    >
      <div className="card lg:card-side bg-white shadow-xl h-full duration-500 hover:-translate-y-3 transition-all">
        <figure className="lg:w-full">
          <img
            className="w-full h-full"
            src={facility.images[0]}
            alt="Image of Premier Care Homes Facility"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mb-4">{facility.name}</h2>
          <p className="text-left">{facility.summary}</p>
        </div>
      </div>
    </Link>
  )
}
