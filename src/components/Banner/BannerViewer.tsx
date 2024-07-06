'use client'
import React, { Fragment } from 'react'
import { createPortal } from 'react-dom'
import { Banner } from './Banner'
import { useBannerManager } from './useBannerManager'
import './BannerViewer.css'

/** Displays banners from BannerManager context.
 * Uses a portalElement to render the banner
 * outside of the default hierarchy.
 */
export function BannerViewer() {
  const { currentBannerDefinition } = useBannerManager()

  console.log(currentBannerDefinition)

  return currentBannerDefinition ? (
    createPortal(
      <div className="banner-viewer-container">
        <Banner {...currentBannerDefinition} />
      </div>,
      document.body
    )
  ) : (
    <Fragment />
  )
}
