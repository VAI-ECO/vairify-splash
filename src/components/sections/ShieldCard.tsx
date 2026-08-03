interface ShieldCardProps {
  number: number;
  faviconSrc: string;
  title: string;
  description: string;
  videoUrl?: string | null;
  showVideoButton?: boolean;
  documentUrl?: string | null;
  documentButtonText?: string;
  onClick?: () => void;
  highlighted?: boolean;
}

export default function ShieldCard({
  number,
  faviconSrc,
  title,
  description,
  videoUrl = null,
  showVideoButton = true,
  documentUrl = null,
  documentButtonText = 'Read Document',
  onClick,
  highlighted = false,
}: ShieldCardProps) {
  const handleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoUrl) {
      // TODO: Implement video modal or player
      console.log('Play video:', videoUrl);
    }
  };

  const handleDocumentOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (documentUrl) {
      window.open(documentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine background color based on shield number
  const bgColor = number <= 3 ? '#3B82F6' : '#8B5CF6';

  return (
    <div
      onClick={onClick}
      className={`
        relative
        rounded-xl
        p-6
        min-h-[213px]
        cursor-pointer
        transition-all duration-200
        hover:shadow-lg
        ${highlighted ? 'shadow-lg shadow-white/30 scale-105' : ''}
      `}
      style={{
        background: bgColor,
        border: '1px solid rgba(255,255,255,0.55)'
      }}
    >
      {/* ROW 1: Number (top left) */}
      <div className="flex items-start justify-between">
        {/* Number */}
        <div
          className="text-[48px] font-bold text-white leading-none"
          style={{ fontWeight: 700 }}
        >
          {number}
        </div>

        {/* Favicon (top right) */}
        <img
          src={faviconSrc}
          alt=""
          aria-hidden="true"
          className="w-7 h-7"
        />
      </div>

      {/* ROW 2: Title */}
      <h3
        className="text-[20px] font-semibold text-white mt-3"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h3>

      {/* ROW 3: Description */}
      <p
        className="text-[14px] text-white/90 mt-2"
        style={{ fontWeight: 400 }}
      >
        {description}
      </p>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {/* Document Button */}
        {documentUrl && (
          <button
            onClick={handleDocumentOpen}
            className="
              px-3 py-1.5
              border border-white/30
              rounded-md
              bg-transparent
              text-white/70 text-xs font-medium
              transition-all duration-200
              hover:border-white/50 hover:bg-white/5 hover:text-white/90
            "
            aria-label={documentButtonText}
          >
            {documentButtonText}
          </button>
        )}

        {/* Play Button */}
        {showVideoButton && videoUrl && (
          <button
            onClick={handleVideoPlay}
            className="
              w-11 h-11
              border-2 border-white/30
              rounded-full
              bg-transparent
              flex items-center justify-center
              transition-all duration-200
              hover:border-white/50 hover:bg-white/5
            "
            aria-label="Play video"
          >
            {/* Play icon triangle */}
            <svg
              className="w-4 h-4 text-white/70 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
