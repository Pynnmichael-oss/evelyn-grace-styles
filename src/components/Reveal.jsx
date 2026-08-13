import useInView from '../hooks/useInView'

/**
 * Scroll-reveal wrapper: fade + 12px slide-up over 500-600ms ease-out.
 * No animation library — plain CSS transitions driven by useInView.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const [ref, isInView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[550ms] ease-out motion-reduce:transition-none ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
