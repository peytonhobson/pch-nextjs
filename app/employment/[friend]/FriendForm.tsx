'use client'

import { useCallback, useState } from 'react'
import { useBannerManager } from '@@/components/Banner/useBannerManager'
import { Button } from '@@/components/Button/Button'
import { FormTextInput } from '@@/components/TextInput/FormTextInput'
import { useEmailFormField } from '@@/utils/useEmailFormField'
import { useForm } from '@@/utils/useForm'
import { useFormField } from '@@/utils/useFormField'
import { shareWithFriendAction } from './shareWithFriendAction'

export function FriendForm() {
  const yourNameField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (!value) {
          return [
            {
              messageType: 'error',
              message: 'Your name is required'
            }
          ]
        }

        return undefined
      }
    ]
  })
  const { getValue: getYourName } = yourNameField

  const yourEmailField = useEmailFormField()
  const { getValue: getYourEmail } = yourEmailField

  const friendsNameField = useFormField({
    initialValue: '',
    validators: [
      value => {
        if (!value) {
          return [
            {
              messageType: 'error',
              message: "Friend's name is required"
            }
          ]
        }

        return undefined
      }
    ]
  })
  const { getValue: getFriendsName } = friendsNameField

  const friendsEmailField = useEmailFormField()
  const { getValue: getFriendsEmail } = friendsEmailField

  const form = useForm({
    fields: [yourNameField, yourEmailField, friendsNameField, friendsEmailField]
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

      setIsLoading(true)

      const submitted = await shareWithFriendAction({
        yourName: getYourName(),
        yourEmail: getYourEmail(),
        friendsName: getFriendsName(),
        friendsEmail: getFriendsEmail()
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
    },
    [
      addOrUpdateBanner,
      getFriendsEmail,
      getFriendsName,
      getYourEmail,
      getYourName,
      preSubmitCheck
    ]
  )

  return (
    <form onSubmit={handleSubmit}>
      <FormTextInput
        id="your-name"
        label="Your Name"
        inputType="text"
        placeholder="John Doe"
        onTextInput={yourNameField.setValue}
        value={yourNameField.value}
        messageDefinitions={yourNameField.messages}
        hasError={yourNameField.hasError}
        attributes={{
          onBlur: yourNameField.handleBlur
        }}
      />
      <FormTextInput
        id="your-email"
        label="Your Email"
        inputType="text"
        placeholder="john.doe@example.com"
        onTextInput={yourEmailField.setValue}
        value={yourEmailField.value}
        messageDefinitions={yourEmailField.messages}
        hasError={yourEmailField.hasError}
        attributes={{
          onBlur: yourEmailField.handleBlur
        }}
      />
      <FormTextInput
        id="friends-name"
        label="Friend's Name"
        inputType="text"
        placeholder="Jane Doe"
        onTextInput={friendsNameField.setValue}
        value={friendsNameField.value}
        messageDefinitions={friendsNameField.messages}
        hasError={friendsNameField.hasError}
        attributes={{
          onBlur: friendsNameField.handleBlur
        }}
      />
      <FormTextInput
        id="friends-email"
        label="Friend's Email"
        inputType="text"
        placeholder="john.doe@example.com"
        onTextInput={friendsEmailField.setValue}
        value={friendsEmailField.value}
        messageDefinitions={friendsEmailField.messages}
        hasError={friendsEmailField.hasError}
        attributes={{
          onBlur: friendsEmailField.handleBlur
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
