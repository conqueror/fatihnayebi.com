import React from "react"
import Button from "./Button"

const Hero = ({
  title,
  subtitle,
  description,
  image,
  imageAlt = "Hero Image",
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  align = "left",
  ...props
}) => {
  const alignmentClasses = {
    left: "text-left md:flex-row",
    center: "text-center md:flex-col items-center",
    right: "text-right md:flex-row-reverse",
  }

  const alignment = alignmentClasses[align] || alignmentClasses.left

  return (
    <div className="bg-gradient-to-r from-sage-50 to-gray-50 py-16 md:py-20 lg:py-24" {...props}>
      <div className="container-custom">
        <div className={`flex flex-col md:justify-between gap-8 md:gap-12 ${alignment}`}>
          <div className="md:w-1/2 flex flex-col justify-center">
            {subtitle && <p className="text-sage-600 font-semibold mb-2">{subtitle}</p>}
            {title && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">{title}</h1>}
            {description && <p className="text-lg md:text-xl text-gray-700 mb-8">{description}</p>}
            
            {(primaryButtonText || secondaryButtonText) && (
              <div className={`flex gap-4 mt-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
                {primaryButtonText && primaryButtonLink && (
                  <Button
                    to={primaryButtonLink.startsWith("http") ? null : primaryButtonLink}
                    href={primaryButtonLink.startsWith("http") ? primaryButtonLink : null}
                    variant="primary"
                  >
                    {primaryButtonText}
                  </Button>
                )}
                
                {secondaryButtonText && secondaryButtonLink && (
                  <Button
                    to={secondaryButtonLink.startsWith("http") ? null : secondaryButtonLink}
                    href={secondaryButtonLink.startsWith("http") ? secondaryButtonLink : null}
                    variant="secondary"
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {image && (
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src={image}
                alt={imageAlt}
                className="max-h-96 object-contain rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero 