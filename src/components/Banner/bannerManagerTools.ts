import { useCallback, useMemo } from 'react'
import { useFreshState } from '../../utils/useFreshState'
import type { BannerProps } from './Banner'

type BannerId = symbol | string

export interface BannerDefinition extends BannerProps {
  id: BannerId
}

/** Singleton, builds tools for use in BannerManager */
export function useBannerTools() {
  const [getBannerDefinitionStack, setBannerDefinitionStack] = useFreshState<
    Map<BannerId, BannerProps>
  >(new Map())

  const bannerDefinitionStack = getBannerDefinitionStack()

  const currentBannerDefinition = useMemo(
    () => Array.from(bannerDefinitionStack).at(-1)?.[1],
    [bannerDefinitionStack]
  )

  const removeBanner = useCallback(
    (id: BannerId) => {
      const nextBannerDefinitionStack = new Map(getBannerDefinitionStack())

      nextBannerDefinitionStack.delete(id)

      setBannerDefinitionStack(nextBannerDefinitionStack)
    },
    [getBannerDefinitionStack, setBannerDefinitionStack]
  )

  const addOrUpdateBanner = useCallback(
    ({ id, ...bannerProps }: BannerDefinition) => {
      const nextBannerDefinitionStack = new Map(getBannerDefinitionStack())

      nextBannerDefinitionStack.set(id, {
        ...bannerProps
      })

      setBannerDefinitionStack(nextBannerDefinitionStack)

      setTimeout(() => {
        removeBanner(id)
      }, 3000)
    },
    [getBannerDefinitionStack, removeBanner, setBannerDefinitionStack]
  )

  return {
    addOrUpdateBanner,
    currentBannerDefinition,
    removeBanner
  }
}

export type BannerMangerTools = ReturnType<typeof useBannerTools>
