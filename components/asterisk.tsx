/**
 * The brand asterisk as an inline SVG. The ✳ character gets emoji
 * presentation on iOS, so we draw it ourselves and it renders the same
 * everywhere. Color comes from currentColor.
 */
export default function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
        <line x1="32" y1="10" x2="32" y2="54" />
        <line x1="12.9" y1="21" x2="51.1" y2="43" />
        <line x1="12.9" y1="43" x2="51.1" y2="21" />
      </g>
    </svg>
  );
}
