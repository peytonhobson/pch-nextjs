'use client'

import { useCallback, useState } from 'react'
import { Button } from '@@/components/Button/Button'
import { FormTextInput } from '@@/components/TextInput/FormTextInput'
import { useEmailFormField } from '@@/utils/useEmailFormField'
import { useForm } from '@@/utils/useForm'
import { useFormField } from '@@/utils/useFormField'
import { useBannerManager } from '@@/components/Banner/useBannerManager'
import { submitResumeAction } from './submitResumeAction'

export function ResumeForm() {
  const fullNameField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (!value) {
          return [
            {
              messageType: 'error',
              message: 'Full name is required'
            }
          ]
        }

        return undefined
      }
    ]
  })
  const { getValue: getFullName } = fullNameField

  const emailField = useEmailFormField()
  const { getValue: getEmail } = emailField

  const phoneNumberField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (!value) {
          return [
            {
              messageType: 'error',
              message: 'Phone number is required'
            }
          ]
        }

        if (
          !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
        ) {
          return [
            {
              messageType: 'error',
              message: 'Phone number is invalid'
            }
          ]
        }

        return undefined
      }
    ]
  })
  const { getValue: getPhoneNumber } = phoneNumberField

  const resumeField = useFormField<File | undefined>({
    initialValue: undefined,
    validators: [
      value => {
        if (!value) {
          return [
            {
              messageType: 'error',
              message: 'Resume is required'
            }
          ]
        }

        if (value.type !== 'application/pdf') {
          return [
            {
              messageType: 'error',
              message: 'Resume must be a PDF'
            }
          ]
        }

        return undefined
      }
    ]
  })
  const { getValue: getResume } = resumeField

  const form = useForm({
    fields: [fullNameField, emailField, phoneNumberField, resumeField]
  })
  const { preSubmitCheck } = form

  const { addOrUpdateBanner } = useBannerManager()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const isValid = preSubmitCheck()

      if (!isValid) {
        return
      }

      const resume = getResume()

      if (!resume) {
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(resume)
      reader.onload = async () => {
        const file = (reader.result as string)?.split(',')[1]

        setIsLoading(true)

        const submitted = await submitResumeAction({
          name: getFullName(),
          email: getEmail(),
          phoneNumber: getPhoneNumber(),
          file
        })

        setIsLoading(false)

        if (submitted) {
          addOrUpdateBanner({
            id: 'submitResumeSuccess',
            variant: 'success',
            content: 'Resume submitted successfully'
          })
        } else {
          addOrUpdateBanner({
            id: 'submitResumeError',
            variant: 'danger',
            content: 'Failed to submit resume'
          })
        }
      }

      reader.onerror = () => {
        addOrUpdateBanner({
          id: 'submitResumeError',
          variant: 'danger',
          content: 'Failed to submit resume'
        })
      }
    },
    [
      addOrUpdateBanner,
      getEmail,
      getFullName,
      getPhoneNumber,
      getResume,
      preSubmitCheck
    ]
  )

  return (
    <form onSubmit={handleSubmit}>
      <FormTextInput
        id="full-name"
        label="Full Name"
        inputType="text"
        placeholder="John Doe"
        onTextInput={fullNameField.setValue}
        value={fullNameField.value}
        messageDefinitions={fullNameField.messages}
        hasError={fullNameField.hasError}
        attributes={{
          onBlur: fullNameField.handleBlur
        }}
      />
      <FormTextInput
        id="email"
        label="Email"
        inputType="text"
        placeholder="john.doe@example.com"
        onTextInput={emailField.setValue}
        value={emailField.value}
        messageDefinitions={emailField.messages}
        hasError={emailField.hasError}
        attributes={{
          onBlur: emailField.handleBlur
        }}
      />
      <FormTextInput
        id="phone-number"
        label="Phone Number"
        inputType="text"
        placeholder="(555) 555-5555"
        onTextInput={phoneNumberField.setValue}
        value={phoneNumberField.value}
        messageDefinitions={phoneNumberField.messages}
        hasError={phoneNumberField.hasError}
        attributes={{
          onBlur: phoneNumberField.handleBlur
        }}
      />
      <FormTextInput
        id="resume"
        label="Resume"
        inputType="file"
        onChange={event => {
          const file = event.target.files?.[0]

          if (file) {
            resumeField.setValue(file)
          }
        }}
        messageDefinitions={resumeField.messages}
        hasError={resumeField.hasError}
        attributes={{
          onBlur: resumeField.handleBlur
        }}
      />
      <Button
        type="submit"
        disabled={form.hasError && form.hasSubmitted}
        loading={isLoading}
      >
        Submit
      </Button>
    </form>
  )
}
