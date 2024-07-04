import React from 'react'
import './FormMessages.css'
import type { ReactNode } from 'react'

type ErrorMessageProps = {
  children: ReactNode | ReactNode[]
}

/** */
export function ErrorMessage({ children }: ErrorMessageProps) {
  return <div className="errorMessage">{children}</div>
}
