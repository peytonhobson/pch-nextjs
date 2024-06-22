import Link from 'next/link'
import NextImage from 'next/image'

export function Footer() {
  return (
    <footer className="footer p-10 bg-white text-base-content">
      <div className="flex flex-wrap justify-center">
        <Link
          href="/"
          className="flex items-center justify-center w-full"
          // // @click="handleRouteClick"
        >
          <img
            src="https://premier-care-homes.s3.amazonaws.com/assets/other/premier-care-homes-logo1.png"
            className="mr-3 h-16 md:h-20"
            alt="Premier Care Homes Logo"
          />
        </Link>
        <p>
          © Premier Care Homes.
          <br />
          All rights reserved.
        </p>
      </div>

      <div>
        <span className="footer-title">Care</span>

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
        <span className="footer-title">Company</span>
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
