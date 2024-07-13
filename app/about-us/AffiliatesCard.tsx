import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'

export function AffiliatesCard() {
  return (
    <Card className="h-full p-8 max-w-lg md:w-full">
      <div className="w-full h-full flex items-center justify-evenly gap-8">
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full relative overflow-hidden">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/headshot/scott_headshot.jpeg"
            fill
            loading="lazy"
            alt="Scott Leavell"
          />
        </div>

        <h2 className="text-2xl md:text-4xl">Scott Leavell</h2>
      </div>
    </Card>
  )
}
