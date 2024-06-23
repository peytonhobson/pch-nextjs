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
  image?: string
  alt?: string
  title?: React.ReactNode
  description?: React.ReactNode
  button?: React.ReactNode
}) {
  return (
    <div className={`shadow-2xl bg-white rounded-2xl max-h-full ${className}`}>
      {image && (
        <img
          src={image}
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
