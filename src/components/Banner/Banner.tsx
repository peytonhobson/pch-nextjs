import React from 'react'
import './Banner.css'
import type { ReactElement } from 'react'

export type BannerVariants = 'success' | 'danger'

export interface BannerProps {
  variant: BannerVariants
  content: ReactElement | string
}

/** View component for global level banner alerts */
export function Banner({ content, variant }: BannerProps) {
  return (
    <div className={`banner ${variant === 'danger' ? 'danger' : 'success'}`}>
      <div className="content">{content}</div>
    </div>
  )
}
