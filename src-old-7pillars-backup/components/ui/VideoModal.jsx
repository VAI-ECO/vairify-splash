import { X, Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  const [isMuted, setIsMuted] = useState(true)

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        {title && (
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        )}
        
        <div className="relative bg-card rounded-lg overflow-hidden">
          <video
            src={videoUrl}
            autoPlay
            muted={isMuted}
            loop
            className="w-full h-auto"
          />
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  )
}
