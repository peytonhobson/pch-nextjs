import React from 'react'
import { SpinnerIcon } from './SpinnerIcon'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}

const PRIMARY_CLASS =
  'btn btn-block btn-md rounded-lg bg-brand-green-gray border-none hover:bg-brand-dark-green no-underline text-white'

export function Button({
  variant,
  children,
  className,
  onClick,
  type = 'button',
  loading,
  disabled
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${PRIMARY_CLASS} ${className}`}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? <SpinnerIcon /> : children}
    </button>
  )
}
