import Link from 'next/link'
import NextImage from 'next/image'
import type { Facility } from '@@/data/facilities.en'

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link
      href={`/facilities/${facility.name.toLowerCase()}`}
      className="w-5/6 md:w-2/5 xl:h-60 my-10 hover:cursor-pointer"
    >
      <div className="card lg:card-side bg-white shadow-xl h-full duration-500 hover:-translate-y-3 transition-all overflow-hidden">
        <div className="lg:w-full lg:h-full relative min-h-[175px] lg:min-h-auto">
          <NextImage
            src={facility.images[0]}
            className="object-cover"
            fill
            alt="Image of Premier Care Homes Facility"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title mb-4">{facility.name}</h2>
          <p className="text-left">{facility.summary}</p>
        </div>
      </div>
    </Link>
  )
}
