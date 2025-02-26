import React from "react"
import { Link } from "gatsby"

const Card = ({
  title,
  subtitle,
  content,
  image,
  imageAlt,
  link,
  linkText = "Read More",
  className = "",
  ...props
}) => {
  const cardContent = (
    <>
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}
        {content && <div className="mb-4">{content}</div>}
        {link && linkText && (
          <div className="mt-4">
            {typeof link === "string" && link.startsWith("http") ? (
              <a
                href={link}
                className="text-sage-600 hover:text-sage-800 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText} →
              </a>
            ) : (
              <Link
                to={link}
                className="text-sage-600 hover:text-sage-800 font-medium"
              >
                {linkText} →
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )

  const combinedClasses = `card ${className}`

  // If it's a linkable card, wrap everything in a link
  if (link && !linkText) {
    return typeof link === "string" && link.startsWith("http") ? (
      <a
        href={link}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {cardContent}
      </a>
    ) : (
      <Link to={link} className={combinedClasses} {...props}>
        {cardContent}
      </Link>
    )
  }

  // Otherwise, just return the card div
  return (
    <div className={combinedClasses} {...props}>
      {cardContent}
    </div>
  )
}

export default Card 