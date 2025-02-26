import React from "react"
import { Link } from "gatsby"

const Button = ({ 
  children, 
  to, 
  href, 
  variant = "primary", 
  className = "", 
  ...props 
}) => {
  const baseClasses = "btn"
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  }
  
  const variantClass = variants[variant] || variants.primary
  const combinedClasses = `${baseClasses} ${variantClass} ${className}`
  
  // Internal link (Gatsby)
  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    )
  }
  
  // External link
  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    )
  }
  
  // Regular button
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}

export default Button 