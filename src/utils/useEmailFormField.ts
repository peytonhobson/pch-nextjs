import { useFormField } from './useFormField'

export function useEmailFormField() {
  return useFormField({
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
}
