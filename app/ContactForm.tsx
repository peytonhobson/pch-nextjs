'use client'

import { useCallback, useState } from 'react'
import { Button } from '@@/components/Button/Button'
import { FormTextInput } from '@@/components/TextInput/FormTextInput'
import { useForm } from '@@/utils/useForm'
import { useFormField } from '@@/utils/useFormField'
import { useBannerManager } from '@@/components/Banner/useBannerManager'
import { useEmailFormField } from '@@/utils/useEmailFormField'
import { BannerViewer } from '@@/components/Banner/BannerViewer'
import { contactEmailAction } from './contactEmailAction'

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
  const { getValue: getName } = nameField

  const emailField = useEmailFormField()
  const { getValue: getEmail } = emailField

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
  const { getValue: getMessage } = messageField

  const form = useForm({
    fields: [nameField, emailField, messageField]
  })
  const { preSubmitCheck, resetFormState, resetFormValues } = form

  const [isLoading, setIsLoading] = useState(false)

  const { addOrUpdateBanner } = useBannerManager()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formIsValid = preSubmitCheck()

      if (formIsValid) {
        setIsLoading(true)

        const contacted = await contactEmailAction({
          name: getName(),
          email: getEmail(),
          subject: getMessage()
        })

        if (contacted) {
          addOrUpdateBanner({
            id: 'contactSuccess',
            variant: 'success',
            content: 'Message sent successfully!'
          })

          resetFormState()
          resetFormValues()
        } else {
          addOrUpdateBanner({
            id: 'contactFailure',
            variant: 'danger',
            content: 'Message failed to send'
          })
        }

        setIsLoading(false)
      }
    },
    [
      preSubmitCheck,
      getName,
      getEmail,
      getMessage,
      resetFormState,
      resetFormValues,
      addOrUpdateBanner
    ]
  )

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <BannerViewer />
      <FormTextInput
        inputType="text"
        id="nameInput"
        label="Name"
        onTextInput={nameField.setValue}
        value={nameField.value}
        messageDefinitions={nameField.messages}
        attributes={{
          onBlur: nameField.handleBlur
        }}
        hasError={nameField.hasError}
        className="nameInput"
      />
      <FormTextInput
        inputType="text"
        id="emailInput"
        label="Email"
        onTextInput={emailField.setValue}
        value={emailField.value}
        messageDefinitions={emailField.messages}
        attributes={{
          onBlur: emailField.handleBlur
        }}
        hasError={emailField.hasError}
        className="emailInput"
      />
      <FormTextInput
        inputType="textarea"
        id="messageInput"
        label="Message"
        onTextInput={messageField.setValue}
        value={messageField.value}
        messageDefinitions={messageField.messages}
        attributes={{
          onBlur: messageField.handleBlur
        }}
        hasError={messageField.hasError}
        className="messageInput"
      />
      <Button className="submitBtn" type="submit" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}
