import { useState } from 'react'
import type { useFormField } from './useFormField'

type FormFieldObject = ReturnType<typeof useFormField<any>>

const DEFAULT_HAS_SUBMITTED_STATE = false

export function useForm<T extends FormFieldObject[]>({
  fields
}: {
  fields: { [K in keyof T]: T[K] }
  apiError?: unknown
  onUnknownError?: (error: unknown) => void
}) {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(
    DEFAULT_HAS_SUBMITTED_STATE
  )

  const resetFormState = () => {
    fields.forEach(field => {
      field.resetFieldState()
    })

    setHasSubmitted(DEFAULT_HAS_SUBMITTED_STATE)
  }

  const resetFormValues = () => {
    fields.forEach(field => {
      field.setValue(field.initialValue)
    })
  }

  const preSubmitCheck = () => {
    setHasSubmitted(true)

    let isSubmittable = true

    fields.map(field => {
      const isFieldSubmittable = field.preSubmitCheck()

      if (!isFieldSubmittable) {
        isSubmittable = false
      }
    })

    return isSubmittable
  }

  const hasError = fields.some(field => field.hasError)

  return {
    preSubmitCheck,
    hasSubmitted,
    resetFormState,
    resetFormValues,
    hasError
  }
}
