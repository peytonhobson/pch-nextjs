import NextImage from 'next/image'

export function Card({
  className,
  children,
  image,
  imageLoading = 'lazy',
  onImageLoad,
  imageProps,
  alt,
  title,
  description,
  button
}: {
  className?: string
  children?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  button?: React.ReactNode
} & (
  | {
      image: string
      imageLoading?: 'eager' | 'lazy'
      onImageLoad?: () => void
      imageProps?: Partial<Omit<Parameters<typeof NextImage>[0], 'ref'>>
      alt: string
    }
  | {
      image?: undefined
      imageLoading?: undefined
      onImageLoad?: undefined
      imageProps?: undefined
      alt?: undefined
    }
)) {
  const ImageComponent = typeof image === 'string' ? NextImage : 'div'

  return (
    <div
      className={`shadow-2xl bg-white rounded-2xl max-h-full overflow-hidden ${className}`}
    >
      {image !== undefined && (
        <div className="w-full h-[216px] relative rounded-t-2xl overflow-hidden">
          <ImageComponent
            {...imageProps}
            src={image}
            alt={alt}
            className="object-cover"
            loading={imageLoading}
            onLoad={onImageLoad}
            fill
          />
        </div>
      )}

      {(title || description || button) && (
        <div className="flex flex-col flex-grow justify-between pb-10 px-10">
          <div>
            {title && <h4 className="pt-10">{title}</h4>}
            {description && <div className="pt-5">{description}</div>}
          </div>

          {button && <div className="mt-auto">{button}</div>}
        </div>
      )}

      {children}
    </div>
  )
}

// function Fade({
//   children,
//   className
// }: {
//   children: React.ReactNode
//   className?: string
// }) {
//   return (
//     <TransitionGroup component={undefined} className={className}>
//       <CSSTransitionComponent
//         component={undefined}
//         timeout={1000}
//         classNames="fade"
//         transitionEnterDelay={1000}
//       >
//         {children}
//       </CSSTransitionComponent>
//     </TransitionGroup>
//   )
// }
