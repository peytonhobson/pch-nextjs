'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@@/components/Button/Button'
import { facilities } from '@@/data/facilities.en'
import { Card } from '@@/components/Card/Card'

const IMAGE_LINKS = facilities.map(facility => facility.images[0])

export function FacilityCard() {
  const [index, setIndex] = useState<number>(0)

  const currentFacility = facilities[index]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % facilities.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [index])

  const preloadImages = useCallback(async () => {
    try {
      await Promise.all(IMAGE_LINKS.map(preloadImage))
    } catch (error) {
      console.error('Failed to preload images:', error)
    }
  }, [])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  return (
    <Card
      className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] min-h-128"
      image={IMAGE_LINKS[index]}
      imageLoading="eager"
      title={`Facilities - ${currentFacility?.name}`}
      description={currentFacility?.summary}
      alt={currentFacility?.name}
      button={
        <Link href={`/facilities/${currentFacility?.name.toLocaleLowerCase()}`}>
          <Button variant="primary">Learn More</Button>
        </Link>
      }
    />
  )
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}
