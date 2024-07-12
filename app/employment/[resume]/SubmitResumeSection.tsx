import { Card } from '@@/components/Card/Card'
import { ResumeForm } from './ResumeForm'

const requirements = [
  'Two years of caregiving experience',
  'Clean criminal background check',
  'Detail-oriented',
  'Team player',
  'Caring, compassionate, and patient'
]

export function SubmitResumeSection() {
  return (
    <div className="flex flex-wrap-reverse items-center gap-10 md:gap-20 justify-evenly">
      <Card className="max-w-lg w-full h-full px-8 flex flex-col gap-8 p-8">
        <ResumeForm />
      </Card>

      <div className="prose md:max-w-lg lg:max-w-xl">
        <h2 className="mb-5">Submit Your Resume</h2>
        <p>
          You may use this form to submit your PDF resumé for consideration, or
          you may send it to{' '}
          <a href="mailto:employment@premiercarehomes.net">
            employment@premiercarehomes.net
          </a>
          .
        </p>
        <div className="prose flex md:grow w-5/6 mt-5 md:w-full flex-wrap justify-center md:justify-start items-center">
          <h2 className="w-full mb-3 text-left">Requirements</h2>
          <ul className="list-disc w-full">
            {requirements.map(requirement => (
              <li key={requirement} className="text-left">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
