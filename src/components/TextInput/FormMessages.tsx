import React, { Fragment, memo } from 'react'
import { ErrorMessage } from './ErrorMessage'
import type { MessageDefinition } from '../../utils/useFormField'

export type FormMessagesProps = {
  messageDefinitions: MessageDefinition[] | undefined
}

export const FormMessages = memo(function FormMessages({
  messageDefinitions
}: FormMessagesProps) {
  if (!messageDefinitions) {
    return <Fragment />
  }

  return (
    <Fragment>
      {messageDefinitions.map(({ message }, index) => (
        <ErrorMessage key={index}>{message}</ErrorMessage>
      ))}
    </Fragment>
  )
})
