import Link from 'next/link'
import { Card } from '@@/components/Card/Card'

export function ResourceCard({
  title,
  resources
}: {
  title: string
  resources: { link: string; text: string }[]
}) {
  return (
    <Card
      title={<h2 className="card-title justify-center">{title}</h2>}
      className="my-5 lg:mx-8 px-10 pb-10"
    >
      <ul className="flex flex-col md:pb-5 list-disc gap-8">
        {resources.map(({ link, text }) => (
          <li key={text} className="underline text-left my-1.5">
            <Link href={link} target="_blank">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
