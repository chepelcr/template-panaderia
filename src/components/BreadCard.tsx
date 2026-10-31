import { Link } from 'wouter';
import { isPurchasable, type CatalogCategory, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from './AddToCart';
import { Availability } from './Availability';
import { Placeholder } from './Placeholder';
import { Price } from './Price';
import { StoreImage } from './StoreImage';

/** A piece in the display case: its photo in a bread-roll frame, its name and price. */
export function BreadCard({ item, category, sizes = '(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 58vw', headingLevel = 'h3' }: { item: CatalogItem; category?: CatalogCategory; sizes?: string; headingLevel?: 'h2' | 'h3' }) {
  const { t } = useI18n();
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-[color:var(--focus)]">
      <div className={`bun relative aspect-[5/4] bg-surface-quiet shadow-soft transition-transform duration-300 group-hover:-translate-y-1 ${isPurchasable(item) ? '' : 'grayscale'}`}>
        <StoreImage src={item.imageUrl} alt="" sizes={sizes} maxWidth={720} fallback={<Placeholder />} />
        {item.kind === 'service' && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[color:var(--pn-butter)] px-3 py-1 text-xs font-bold text-[color:var(--pn-choc)]">{t('product.service')}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 pt-4 text-center">
        {category && <p className="text-sm text-ink-soft">{category.name}</p>}
        <Heading className="text-xl leading-tight text-heading">
          <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
            {item.name}
          </Link>
        </Heading>
        {item.duration && <p className="text-sm text-ink-soft">{t('product.duration', { duration: item.duration })}</p>}
        <div className="mt-auto flex flex-col items-center gap-1 pt-2">
          <Price item={item} />
          <div className="flex flex-wrap justify-center gap-x-3">
            <Availability item={item} showDuration={false} />
          </div>
        </div>
        <div className="relative z-10 pt-3">
          <AddToCart item={item} variant="compact" tone="quiet" className="w-full" />
        </div>
      </div>
    </article>
  );
}

export function BreadCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center">
      <div className="bun skeleton aspect-[5/4] w-full" />
      <div className="skeleton mt-4 h-3 w-1/3" />
      <div className="skeleton mt-2 h-5 w-2/3" />
      <div className="skeleton mt-3 h-6 w-24" />
    </div>
  );
}
