/**
 * Centered short rule — 40px wide, 1.5px thick, terracotta.
 * Vertical margin defaults to 64px+ but is overridable via className.
 */
export default function Divider({ className = 'my-16' }) {
  return (
    <div
      className={`w-10 h-[1.5px] bg-terracotta mx-auto ${className}`}
      role="presentation"
    />
  )
}
