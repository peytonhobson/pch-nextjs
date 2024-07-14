import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import { SubmitResumeSection } from './[resume]/SubmitResumeSection'
import { FriendSection } from './[friend]/FriendSection'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Premier Care Homes',
  description: 'When only the best will do.'
}

// ts-unused-exports:disable-next-line
export default function EmploymentPage() {
  return (
    <Fragment>
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
