import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import { SubmitResumeSection } from './[resume]/SubmitResumeSection'
import { FriendSection } from './[friend]/FriendSection'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title:
    'Employment at Premier Care Homes | Join Our Caring Team in Salem, Oregon',
  description:
    'Premier Care Homes in Salem, Oregon, is hiring compassionate and dedicated caregivers. If you have two years of caregiving experience, a clean background check, and a caring nature, apply now to join our exceptional team. Submit your resume online or email it to employment@premiercarehomes.net. Explore career opportunities with us today!'
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
