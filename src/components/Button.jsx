/**
 * The ONLY button style in the system: solid terracotta-deep fill,
 * cream text, sharp corners, uppercase tracked label. Secondary
 * actions should be text links with a terracotta hover underline,
 * not a variant of this component.
 */
export default function Button({ as: Tag = 'button', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-block bg-terracotta-deep text-cream px-8 py-4 rounded-none caption-label text-[13px] transition-colors duration-200 ease-out hover:bg-[#9B5A3A] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
