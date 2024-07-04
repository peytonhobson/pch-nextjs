'use client'

import { Button } from '@@/components/Button/Button'
import { FormTextInput } from '@@/components/TextInput/FormTextInput'

export function ContactForm() {
  return (
    <form className="w-full">
      <FormTextInput
        inputType="text"
        id="nameInput"
        label="Name"
        messageDefinitions={[]}
        className="nameInput"
      />
      <FormTextInput
        inputType="text"
        id="emailInput"
        label="Email"
        messageDefinitions={[]}
        className="emailInput"
      />
      <FormTextInput
        inputType="textarea"
        id="messageInput"
        label="Message"
        messageDefinitions={[]}
        className="messageInput"
      />
      <Button className="submitBtn" type="submit">
        Submit
      </Button>
    </form>
  )
}
