/** Steam over the hero's bread: three wisps that rise three times, then rest (CSS). */
export function Steam({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 70" className={`steam overflow-visible ${className}`}>
      {[22, 58, 94].map((x, i) => (
        <path
          key={x}
          d={`M${x} 66c-8-10 8-16 0-26s8-16 0-26`}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ stroke: 'var(--steam)', animationDelay: `${i * 0.45}s` }}
        />
      ))}
    </svg>
  );
}
