'use client'

import sgMail from '@sendgrid/mail'
import { Button } from '@@/components/Button/Button'
import { FormTextInput } from '@@/components/TextInput/FormTextInput'
import { useForm } from '@@/utils/useForm'
import { useFormField } from '@@/utils/useFormField'

export function ContactForm() {
  const nameField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (value.length === 0) {
          return [
            {
              messageType: 'error',
              message: 'Name is required'
            }
          ]
        }

        return undefined
      }
    ]
  })

  const emailField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (value.length === 0) {
          return [
            {
              messageType: 'error',
              message: 'Email is required'
            }
          ]
        }

        // TODO: Test this
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return [
            {
              messageType: 'error',
              message: 'Email is invalid'
            }
          ]
        }

        return undefined
      }
    ]
  })

  const messageField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (value.length === 0) {
          return [
            {
              messageType: 'error',
              message: 'Message is required'
            }
          ]
        }

        return undefined
      }
    ]
  })

  const form = useForm({
    fields: [nameField, emailField, messageField]
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formIsValid = form.preSubmitCheck()

    // TODO: useCallback and test this
    if (formIsValid) {
      contactEmailAction({
        name: nameField.value,
        email: emailField.value,
        subject: messageField.value
      })
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
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

// Create server action in nextjs to send email
async function contactEmailAction({
  name: senderName,
  email,
  subject
}: {
  name: string
  email: string
  subject: string
}) {
  'use server'

  const msg = {
    template_id: 'd-16180d1ed06a4f578e60b245cbeb5d02',
    from: 'peyton.hobson1@gmail.com',
    personalizations: [
      {
        to: 'premiercarehomes@comcast.net',
        dynamic_template_data: {
          name: senderName,
          email: email,
          message: subject
        }
      }
    ]
  }

  // TODO: Fix
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.log(error)
  }
}
