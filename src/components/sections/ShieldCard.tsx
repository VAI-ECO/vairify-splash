interface ShieldCardProps {
  number: number;
  faviconSrc: string;
  title: string;
  description: string;
  videoUrl?: string | null;
  showVideoButton?: boolean;
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

  return (
    <div
      onClick={onClick}
      className={`
        relative
        bg-[#1e293b]
        rounded-xl
        p-6
        min-h-[213px]
        border border-white/10
        cursor-pointer
        transition-all duration-200
        hover:shadow-lg hover:border-white/20
        ${highlighted ? 'shadow-lg shadow-teal-500/30 scale-105' : ''}
      `}
    >
      {/* ROW 1: Number and Favicon */}
      <div className="flex items-center gap-2">
        {/* Number */}
        <div
          className="text-[48px] font-bold text-[#2dd4bf] leading-none"
          style={{ fontWeight: 700 }}
        >
          {number}
        </div>

        {/* Favicon */}
        <img
          src={faviconSrc}
          alt="Shield icon"
          className="w-7 h-7 ml-2"
          style={{ verticalAlign: 'middle' }}
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
        className="text-[14px] text-[#94a3b8] mt-2"
        style={{ fontWeight: 400 }}
      >
        {description}
      </p>

      {/* Play Button */}
      {showVideoButton && videoUrl && (
        <button
          onClick={handleVideoPlay}
          className="
            absolute bottom-4 right-4
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
  );
}
