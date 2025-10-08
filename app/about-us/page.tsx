import { Fragment } from 'react'
import NextImage from 'next/image'
import { Hero } from '@@/components/Hero/Hero'
import { Card } from '@@/components/Card/Card'
import { OwnersAndOperatorsCard } from './OwnersAndOperatorsCard'
import { AffiliatesCard } from './AffiliatesCard'
import type { Metadata } from 'next'

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'About Premier Care Homes | Experienced Senior Care in Salem, Oregon',
  description:
    'Meet the dedicated team behind Premier Care Homes in Salem, Oregon. Led by experienced physical therapist Janelle Leavell and supported by Scott Leavell, a seasoned paramedic, our team provides exceptional care with a passion for senior well-being. Learn more about our commitment to creating a secure and respectful environment for our residents.'
}

// ts-unused-exports:disable-next-line
export default function AboutUsPage() {
  console.log('Navigated to About Us')

  return (
    <Fragment>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/aboutus-hero.jpg"
        title="ABOUT US"
        text="Meet the Team Behind the Care"
      />
      <div className="bg-mint px-10 py-20 flex flex-col gap-20 md:gap-36">
        <div className="flex flex-wrap items-center gap-10 md:gap-20 justify-evenly">
          <OwnersAndOperatorsCard />

          <div className="prose md:max-w-lg lg:max-w-xl">
            <h2 className="mb-5">Owners and Operators</h2>
            <p>
              Janelle Leavell, P.T., brings over 15 years of experience as a
              physical therapist in various senior care settings. Since 2008,
              Janelle has owned and operated Adult Foster Care Homes, driven by
              an unwavering passion and dedication to senior care.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-10 md:gap-20 justify-evenly">
          <AffiliatesCard />

          <div className="prose md:max-w-lg lg:max-w-xl">
            <h2 className="mb-5">Affiliates</h2>
            <p>
              Quality Care Homes is a Premier Care Homes affiliated Adult Foster
              Care Home owned and operated by Scott Leavell. Scott is a
              paramedic/firefighter with 20+ years of experience in the field.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-10 md:gap-20 justify-evenly">
          <Card className="aspect-[4/3] w-full max-w-lg overflow-hidden relative">
            <NextImage
              src="https://premier-care-homes.s3.amazonaws.com/assets/other/resident-red-and-patriotic-sweaters.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Resident and Family in Red and Patriotic Sweaters"
              loading="lazy"
            />
          </Card>

          <div className="prose md:max-w-lg lg:max-w-xl">
            <h2 className="mb-5">The Home Care Team</h2>
            <p>
              The Home Care Team is dedicated to providing a secure,
              comfortable, and respectful environment for our residents. Each
              home has a resident manager who has completed the rigorous
              &quot;Ensuring Quality Care&quot; course through Northwest Senior
              Disability Services. Our carefully selected staff have passed
              required courses in caregiving, dementia care, medication
              administration, and maintain current Red Cross CPR certifications.
              They also participate in yearly continuing education and are
              required to have a clean criminal record. Our homes benefit from
              the oversight of medical professionals, including physical
              therapists, a nurse, and a paramedic, ensuring comprehensive and
              attentive care.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
