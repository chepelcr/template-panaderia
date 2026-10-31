import { Link } from 'wouter';
import { catalogHref, parseHex, type CatalogCategory } from '@/core';
import { useI18n } from '@/i18n';
import { StoreImage } from './StoreImage';

// Box colours, only for categories the store left without a valid colour.
const ROTATION = ['#CFE8DA', '#F3D27A', '#F7D9DE', '#9E5524'];

/** A category as a pastry box: a striped lid in its own colour, its photo and name. */
export function BoxTile({ category, count, index }: { category: CatalogCategory; count: number; index: number }) {
  const { plural } = useI18n();
  const color = (parseHex(category.backgroundColor) ? category.backgroundColor : null) ?? ROTATION[index % ROTATION.length];
  return (
    <Link href={catalogHref({ category: category.key })} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-surface-raised shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <span aria-hidden="true" className="block h-5 shrink-0" style={{ background: `repeating-linear-gradient(90deg, ${color} 0 1rem, var(--box-paper) 1rem 2rem)` }} />
      <span className="bun relative mx-4 mt-4 block aspect-[5/4] bg-surface-quiet">
        <StoreImage
          src={category.imageUrl}
          alt=""
          sizes="(min-width: 1024px) 12rem, 40vw"
          maxWidth={480}
          fallback={<span className="grid h-full w-full place-items-center font-display text-4xl text-heading">{category.name.slice(0, 1)}</span>}
        />
      </span>
      <span className="px-4 pb-5 pt-3 text-center">
        <span className="block font-display text-xl leading-tight text-heading group-hover:underline">{category.name}</span>
        <span className="mt-1 block text-sm text-ink-soft">{plural('category.count', count)}</span>
      </span>
    </Link>
  );
}
