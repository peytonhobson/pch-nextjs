import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { Hero } from '@@/components/Hero/Hero'
import { Card } from '@@/components/Card/Card'
import type { Metadata } from 'next'

const SERVICE_ITEMS = [
  'A homelike setting with 24 hour direct care staff, 5:1 resident to caregiver ratio',
  'Home cooked meals and snacks, diabetic meals offered',
  'Medication management, including insulin.',
  'Personalized services to meet each individual’s care needs, including: dressing, bathing, feeding assistance, grooming, toileting and assist with mobility.',
  'Laundry (washables only)',
  'Scheduling of appointments and transportation',
  'RN for staff teaching and delegation',
  'Bath aide to complete personalized care',
  'Modified diets (diabetic diet, lactose free, gluten free)',
  'Dysphagia diet — pureed/soft foods and thickened liquids',
  'Visiting Beautician (hair and nail services)',
  'Visiting Nurse Practitioner (optional)',
  'Hospice care'
]

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title:
    'Premier Care Homes Services | Quality Residential Care in Salem, Oregon',
  description:
    'Explore the comprehensive services offered by Premier Care Homes in Salem, Oregon. Our experienced care team provides personalized, dignified care with a 5:1 resident-to-caregiver ratio. Services include medication management, home-cooked meals, personal care assistance, and specialized diets. Contact us to learn more about our affordable rates and exceptional care.'
}

// ts-unused-exports:disable-next-line
export default function ServicesPage() {
  console.count('Navigated to Services')

  return (
    <Fragment>
      <Hero
        title="SERVICES & COST"
        text="Exceptional, professional care for your loved one in a compassionate, home environment."
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/services-hero.jpg"
      />
      <main className="bg-mint pt-20 pb-20 flex flex-col gap-20">
        <div className="w-full flex justify-center px-10">
          <div className="prose text-default-text text-left md:max-w-xl lg:max-w-2xl">
            <h2 className="text-4xl mb-5 text-center text-default-text">
              Our Cost
            </h2>

            <p>
              At Premier Care Homes, we understand the importance of providing
              quality care at an affordable price. Our rates are typically lower
              than those of larger, institutional settings, making personalized
              care more accessible.
            </p>

            <p>
              <strong className="text-default-text">
                Private Pay Facility:
              </strong>{' '}
              Premier Care Homes operates on a private pay basis, ensuring
              personalized attention and services tailored to each
              resident&apos;s needs. We also accept long-term care insurance and
              Veteran&apos;s funding.
            </p>

            <p>
              <strong className="text-default-text">
                Comprehensive Assessment:
              </strong>{' '}
              To determine the most accurate pricing, we conduct a thorough
              assessment of each individual&apos;s care requirements. This
              personalized approach ensures that residents receive the specific
              support they need without unnecessary costs.
            </p>

            <p>
              <strong className="text-default-text">Rates:</strong> For detailed
              rate information and to discuss specific care needs, please{' '}
              <a href="tel:503-798-5610" className="!text-blue-600">
                call
              </a>{' '}
              or{' '}
              <a
                href="mailto:janelle@premiercarehomes.net"
                className="!text-blue-600"
              >
                email
              </a>{' '}
              us. Our team is ready to assist you with any questions and provide
              the necessary information to make an informed decision.
            </p>
            <p>
              <strong className="text-red-600">Important Note:</strong> Please
              be aware that Medicaid payments are not accepted at this facility.
              We are dedicated to working with you to find the best financial
              solution for your loved one&apos;s care.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 md:gap-20 px-10 md:px-20 items-center justify-evenly">
          <div className="prose text-default-text text-left md:max-w-xl lg:max-w-lg">
            <h2 className="text-4xl mb-5 text-center text-default-text">
              Services
            </h2>
            <p>
              The resident care team is dedicated to providing personalized care
              in a dignified and respectful environment. Each member of our team
              has been carefully selected to ensure the highest quality of
              service.
            </p>

            <p>
              <strong className="text-default-text">
                Experienced Care Team:
              </strong>{' '}
              Our resident care managers have all completed and passed the
              &quot;Ensure Quality Care&quot; course through Northwest Senior
              Service. Additionally, caregivers are required to pass a 6-hour
              dementia class, a safe medication administration course, and must
              be CPR and First Aid certified. These measures ensure the safety
              and well-being of our residents.
            </p>

            <p>
              <strong className="text-default-text">Rigorous Screening:</strong>{' '}
              All caregivers undergo thorough background checks upon hiring and
              every two years thereafter to ensure the safety and well-being of
              our residents.
            </p>
            <p>
              <strong className="text-default-text">
                Professional Oversight:
              </strong>{' '}
              Physical therapists operate and manage all of our staff and care
              homes. Each home is also supported by a registered nurse (RN) who
              provides delegation and training for our staff, ensuring high
              standards of care.
            </p>
          </div>
          <Card className="bg-white md:max-w-xl md:min-w-[25rem] p-10">
            <h3 className="pb-5">What We Provide</h3>
            <ul className="w-5/6 w-full">
              {SERVICE_ITEMS.map(item => (
                <li key={item} className="text-left my-2 flex">
                  <FontAwesomeIcon
                    className="fill-current text-green-500 flex-col pt-2"
                    icon={faCheck}
                  />
                  <span className="flex-col ml-2 prose text-default-text">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </Fragment>
  )
}
