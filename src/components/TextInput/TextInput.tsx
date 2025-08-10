import React from 'react'
import './TextInput.css'
import type { InputHTMLAttributes } from 'react'

export type InputType = 'text' | 'password' | 'date' | 'textarea' | 'file'

export type TextInputProps<T extends InputType> = {
  /* Custom class name */
  className?: string | undefined
  /* Styles the input as an error */
  hasError?: boolean | undefined
  /* Unique identifier for the input */
  id: string
  /* The type of input */
  inputType: T
  /* Callback for when the input value changes */
  onTextInput?: (text: string) => void
  /* The placeholder for the input */
  placeholder?: string
  /* The value of the input */
  value?: string
  /* Disables the input */
  disabled?: boolean | undefined
  /* Callback for when the input changes */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'] | undefined
}

export type InputAttributes<T extends InputType> = {
  attributes?: Omit<
    InputHTMLAttributes<
      T extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement
    >,
    'type' | keyof TextInputProps<T>
  >
}

/** Externally managed form element */
export function TextInput<T extends InputType>({
  className,
  disabled,
  hasError,
  id,
  inputType,
  onChange,
  onTextInput,
  value,
  placeholder,

  attributes = {}
}: TextInputProps<T> & InputAttributes<T>) {
  const Component = inputType === 'textarea' ? 'textarea' : ('input' as any)

  return (
    <div
      className={`
        formTextInput
        ${className}
        ${Boolean(value) && 'hasValue'},
        ${hasError && 'hasError'},
        ${inputType === 'file' && 'fileInput'}
      `}
    >
      <div className="inputContainer">
        <Component
          {...attributes}
          placeholder={placeholder}
          className={`input ${className}`}
          disabled={disabled}
          type={inputType}
          value={value}
          name={id}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const targetValue = event.target.value

            if (typeof onTextInput === 'function') {
              onTextInput(targetValue)
            }

            if (typeof onChange === 'function') {
              onChange(event)
            }
          }}
        />
      </div>
    </div>
  )
}
