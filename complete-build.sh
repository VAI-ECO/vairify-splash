#!/bin/bash
# Vairify 9-Shields Rebuild - Completion Script
# This script creates all remaining components from the master spec

echo "Creating remaining layout components..."

# Header
cat > src/components/layout/Header.jsx << 'EOF'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../common/Button'

const NAV_ITEMS = [
  { label: 'FAQ', href: '/faq', external: false },
  { label: 'Forum', href: 'https://forum.vairify.com', external: true },
  { label: 'Blog', href: '/blog', external: false },
  { label: 'APIs', href: '/apis', external: false },
]

export default function Header({ onReserve }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        isScrolled ? 'bg-background/90 backdrop-blur-lg border-b border-white/5' : ''
      }\`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-vairify-purple rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-background">V</span>
          </div>
          <span className="font-bold text-xl text-text-primary hidden sm:inline">
            Vairify
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={\`transition-colors \${
                  location.pathname === item.href
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }\`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Button variant="primary" size="small" onClick={onReserve}>
            RESERVE SPOT
          </Button>
        </nav>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card-bg border-t border-white/5"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={\`py-2 transition-colors \${
                      location.pathname === item.href
                        ? 'text-accent-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }\`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Button variant="primary" className="mt-4" onClick={onReserve}>
                RESERVE YOUR SPOT — $0
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
EOF

echo "Header created ✓"

# Create placeholder section components for now
echo "Creating placeholder section components..."

for section in Hero Pain Shields FreeBomb Premium Business LittleThings WeBuiltIt TierTable FinalCTA; do
  cat > src/components/sections/${section}.jsx << EOF
export default function ${section}() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-text-primary">${section} Section</h2>
        <p className="text-text-secondary mt-4">Component under construction...</p>
      </div>
    </section>
  )
}
EOF
done

echo "Section placeholders created ✓"

# Create placeholder page components
echo "Creating page components..."

for page in Home FAQ Blog APIs; do
  cat > src/pages/${page}.jsx << EOF
export default function ${page}() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-text-primary mb-8">${page}</h1>
        <p className="text-text-secondary">Page content coming soon...</p>
      </div>
    </div>
  )
}
EOF
done

echo "Pages created ✓"
echo ""
echo "✅ Build script complete!"
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Open browser to http://localhost:5173"
echo "3. Implement detailed sections from master spec"
