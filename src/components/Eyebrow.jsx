/**
 * "( LABEL )" eyebrow — centered, General Sans Medium 13px, uppercase,
 * tracking-[0.18em], espresso. Literal parens with a thin space inside.
 * Always carries 20px margin below before the heading that follows.
 */
const THIN_SPACE = ' '

export default function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`text-center font-sans font-medium text-[13px] uppercase tracking-[0.18em] text-espresso mb-5 ${className}`}
    >
      {`(${THIN_SPACE}`}
      {children}
      {`${THIN_SPACE})`}
    </p>
  )
}
