import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const PRIMARY_CLASS =
  'btn btn-block btn-md rounded-lg bg-brand-green-gray border-none hover:bg-brand-dark-green no-underline text-white'

export function Button({
  variant,
  children,
  className,
  onClick,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${PRIMARY_CLASS} ${className}`}
      type={type}
    >
      {children}
    </button>
  )
}
