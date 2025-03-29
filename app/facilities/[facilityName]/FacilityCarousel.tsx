'use client'

import { useEffect, useState, useRef } from 'react'
import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'
import { safeSetInterval, safeClearInterval } from '../../utils/memoryLeak'
import type { Facility } from '@@/data/facilities.en'

export function FacilityCarousel({ facility }: { facility: Facility }) {
  const { images } = facility
  const [index, setIndex] = useState<number>(0)
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    // Clear existing interval if it exists
    if (intervalIdRef.current) {
      safeClearInterval(intervalIdRef.current)
      intervalIdRef.current = undefined
    }

    // Set a new interval with the safe function
    intervalIdRef.current = safeSetInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 3000)

    // Clean up on unmount
    return () => {
      if (intervalIdRef.current) {
        safeClearInterval(intervalIdRef.current)
        intervalIdRef.current = undefined
      }
    }
  }, [images.length]) // Only recreate interval when images array changes

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
