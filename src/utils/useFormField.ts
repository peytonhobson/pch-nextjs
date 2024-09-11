import { useCallback, useEffect, useState, useTransition } from 'react'
import debounce from 'lodash.debounce'
import { useFreshState } from './useFreshState'
import type { ReactNode } from 'react'

const MAXIMUM_PASSWORD_STRENGTH = 4

type PasswordStrength = 0 | 1 | 2 | 3 | 4

export type MessageDefinition =
  | {
      messageType: 'info' | 'error' | 'success'
      message: ReactNode
      passwordStrength?: undefined
    }
  | {
      messageType: 'password-strength'
      passwordStrength: PasswordStrength
      message?: undefined
    }

type Touched = boolean

type UseFormFieldParam<StateGeneric> = {
  initialValue: StateGeneric
  validators?: ((
    value: StateGeneric,
    { touched }: { touched: Touched }
  ) => undefined | MessageDefinition[])[]
  validationDebounceMS?: number | undefined
  validateOnMount?: boolean
}

const DEFAULT_TOUCHED_STATE = false
const DEFAULT_HAS_ERROR_STATE = false
const DEFAULT_HAS_SUBMITTED_STATE = false
const DEFAULT_MESSAGES_STATE = undefined

/** Manage the state of a form field. Use in conjunction with `useForm` to manage form state.
 * Handles validation, touched state, and error messages. */
export function useFormField<StateGeneric>({
  initialValue,
  validators,
  validationDebounceMS,
  validateOnMount
}: UseFormFieldParam<StateGeneric>) {
  const { 1: startTransition } = useTransition()
  const [getValue, setValueInternal] = useFreshState<StateGeneric>(initialValue)

  const value = getValue()

  const [getTouched, setTouched] = useFreshState<Touched>(DEFAULT_TOUCHED_STATE)

  const [hasError, setHasError] = useState<boolean>(DEFAULT_HAS_ERROR_STATE)

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(
    DEFAULT_HAS_SUBMITTED_STATE
  )

  const [messages, setMessages] = useState<MessageDefinition[] | undefined>(
    DEFAULT_MESSAGES_STATE
  )

  const resetFieldState = () => {
    setTouched(DEFAULT_TOUCHED_STATE)
    setHasError(DEFAULT_HAS_ERROR_STATE)
    setHasSubmitted(DEFAULT_HAS_SUBMITTED_STATE)
    setMessages(DEFAULT_MESSAGES_STATE)
  }

  const validateNow = useCallback(() => {
    let nextHasError = false

    const nextMessages = (
      (validators || [])
        .flatMap(validator => validator(getValue(), { touched: getTouched() }))
        .filter(Boolean) as MessageDefinition[]
    ).map(messageDefinition => {
      const { messageType, passwordStrength } = messageDefinition

      const weakPassword =
        passwordStrength && passwordStrength < MAXIMUM_PASSWORD_STRENGTH

      if (messageType === 'password-strength' && weakPassword) {
        nextHasError = true
      }

      if (messageDefinition.messageType === 'error') {
        nextHasError = true
      }

      return messageDefinition
    })

    setHasError(nextHasError)

    startTransition(() => {
      setMessages(nextMessages.length ? nextMessages : undefined)
    })

    return { hasError: nextHasError }
    // 🦶🔫: no dependencies! Necessary for debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateDebounced = useCallback(
    debounce(() => {
      if (getTouched()) {
        validateNow()
      }
    }, validationDebounceMS ?? 500),
    [getTouched, validateNow, validationDebounceMS]
  )

  const setValue = useCallback(
    (nextValue: StateGeneric) => {
      setValueInternal(nextValue)
      validateDebounced()
    },
    [setValueInternal, validateDebounced]
  )

  const touched = getTouched()

  useEffect(() => {
    if (touched && !hasSubmitted) {
      validateNow()
    }
    // only validate when touched
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched])

  useEffect(() => {
    if (validateOnMount) {
      validateNow()
    }
    // only validate on mount, when specified
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBlur = useCallback(() => {
    setTouched(true)
  }, [setTouched])

  const preSubmitCheck = useCallback(() => {
    setHasSubmitted(true)
    setTouched(true)
    const validationResult = validateNow()

    if (validationResult.hasError) {
      return false
    }

    return true
  }, [setTouched, validateNow])

  return {
    getValue,
    handleBlur,
    hasError,
    messages,
    preSubmitCheck,
    resetFieldState,
    setValue,
    value,
    getTouched,
    touched,
    validateNow,
    initialValue
  }
}
