import { useContext } from 'react'
import { BannerManagerContext } from './BannerManager'

/** Access tools from BannerManager context; global banner alerts */
export function useBannerManager() {
  const context = useContext(BannerManagerContext)

  if (context === undefined) {
    throw Error('BannerManagerContext is not in the component tree')
  }

  return context
}
