'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'
import type { Facility } from '@@/data/facilities.en'

export function FacilityCarousel({ facility }: { facility: Facility }) {
  const { images } = facility

  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length, index])

  return (
    <Card className="h-80 w-full md:max-w-lg lg:max-h-full rounded-none md:rounded-2xl relative overflow-hidden">
      <NextImage
        src={images[index]}
        alt="Image of Premier Care Homes Facility"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
      />
    </Card>
  )
}
