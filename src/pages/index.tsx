import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcaseMedical,
  faPeopleCarry,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons'
import {
  CSSTransition as CSSTransitionComponent,
  TransitionGroup
} from 'react-transition-group'
import { Button } from '@@/components/Button/Button'
import { Hero } from '@@/components/Hero/Hero'
import { Card } from '@@/components/Card/Card'
import { facilities } from '@@/data/facilities'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

const CONTACTS = [
  {
    name: 'Janelle Leavell',
    title: 'Co-Owner/Physical Therapist',
    phoneNumber: '503-798-5610',
    email: 'janelle@premiercarehomes.net',
    number: '1',
    image:
      'https://premier-care-homes.s3.amazonaws.com/headshot/janelle_headshot.jpeg'
  },
  {
    name: 'Margie Hibner',
    title: 'Co-Owner/Physical Therapist',
    phoneNumber: '503-302-4750',
    email: 'margie@premiercarehomes.net',
    number: '2',
    image:
      'https://premier-care-homes.s3.amazonaws.com/headshot/margie_headshot.jpeg'
  },
  {
    name: 'Scott Leavell',
    title: 'Affiliate/Paramedic',
    phoneNumber: '901-326-3521',
    email: 'scott@premiercarehomes.net',
    number: '3',
    image:
      'https://premier-care-homes.s3.amazonaws.com/headshot/scott_headshot.jpeg'
  }
]

export default function Home() {
  // eslint-disable-next-line no-null/no-null
  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <Fragment>
      <Head>
        <title>Premier Care Homes</title>
        <meta
          name="description"
          content="Premier Care Homes - When only the best will do."
        />
      </Head>
      {/* TODO: Hero Image */}
      <Hero
        title="WHEN ONLY THE BEST WILL DO"
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/landing-hero.jpg"
      >
        <div className="flex justify-evenly w-full gap-8">
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
          <Link href="/about-us" className="!w-32 md:!w-48">
            <Button variant="primary">About Us</Button>
          </Link>
        </div>
      </Hero>
      <div
        className="w-full flex items-center py-10 md:py-24 px-10 lg:px-20 bg-mint"
        ref={scrollRef}
      >
        <p className="text-center font-bold text-xl md:text-3xl lg:text-5xl lg:leading-relaxed text-white">
          We know it’s a difficult decision when you or your loved one can no
          longer live independently at home. It is our goal to provide a
          comfortable, home-like environment as an alternative to impersonal
          institutional living.
        </p>
      </div>
      <section className="bg-mint flex flex-col items-center gap-16 pb-16 px-8">
        <div className="flex flex-wrap w-full justify-evenly gap-x-8 gap-y-16">
          <DescriptionBox
            icon={faBriefcaseMedical}
            title="Professional Care"
            description="Rest assured our homes are operated and managed by Physical Therapists, an RN, and a paramedic 24 hours a day."
            color="red"
          />
          <DescriptionBox
            icon={faPeopleCarry}
            title="Burden Free"
            description="We take the burdens off of families who are currently providing their loved ones care or overseeing their care."
            color="black"
          />
          <DescriptionBox
            icon={faPeopleGroup}
            title="High Caregiver Ratio"
            description="We provide a high caregiver to resident ratio of 5:1 to ensure each resident receives the care and attention they deserve."
            color="green"
          />
        </div>
        <div className="flex flex-wrap justify-evenly show-on-scroll carousel-tag gap-x-8 gap-y-16">
          <FacilityCard />
          <Card
            className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] h-128"
            title="Locations"
            image="https://premier-care-homes.s3.amazonaws.com/assets/other/locations-teaser.jpg"
            alt="Google Maps image of Salem, Oregon"
            description="See where our homes are located throughout Salem, Oregon. Contact us for
        a personal tour or more information."
            button={
              <Link href="/locations">
                <Button className="no-underline" variant="primary">
                  Learn More
                </Button>
              </Link>
            }
          />

          <Card
            title="Contact Us"
            className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] h-128"
            description="We would like to hear from you, talk to you, and/or give you a tour of
        one of our wonderful homes."
          >
            <div className="flex flex-col gap-8 justify-center flex-grow px-10 mt-[-7rem]">
              {CONTACTS.map(contact => (
                <ContactInfo
                  key={contact.number}
                  image={contact.image}
                  personName={contact.name}
                  title={contact.title}
                  phoneNumber={contact.phoneNumber}
                  email={contact.email}
                />
              ))}
            </div>
          </Card>
        </div>
        {/* <contact-form-container className="w-full md:w-auto md:min-w-[35rem]" /> */}
      </section>
    </Fragment>
  )
}

function DescriptionBox({
  icon,
  title,
  description,
  color
}: {
  icon: IconProp
  title: string
  description: string
  color: string
}) {
  return (
    <Card className="p-8 md:max-w-md w-full md:w-2/5 lg:w-2/7 md:min-w-[23rem] flex flex-col gap-6 max-h-56">
      <div className="flex gap-6 items-center">
        <FontAwesomeIcon icon={icon} color={color} size="2x" />
        <h2 className="font-semibold text-2xl text-black">{title}</h2>
      </div>
      <div>{description}</div>
    </Card>
  )
}

const IMAGE_LINKS = facilities.map(facility => facility.images[0])

function FacilityCard() {
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
      className="md:max-w-md w-full md:w-2/5 lg:w-2/7 flex flex-col md:min-w-[23rem] h-128"
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

function ContactInfo({
  image,
  personName,
  title,
  phoneNumber,
  email
}: {
  image: string
  personName: string
  title: string
  phoneNumber: string
  email: string
}) {
  return (
    <div className="flex items-center gap-8">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img
          src={image}
          className="mt-0 object-cover h-full w-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs xl:text-sm text-left font-bold font-sans my-0">
          {personName}
        </div>
        <div className="text-xs xl:text-sm text-left font-sans my-0">
          {title}
        </div>
        <div className="text-xs xl:text-sm text-left font-sans my-0">
          {phoneNumber}
        </div>
        <a
          href={`mailto:${email}`}
          className="text-xs xl:text-sm text-left font-sans underline"
        >
          {email}
        </a>
      </div>
    </div>
  )
}

// TODO: Fix this
function FadeTransition({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <TransitionGroup className={className}>
      <CSSTransitionComponent {...props} timeout={1000} classNames="fade">
        <Fragment>{children}</Fragment>
      </CSSTransitionComponent>
    </TransitionGroup>
  )
}
