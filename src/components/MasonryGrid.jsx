/**
 * Asymmetric grid utility for sections where multiple images sit
 * together (lookbook, gallery, etc). 3 equal desktop columns, every
 * tile given an explicit grid position (see MasonryItem) rather than
 * relying on auto-placement — gap-5 = 20px, per the spec (not 0 —
 * this isn't the flush-edge services grid).
 *
 * No grid-auto-flow value is set, intentionally: with every tile
 * explicitly positioned via col-start/row-start, auto-flow has
 * nothing left to place and nothing to reorder. (An earlier version
 * of this grid used auto-placement with `dense` packing, which
 * reordered tiles out of source order to fill gaps — removed rather
 * than left inert.)
 *
 * Below `sm`, positions collapse to a simple single-column stack so
 * crops don't get squeezed into awkward slivers on narrow screens.
 */
export default function MasonryGrid({ className = '', children }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 sm:auto-rows-[140px] gap-5 ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * A single tile inside MasonryGrid. `position` is the FULL set of
 * sm:-prefixed col-start/row-start/row-span classes for this tile's
 * exact desktop cell (e.g. "sm:col-start-1 sm:row-start-1
 * sm:row-span-2") — pass it pre-prefixed so Tailwind's static class
 * scanner can see the literal utility names. On mobile it's ignored
 * (single-column stack, fixed height).
 */
export function MasonryItem({ position = '', className = '', children }) {
  return <div className={`h-56 sm:h-auto ${position} ${className}`}>{children}</div>
}
