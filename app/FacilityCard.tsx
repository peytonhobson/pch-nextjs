'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@@/components/Button/Button'
import { facilities } from '@@/data/facilities'
import { Card } from '@@/components/Card/Card'

const IMAGE_LINKS = facilities.map(facility => facility.images[0])

export function FacilityCard() {
  const [index, setIndex] = useState<number>(0)

  const currentFacility = facilities[index]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % facilities.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <Card
      className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] min-h-128"
      image={IMAGE_LINKS[index]}
      title={`Facilities - ${currentFacility?.name}`}
      description={currentFacility?.summary}
      alt={currentFacility?.name}
      button={
        <Link href={`/facilities/${currentFacility?.name}`}>
          <Button variant="primary" onClick={() => {}}>
            Learn More
          </Button>
        </Link>
      }
    />
  )
}
