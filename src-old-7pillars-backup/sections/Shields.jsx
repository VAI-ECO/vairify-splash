import { useState } from 'react'
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react'
import { shields } from '../data/shields'

export default function Shields({ onOpenVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [linkedHighlighted, setLinkedHighlighted] = useState(false)

  const handleShieldClick = (shield) => {
    if (shield.linkedGroup === 'chainpass') {
      // Highlight all 3 ChainPass shields
      setLinkedHighlighted(true)
      // Play the ChainPass video
      onOpenVideo(shield.videoUrl, 'ChainPass V.A.I. Flow')
      // Reset highlight after a moment
      setTimeout(() => setLinkedHighlighted(false), 3000)
    } else {
      // Play individual shield video
      onOpenVideo(shield.videoUrl, shield.title)
    }
  }

  const nextShield = () => {
    setCurrentIndex((prev) => (prev + 1) % shields.length)
  }

  const prevShield = () => {
    setCurrentIndex((prev) => (prev - 1 + shields.length) % shields.length)
  }

  const isLinkedShield = (shield) => shield.linkedGroup === 'chainpass'

  return (
    <section id="shields" className="section-padding bg-gradient-to-b from-white to-card">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            THE 9 SHIELDS OF PROTECTION
          </h2>
          <p className="text-xl md:text-2xl text-textMuted">
            What if every person you met passed all nine?
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="carousel-3d min-h-[500px] flex items-center justify-center relative overflow-visible">
            {shields.map((shield, idx) => {
              const diff = idx - currentIndex
              let position = 'hidden'
              if (diff === 0) position = 'center'
              else if (diff === -1 || (diff === shields.length - 1 && currentIndex === 0)) position = 'left'
              else if (diff === 1 || (diff === -(shields.length - 1) && currentIndex === shields.length - 1)) position = 'right'

              const isHighlighted = linkedHighlighted && isLinkedShield(shield)

              return (
                <div
                  key={shield.number}
                  className={'absolute carousel-card ' + position}
                  onClick={() => position === 'center' && handleShieldClick(shield)}
                  style={{ cursor: position === 'center' ? 'pointer' : 'default' }}
                >
                  <div className={'bg-white p-8 rounded-2xl shadow-2xl border-4 transition-all ' + (
                    isHighlighted ? 'border-primary scale-110' : 'border-transparent'
                  )}>
                    {/* Shield Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold font-mono text-primary">{shield.number}</span>
                      </div>
                      <img src={shield.icon} alt={shield.layer} className="w-16 h-16" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-textPrimary">
                      {shield.title}
                    </h3>

                    {/* Blurb */}
                    <p className="text-textMuted mb-6">{shield.blurb}</p>

                    {/* Layer Badge */}
                    <div className="inline-block px-4 py-2 bg-background rounded-full text-sm font-semibold">
                      {shield.layer}
                    </div>

                    {/* Linked Indicator */}
                    {isLinkedShield(shield) && (
                      <div className="mt-4 text-xs text-primary font-mono">
                        ● Part of ChainPass Flow (Shields 1-3)
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevShield}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/40 p-4 rounded-full transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextShield}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/40 p-4 rounded-full transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {shields.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={'w-3 h-3 rounded-full transition-all ' + (
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-textMuted/30'
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center space-y-8">
          <p className="text-xl text-textMuted">
            5 minutes to set up. Seconds to use. Every meeting.
          </p>

          <div className="space-y-4">
            <p className="text-2xl font-bold">Seen enough?</p>
            <a
              href="#pricing"
              className="inline-block bg-primary text-background px-12 py-4 rounded-lg text-xl font-bold hover:bg-primary/90 transition-all"
            >
              RESERVE YOUR SPOT — $0
            </a>
            <p className="text-textMuted">or keep scrolling ↓</p>
          </div>
        </div>
      </div>
    </section>
  )
}
