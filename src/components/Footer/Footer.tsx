import Link from 'next/link'
import NextImage from 'next/image'

export function Footer() {
  return (
    <footer className="footer p-10 bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <Link href="/" className="flex items-center justify-center">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/assets/other/premier-care-homes-logo1.png"
            height={80}
            width={250}
            loading="lazy"
            alt="Premier Care Homes Logo"
          />
        </Link>
        <p className="text-center">
          © Premier Care Homes.
          <br />
          All rights reserved.
        </p>
      </div>

      <div>
        <span className="footer-title text-base-content">Care</span>

        <Link
          href="/locations"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Locations
        </Link>
        <Link
          href="/services"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Services
        </Link>
        <Link
          href="/facilities"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Facilities
        </Link>
        <Link
          href="/testimonials"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Testimonials
        </Link>
      </div>
      <div>
        <span className="footer-title text-base-content">Company</span>
        <Link
          href="/about-us"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          About Us
        </Link>
        <Link
          href="/employment"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Employment
        </Link>
        <Link
          href="/resources"
          className="link link-hover"
          // @click="handleRouteClick"
        >
          Resources
        </Link>
      </div>
    </footer>
  )
}
