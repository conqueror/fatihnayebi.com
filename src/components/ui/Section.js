import React from "react"

const Section = ({ 
  children, 
  className = "", 
  background = "white", 
  fullWidth = false,
  ...props 
}) => {
  const bgColors = {
    white: "bg-white",
    gray: "bg-gray-50",
    sage: "bg-sage-50",
    dark: "bg-gray-900 text-white",
  }
  
  const bgClass = bgColors[background] || bgColors.white
  
  return (
    <section className={`section ${bgClass} ${className}`} {...props}>
      <div className={fullWidth ? "w-full" : "container-custom"}>
        {children}
      </div>
    </section>
  )
}

export default Section 