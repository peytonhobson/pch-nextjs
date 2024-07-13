import React from 'react'
import {
  FormElementLayout,
  type FormElementLayoutProps
} from './FormElementLayout'
import { FormMessages, type FormMessagesProps } from './FormMessages'
import { TextInput } from './TextInput'
import type { InputAttributes, InputType, TextInputProps } from './TextInput'

import './TextInput.css'

type FormTextInputProps<T extends InputType> = Omit<
  TextInputProps<T>,
  'label'
> & {
  label?: FormElementLayoutProps['label']
  messageDefinitions?: FormMessagesProps['messageDefinitions']
  className?: FormElementLayoutProps['className']
} & InputAttributes<T>

export function FormTextInput<T extends InputType>({
  label,
  messageDefinitions,
  className,
  ...propDrop
}: FormTextInputProps<T>) {
  return (
    <FormElementLayout
      className={`formTextInputStyle ${className}`}
      label={label}
      formElement={<TextInput {...propDrop} />}
      messages={<FormMessages messageDefinitions={messageDefinitions} />}
    />
  )
}
