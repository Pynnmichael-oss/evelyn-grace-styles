/**
 * Asymmetric grid utility for sections where multiple images sit
 * together (lookbook, gallery, etc). Dense auto-flow + varied spans
 * per tile create the masonry look without a JS layout library.
 * gap-5 = 20px, per the spec (not 0 — this isn't the flush-edge
 * services grid).
 *
 * Below `sm`, spans collapse to a simple single-column stack so crops
 * don't get squeezed into awkward slivers on narrow screens.
 */
export default function MasonryGrid({ className = '', children }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-4 sm:auto-rows-[140px] gap-5 sm:[grid-auto-flow:dense] ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * A single tile inside MasonryGrid. `span` is the FULL set of
 * sm:-prefixed span classes for this tile's desktop footprint (e.g.
 * "sm:col-span-2 sm:row-span-2") — pass it pre-prefixed so Tailwind's
 * static class scanner can see the literal utility names. On mobile
 * it's ignored (single-column stack, fixed height).
 */
export function MasonryItem({ span = 'sm:col-span-2 sm:row-span-2', className = '', children }) {
  return <div className={`h-56 sm:h-auto ${span} ${className}`}>{children}</div>
}
