/**
 * Single accordion row: a title + quote-line trigger that expands to
 * reveal `children`. Height animates via the CSS grid-template-rows
 * 0fr/1fr trick (transitioning a `grid-rows-*` utility) rather than
 * measuring pixel heights in JS — smooth, no bounce, and content can be
 * any height without recalculation. motion-reduce disables the
 * transition, matching Reveal's convention elsewhere in the app.
 *
 * The trigger is a plain <button>, so Enter/Space and focus-visible
 * all come for free; aria-expanded/aria-controls wire it to the panel
 * for screen readers.
 */
export default function AccordionItem({ id, title, quote, isOpen, onToggle, children }) {
  const triggerId = `${id}-trigger`
  const panelId = `${id}-panel`

  return (
    <div id={id} className="border-b border-taupe/30">
      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left"
        >
          <span>
            <span className="block font-serif font-light text-2xl md:text-3xl text-espresso mb-1">
              {title}
            </span>
            <span className="block font-sans text-espresso/70 text-sm md:text-base">
              {quote}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 font-serif font-light text-2xl text-espresso transition-transform duration-300 ease-out ${
              isOpen ? 'rotate-45' : ''
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-8 md:pb-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
