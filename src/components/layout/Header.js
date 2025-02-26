import React, { useState } from "react"
import { Link } from "gatsby"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Name */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Dr. Fatih Nayebi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              About
            </Link>
            <Link 
              to="/research" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Research & Case Studies
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Blog
            </Link>
            <Link 
              to="/publications" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Publications & Teaching
            </Link>
            <Link 
              to="/consulting" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Consulting
            </Link>
            <Link 
              to="/news" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              News & Media
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors"
              activeClassName="text-sage-600 font-semibold"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 flex flex-col">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              About
            </Link>
            <Link 
              to="/research" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Research & Case Studies
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Blog
            </Link>
            <Link 
              to="/publications" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Publications & Teaching
            </Link>
            <Link 
              to="/consulting" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Consulting
            </Link>
            <Link 
              to="/news" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              News & Media
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-sage-600 font-medium transition-colors text-lg"
              activeClassName="text-sage-600 font-semibold"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header 