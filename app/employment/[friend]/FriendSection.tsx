import { Card } from '@@/components/Card/Card'
import { FriendForm } from './FriendForm'

export function FriendSection() {
  return (
    <div className="flex flex-wrap-reverse items-center gap-10 md:gap-20 justify-evenly">
      <Card className="max-w-lg w-full h-full px-8 flex flex-col gap-8 p-8">
        <FriendForm />
      </Card>

      <div className="prose md:max-w-lg lg:max-w-xl">
        <h2 className="mb-5">Share with a friend</h2>
        <p>
          If you know of someone searching for a job who fits the criteria of
          employment with Premier Care Homes, please send them our way. We are
          always looking for dedicated individuals to join our team.
        </p>
      </div>
    </div>
  )
}
