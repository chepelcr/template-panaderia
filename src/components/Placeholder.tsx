import { ProductFallbackIcon } from './CmsIcon';

/** Identity placeholder: pastry-box mint with the store's fallback icon. */
export function Placeholder({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'deep' }) {
  const deep = tone === 'deep';
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${deep ? 'bg-surface-deep-raised text-ink-on-deep-soft' : 'bg-surface-quiet text-heading'}`}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <span aria-hidden="true" className="box-stripes absolute inset-x-0 top-0 h-[18%] opacity-60" />
      <ProductFallbackIcon className="relative h-10 w-10" strokeWidth={1.5} />
    </div>
  );
}
