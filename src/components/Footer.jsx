import Button from './Button'

/**
 * Mirrors the header bar layout (wordmark left / location right),
 * plus a contact line, one CTA repeat, and a copyright line. Same
 * generous section padding as the rest of the page — not compressed.
 */
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-taupe/30 bg-sand">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="caption-label text-[13px] text-espresso">
            Evelyn Grace Styles
          </span>
          <span className="caption-label text-[13px] text-espresso">
            Phoenix, AZ
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif font-light text-2xl text-espresso mb-2">
              Let&rsquo;s start with a conversation.
            </p>
            <a
              href="mailto:hello@evelyngracestyles.com"
              className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
            >
              hello@evelyngracestyles.com
            </a>
          </div>

          <Button as="a" href="#process">
            Start the Process
          </Button>
        </div>

        <div className="mt-16 pt-6 border-t border-taupe/30">
          <p className="caption-label text-[11px] text-espresso/70">
            © {new Date().getFullYear()} Evelyn Grace Styles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
