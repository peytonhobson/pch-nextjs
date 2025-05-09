'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState, useRef } from 'react'
import { Button } from '@@/components/Button/Button'
import { facilities } from '@@/data/facilities.en'
import { Card } from '@@/components/Card/Card'
import { safeSetInterval, safeClearInterval } from './utils/memoryLeak'

const IMAGE_LINKS = facilities.map(facility => facility.images[0])

export function FacilityCard() {
  const [index, setIndex] = useState<number>(0)
  const [currentFacility, setCurrentFacility] = useState(facilities[index])
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    // Clear any existing interval first
    if (intervalIdRef.current) {
      safeClearInterval(intervalIdRef.current)
      intervalIdRef.current = undefined
    }

    // Create and track new interval with the safer function
    intervalIdRef.current = safeSetInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % facilities.length)
    }, 4000)

    return () => {
      if (intervalIdRef.current) {
        safeClearInterval(intervalIdRef.current)
        intervalIdRef.current = undefined
      }
    }
  }, [])

  // Update current facility when index changes
  useEffect(() => {
    setCurrentFacility(facilities[index])
  }, [index])

  return (
    <Card
      className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] "
      image={IMAGE_LINKS[index]}
      imageLoading="lazy"
      onImageLoad={useCallback(
        () => setCurrentFacility(facilities[index]),
        [index]
      )}
      imageProps={{
        sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw'
      }}
      title={`Facilities - ${currentFacility?.name}`}
      description={currentFacility?.summary}
      alt={currentFacility?.name}
      button={
        <Link href={`/facilities/${currentFacility?.name.toLocaleLowerCase()}`}>
          <Button variant="primary" className="mt-10">
            Learn More
          </Button>
        </Link>
      }
    />
  )
}
