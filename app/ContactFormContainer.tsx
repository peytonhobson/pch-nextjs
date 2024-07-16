import { BannerManager } from '@@/components/Banner/BannerManager'
import { ContactForm } from './ContactForm'

export function ContactFormContainer() {
  return (
    <div className="card shadow-2xl bg-white w-full md:w-auto md:min-w-[35rem] p-8">
      <h2 className="font-bold text-4xl text-center pb-10">
        Questions? Contact Us.
      </h2>
      <BannerManager>
        <ContactForm />
      </BannerManager>
    </div>
  )
}
