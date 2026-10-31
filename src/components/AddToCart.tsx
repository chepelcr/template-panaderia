import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { announce, isPurchasable, useCart, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';

export const BASKET_EVENT = 'tsuru:basket-added';

const CRUMBS = [-70, -35, -5, 25, 55, 80];

/**
 * Adds the item and tells the header to settle the basket; sold-out items
 * cannot be added. A few crumbs fall off the button when it lands.
 */
export function AddToCart({
  item,
  quantity = 1,
  variant = 'full',
  tone = 'accent',
  className = '',
}: {
  item: CatalogItem;
  quantity?: number;
  variant?: 'full' | 'compact';
  tone?: 'accent' | 'quiet';
  className?: string;
}) {
  const { t, langOf } = useI18n();
  const add = useCart((s) => s.add);
  const available = isPurchasable(item);
  const [burst, setBurst] = useState(0);

  const onAdd = () => {
    const added = add(item, quantity);
    if (added <= 0) {
      announce(t('product.limit'));
      return;
    }
    const message = t('product.added', { name: item.name });
    announce(added < quantity ? `${message}. ${t('product.limit')}` : message);
    window.dispatchEvent(new CustomEvent(BASKET_EVENT));
    setBurst((n) => n + 1);
  };

  if (!available) {
    return (
      <button type="button" disabled className={`btn btn-quiet ${className}`}>
        {t('product.soldOut')}
      </button>
    );
  }

  // On cards the button says "Agregar"; its accessible name still names the item.
  const compact = variant === 'compact';
  return (
    <button
      type="button"
      onClick={onAdd}
      aria-label={compact ? t('product.addNamed', { name: item.name }) : undefined}
      className={`btn ${tone === 'quiet' ? 'btn-quiet' : 'btn-accent'} ${compact ? 'px-4 text-sm' : ''} ${className}`}
    >
      {burst > 0 && (
        <span key={burst} aria-hidden="true">
          {CRUMBS.map((angle) => (
            <span key={angle} className="crumb" style={{ ['--crumb-angle' as string]: `${angle}deg` }} />
          ))}
        </span>
      )}
      <ShoppingBag aria-hidden="true" className={`h-4 w-4 ${tone === 'quiet' ? 'text-accent-text' : ''}`} />
      <span lang={langOf('product.add')}>{compact ? t('product.add.short') : t('product.add')}</span>
    </button>
  );
}
