import { Fragment } from 'react'
import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'
import { Hero } from '@@/components/Hero/Hero'
import { testimonials } from '../../src/data/testimonials.en'
import type { Metadata } from 'next'

// TODO: Add new testimonial

const images = [
  'https://premier-care-homes.s3.amazonaws.com/assets/other/resident-red-and-patriotic-sweaters.png',
  'https://premier-care-homes.s3.amazonaws.com/assets/other/resident-out-for-a-treat.png',
  'https://premier-care-homes.s3.amazonaws.com/assets/other/resident-christmas-guitar-music.png'
]

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Premier Care Homes Testimonials | Heartfelt Reviews from Families',
  description: `Read genuine testimonials from families who have experienced the compassionate care at Premier Care Homes in Salem, Oregon. Discover stories of trust, kindness, and exceptional service that highlight our commitment to providing personalized and dignified residential care. Visit us to learn more about our residents' positive experiences.`
}

// ts-unused-exports:disable-next-line
export default function TestimonialsPage() {
  console.log('Navigated to Testimonials')

  return (
    <Fragment>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/testimonials-hero.jpg"
        title="TESTIMONIALS"
        text="From Our Home to Your Hearts: Real Stories of Care"
      />
      <section className="py-10 grid grid-cols-1 lg:grid-cols-3 bg-mint">
        <div className="flex flex-col col-span-1 lg:col-start-1 md:justify-center lg:justify-between items-center md:max-w-xl mx-auto">
          <ImageCard
            image={images[0]}
            alt="Resident and Family in Red and Patriotic Sweaters"
          />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="flex flex-col col-span-1 lg:col-start-2 justify-center md:justify-center lg:justify-between items-center md:max-w-xl mx-auto">
          <TestimonialCard {...testimonials[2]} />
          <ImageCard image={images[1]} alt="Resident Out for a Treat" />
          <TestimonialCard {...testimonials[5]} />
        </div>
        <div className="flex flex-col col-span-1 lg:col-start-3 justify-center md:justify-center lg:justify-between items-center md:max-w-xl mx-auto">
          <TestimonialCard {...testimonials[4]} />
          <TestimonialCard {...testimonials[0]} />
          <ImageCard image={images[2]} alt="Resident Christmas Guitar Music" />
        </div>
      </section>
    </Fragment>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="my-5 w-5/6 flex-none flex-wrap content-center p-10 prose">
      <div className="flex flex-row mt-2">
        <div className="text-left italic">&quot;{quote}&quot;</div>
      </div>
      <div className="flex flex-row mt-5">
        <div className="text-left font-bold">{author}</div>
      </div>
    </Card>
  )
}

function ImageCard({ image, alt }: { image: string; alt: string }) {
  return (
    <Card className="h-80 my-5 w-5/6 relative overflow-hidden">
      <NextImage
        src={image}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 33vw"
        alt={alt}
        loading="lazy"
      />
    </Card>
  )
}
