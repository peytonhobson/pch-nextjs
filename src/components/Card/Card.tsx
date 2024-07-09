export function Card({
  className,
  children,
  image,
  alt,
  title,
  description,
  button
}: {
  className?: string
  children?: React.ReactNode
  image?: string | true | undefined
  alt?: string
  title?: React.ReactNode
  description?: React.ReactNode
  button?: React.ReactNode
}) {
  const ImageComponent = typeof image === 'string' ? 'img' : 'div'

  return (
    <div
      className={`shadow-2xl bg-white rounded-2xl max-h-full overflow-hidden ${className}`}
    >
      {image && (
        <ImageComponent
          src={typeof image === 'string' ? image : undefined}
          alt={alt}
          className="rounded-t-2xl w-full h-2/5 object-cover"
        />
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
