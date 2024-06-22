import React, { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Button } from '@@/components/Button/Button'
import { Hero } from '@@/components/Hero/Hero'

export default function Home() {
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
            onClick={() => {}}
          >
            Learn More
          </Button>
          <Link href="/about-us" className="!w-32 md:!w-48">
            <Button variant="primary">About Us</Button>
          </Link>
        </div>
      </Hero>
    </Fragment>
  )
  {
    /* <div ref="learnMoreRef"></div>
  <hero-caption />
  <section class="bg-mint flex flex-col items-center gap-16 pb-16 px-8">
    <div
      class="flex flex-wrap w-full justify-evenly show-on-scroll gap-x-8 gap-y-16"
    >
      <description-box
        v-for="descriptionBoxContent in descriptionBoxContents"
        :key="descriptionBoxContent.title"
        :icon="descriptionBoxContent.icon"
        :title="descriptionBoxContent.title"
        :body="descriptionBoxContent.body"
        :icon-class="descriptionBoxContent.iconClass"
        class="md:max-w-md w-full md:w-2/5 lg:w-2/7 md:min-w-[23rem]"
      />
    </div>
    <div
      class="flex flex-wrap justify-evenly show-on-scroll carousel-tag gap-x-8 gap-y-16"
    >
      <facilities-card class="md:max-w-md w-full md:w-2/7 md:min-w-[23rem]" />
      <locations-card
        class="md:max-w-md w-full md:w-2/7 md:min-w-[23rem]"
        route="Facilities"
      />
      <contact-card class="md:max-w-md w-full md:w-2/7 md:min-w-[23rem]" />
    </div>
    <contact-form-container class="w-full md:w-auto md:min-w-[35rem]" />
  </section> */
  }
}
