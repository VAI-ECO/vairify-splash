import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import vairifyLogo from '../../assets/logos/vairify-logo.svg'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'How It Works', href: '#shields' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'For Businesses', href: '#business' },
  ]

  return (
    <header 
      className={'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ' + (
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <nav className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={vairifyLogo} alt="Vairify" className="h-10 w-auto" />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-textMuted hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="bg-primary text-background px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Reserve Spot
          </a>
        </div>

        <button
          className="md:hidden text-textPrimary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card md:hidden shadow-lg">
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-textMuted hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#pricing"
                className="bg-primary text-background px-6 py-3 rounded-lg font-bold text-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve Spot
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
