'use client'
import React, { createContext } from 'react'
import { useBannerTools } from './bannerManagerTools'
import type { BannerMangerTools } from './bannerManagerTools'
import type { ReactElement } from 'react'

export const BannerManagerContext = createContext<
  BannerMangerTools | undefined
>(undefined)

interface BannerManagerProps {
  children: ReactElement
}

/** Provides BannerManager context; tools for managing global banners */
export function BannerManager({ children }: BannerManagerProps) {
  return (
    <BannerManagerContext.Provider value={useBannerTools()}>
      {children}
    </BannerManagerContext.Provider>
  )
}
