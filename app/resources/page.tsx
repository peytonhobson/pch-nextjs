import { Fragment } from 'react'
import { Hero } from '@@/components/Hero/Hero'
import { ResourceCard } from './ResourceCard'
import type { Metadata } from 'next'

const webLinks = [
  {
    link: 'https://dailycaring.com/what-is-a-residential-care-home/',
    text: 'What is a Residential Care Home?'
  },
  {
    link: 'https://www.veteranaid.org/',
    text: 'Veterans financial assistance for Adult Foster Care Homes'
  },
  {
    link: 'https://www.va.gov/geriatrics/pages/Adult_Family_Homes.asp',
    text: 'The US Dept of Veterans Affairs Educated about Geriatrics and Extended Care'
  },
  {
    link: 'https://www.assistedliving.org/care-homes/',
    text: 'A Comprehensive Guide to Residential Care Homes'
  }
]

const pdfDownloads = [
  {
    link: 'https://apps.state.or.us/Forms/Served/de9033.pdf',
    text: 'A Guide to Adult Foster Homes Here in Oregon for Potential Residents'
  },
  {
    link: 'http://assets.aarp.org/rgcenter/ppi/liv-com/fs174-afc.pdf',
    text: 'The AARP Puts Out a Fact Sheet about Adult Foster Care'
  }
]

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Resources for Senior Care | Premier Care Homes in Salem, Oregon',
  description: `Access valuable resources for senior care at Premier Care Homes in Salem, Oregon. Explore web links and PDF downloads on topics like residential care homes, veterans' financial assistance, and adult foster care. Find comprehensive guides and fact sheets to help you navigate senior care options. Visit us to learn more.`
}

// ts-unused-exports:disable-next-line
export default function ResourcesPage() {
  return (
    <Fragment>
      <Hero
        image="https://premier-care-homes.s3.amazonaws.com/assets/other/resources-hero.jpg"
        title="RESOURCES"
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 justify-evenly py-5 px-10 lg:py-20 bg-mint overflow-x-hidden">
        <ResourceCard title="Web Links" resources={webLinks} />
        <ResourceCard title="PDF Downloads" resources={pdfDownloads} />
      </div>
    </Fragment>
  )
}
