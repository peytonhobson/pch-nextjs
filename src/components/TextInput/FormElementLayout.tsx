import React from 'react'
import './FormElementLayout.css'
import type { ReactElement, ReactNode } from 'react'

export interface FormElementLayoutProps {
  /** Additional styling */
  className?: string | undefined
  /** Additional styling for setting css vars */
  style?: React.CSSProperties | undefined
  /** Element label */
  label?: string | undefined
  /** Form element */
  formElement: ReactElement
  /** Form messages */
  messages?: ReactNode | undefined
}

/** Layout for form elements */
export function FormElementLayout({
  className,
  style,
  label,
  formElement,
  messages
}: FormElementLayoutProps) {
  return (
    <div className={`formElementLayout ${className}`} style={style}>
      {label && <label className="formElementLabel">{label}</label>}
      {formElement}
      <div className="messageContainer">{messages}</div>
    </div>
  )
}
