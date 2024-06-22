import React from 'react'
import NextImage from 'next/image'

interface HeroProps {
  image: string
  title: string
  text?: string
  children?: React.ReactNode
}

export function Hero({ image, title, text, children }: HeroProps) {
  return (
    <div className="hero h-screen lg:min-h-96 relative hero-overlay overflow-hidden w-full">
      <NextImage
        src={image}
        alt="Hero"
        className="object-cover w-full h-full filter brightness-75"
        rel="preload"
        width={500}
        height={500}
      />
      <div className="hero-content w-full px-10 text-center text-neutral-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="w-full mb-5 leading-[2.5rem] md:!leading-[5rem] text-4xl md:text-6xl font-bold text-white md:max-w-xl">
            {title}
          </h1>
          {children}
          {text && (
            <h2
              v-if="text"
              className="w-full lg:w-[50vw] mb-5 text-xl text-white"
            >
              {text}
            </h2>
          )}
          <slot></slot>
        </div>
      </div>
    </div>
  )
}
