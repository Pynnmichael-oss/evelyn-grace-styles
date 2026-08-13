/**
 * Stand-in for a real image. Keeps real, descriptive alt text on a
 * decorative gray block so it's a drop-in swap for an <img> later —
 * just replace the div with an <img src=... alt={alt} /> using the
 * same alt copy.
 */
export default function ImagePlaceholder({ alt, className = '', style }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex items-center justify-center bg-gray-200 overflow-hidden ${className}`}
      style={style}
    >
      <span className="text-center text-xs font-sans text-gray-500 px-4 leading-relaxed">
        IMAGE: {alt}
      </span>
    </div>
  )
}
