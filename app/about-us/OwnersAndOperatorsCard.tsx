import NextImage from 'next/image'
import { Card } from '@@/components/Card/Card'

export function OwnersAndOperatorsCard() {
  return (
    <Card className="max-w-lg md:w-full h-full px-8 flex flex-col gap-8 p-8">
      <div className="w-full h-full flex items-center justify-evenly gap-4 md:gap-8">
        <NextImage
          src="https://premier-care-homes.s3.amazonaws.com/headshot/janelle_headshot.jpeg"
          className="object-cover rounded-full max-h-20 max-w-20 md:max-h-32 md:max-w-32"
          sizes="(max-width: 768px) 80px, 128px"
          width={128}
          height={128}
          alt="Janelle Leavell"
          loading="lazy"
        />
        <h2 className="text-2xl md:text-4xl text-center">Janelle Leavell</h2>
      </div>
      <div className="w-full h-full flex items-center justify-evenly gap-4 md:gap-8">
        <div className="rounded-full w-20 h-20 md:w-32 md:h-32 relative overflow-hidden">
          <NextImage
            src="https://premier-care-homes.s3.amazonaws.com/headshot/margie_headshot.jpeg"
            sizes="(max-width: 768px) 80px, 128px"
            width={128}
            height={128}
            alt="Margie Hibner"
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl md:text-4xl text-center">Margie Hibner</h2>
      </div>
    </Card>
  )
}
