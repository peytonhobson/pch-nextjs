import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'

export function OwnersAndOperatorsCard() {
  return (
    <Card className="max-w-lg md:w-full h-full px-8 flex flex-col gap-8 p-8">
      <div className="w-full h-full flex items-center justify-evenly gap-8">
        <div className="rounded-full w-20 h-20 md:w-32 md:h-32 relative overflow-hidden">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/headshot/janelle_headshot.jpeg"
            className="object-cover"
            fill
            alt="Janelle Leavell"
            loading="lazy"
          />
        </div>
        <h2 className="text-2xl md:text-4xl">Janelle Leavell</h2>
      </div>
      <div className="w-full h-full flex items-center justify-evenly gap-8">
        <div className="rounded-full w-20 h-20 md:w-32 md:h-32 relative overflow-hidden">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/headshot/margie_headshot.jpeg"
            className="object-cover"
            fill
            alt="Margie Hibner"
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl md:text-4xl">Margie Hibner</h2>
      </div>
    </Card>
  )
}
