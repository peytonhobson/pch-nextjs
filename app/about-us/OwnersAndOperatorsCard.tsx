import { Card } from '@@/components/Card/Card'

export function OwnersAndOperatorsCard() {
  return (
    <Card className="max-w-lg md:w-full h-full px-8 flex flex-col gap-8 p-8">
      <div className="w-full h-full flex items-center justify-evenly gap-8">
        <img
          src="https://premier-care-homes.s3.amazonaws.com/headshot/janelle_headshot.jpeg"
          className="mt-0 object-cover rounded-full w-20 h-20 md:w-32 md:h-32"
          loading="lazy"
        />
        <h2 className="text-2xl md:text-4xl">Janelle Leavell</h2>
      </div>
      <div className="w-full h-full flex items-center justify-evenly gap-8">
        <img
          src="https://premier-care-homes.s3.amazonaws.com/headshot/margie_headshot.jpeg"
          className="mt-0 object-cover rounded-full w-20 h-20 md:w-32 md:h-32"
          loading="lazy"
        />

        <h2 className="text-2xl md:text-4xl">Margie Hibner</h2>
      </div>
    </Card>
  )
}
