'use client'

import { Fragment, useRef } from 'react'
import { Button } from '@@/components/Button/Button'

export default function SmoothScroll() {
  // eslint-disable-next-line no-null/no-null
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <Fragment>
      <Button
        variant="primary"
        className="!w-32 md:!w-48"
        onClick={() => {
          window.scrollTo({
            top: scrollRef.current?.offsetTop
              ? scrollRef.current.offsetTop - 90
              : 0,
            behavior: 'smooth'
          })
        }}
      >
        Learn More
      </Button>
      <div
        className="absolute top-[calc(100vh)] left-0 right-0"
        ref={scrollRef}
      />
    </Fragment>
  )
}
