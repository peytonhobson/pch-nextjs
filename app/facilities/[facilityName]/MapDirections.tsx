import Link from 'next/link'
import { Button } from '@@/components/Button/Button'

export function MapDirections({ locationLink }: { locationLink: string }) {
  return (
    <div className="w-full prose flex flex-wrap items-stretch">
      <div className="mapouter w-full mt-10 md:mt-10">
        <div className="gmap_canvas flex w-full h-full">
          <iframe
            id="gmap_canvas"
            src={locationLink}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            className="w-full h-full rounded-xl"
          ></iframe>
        </div>
      </div>

      <Link
        href={locationLink.replace('&output=embed', '')}
        target="_blank"
        className="w-full my-10 md:mt-10 md:mb-0"
      >
        <Button>Get Directions</Button>
      </Link>
    </div>
  )
}
