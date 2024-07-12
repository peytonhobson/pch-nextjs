import Head from 'next/head'
import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import { SubmitResumeSection } from './[resume]/SubmitResumeSection'
import { FriendSection } from './[friend]/FriendSection'

export default function EmploymentPage() {
  return (
    <Fragment>
      <Head>
        <title>Employment</title>
      </Head>

      <Hero
        title="EMPLOYMENT"
        text="Premier Care Homes is always accepting applications and looking to hire exceptional staff members to complement our highly qualified family of personnel. If you or someone you know meet the following requirements and are looking to join our team, please contact us."
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/employment-hero.jpg"
      />
      <div className="bg-mint px-5 md:px-10 py-20 flex flex-col gap-20 md:gap-36">
        <SubmitResumeSection />
        <FriendSection />
      </div>
    </Fragment>
  )
}
