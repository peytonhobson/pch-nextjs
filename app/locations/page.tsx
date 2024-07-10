import Head from 'next/head'
import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'

export default function LocationsPage() {
  return (
    <Fragment>
      <Head>
        <title>Locations</title>
      </Head>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-7.jpg"
        title="LOCATIONS"
      />
      <div className="flex flex-wrap w-full items-center justify-center bg-mint lg:h-screen">
        <div className="flex items-center justify-center w-full h-full py-20 px-10">
          <iframe
            className="h-144 w-full card"
            src="https://storage.googleapis.com/maps-solutions-vc5lhmrtc4/locator-plus/4rmr/locator-plus.html"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Fragment>
  )
}
