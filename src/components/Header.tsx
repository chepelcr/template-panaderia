import * as Dialog from '@radix-ui/react-dialog';
import { Menu, ShoppingBag, X, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartTotals, useIsDemo, useStore, useStoreName, useAccountLinks } from '@/core';
import { useI18n } from '@/i18n';
import { BASKET_EVENT } from './AddToCart';
import { ThemeToggle } from './ThemeToggle';

export const NAV = [
  { href: '/', key: 'nav.home' },
  { href: '/products', key: 'nav.catalog' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function useIsActive() {
  const [location] = useLocation();
  return (href: string) => (href === '/' ? location === '/' : location === href || location.startsWith(`${href}/`));
}

/** The default mark when the store has no logo: a scored loaf on the store's colour. */
export function BunMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="19" style={{ fill: 'var(--accent)' }} />
      <path d="M7.5 26.5C7.5 18.6 13 13 20 13s12.5 5.6 12.5 13.5c0 1.4-1.1 2.5-2.5 2.5H10c-1.4 0-2.5-1.1-2.5-2.5Z" style={{ fill: 'var(--pn-butter)' }} />
      <path d="M12.5 22.5l3.5-3.5M18.3 21.5l3.5-3.5M24 22.5l3.5-3.5" fill="none" strokeWidth="1.9" strokeLinecap="round" style={{ stroke: 'var(--pn-crust)' }} />
    </svg>
  );
}

function StoreMark() {
  const { organization, theme } = useStore();
  const name = useStoreName();
  const logo = theme?.logoUrl ?? organization?.logoUrl ?? null;
  if (!name) return <span aria-hidden="true" className="skeleton block h-8 w-24 max-w-full" />;
  return (
    <span className="flex w-full min-w-0 items-center gap-2.5">
      {logo ? <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" /> : <BunMark className="h-9 w-9 shrink-0" />}
      <span className="min-w-0 flex-1 break-words font-display text-lg leading-tight [overflow-wrap:anywhere] sm:text-2xl">{name}</span>
    </span>
  );
}

export function Header() {
  const { t, plural } = useI18n();
  const name = useStoreName();
  const isDemo = useIsDemo();
  const { count } = useCartTotals();
  const openCart = useCart((s) => s.open);
  const isActive = useIsActive();
  // Barter and the account live in the store's own menus, not in a bar of their own.
  const { barter, account } = useAccountLinks(t);
  const navLinks = [...NAV, barter];
  const menuLinks = [...navLinks, account];
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [adds, setAdds] = useState(0);

  useEffect(() => {
    const onAdded = () => setAdds((n) => n + 1);
    window.addEventListener(BASKET_EVENT, onAdded);
    return () => window.removeEventListener(BASKET_EVENT, onAdded);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header ref={headerRef} className="relative z-30 bg-surface">
      {isDemo && <p className="bg-[color:var(--pn-butter)] px-4 py-1.5 text-center text-xs font-semibold text-[color:var(--pn-choc)] sm:text-sm">{t('demo.notice')}</p>}
      <div className="page flex min-h-14 items-center gap-1.5 py-1.5 sm:min-h-[4.5rem] sm:gap-2">
        <Link href="/" title={name || undefined} aria-label={name || undefined} className="flex min-h-tap min-w-0 flex-1 items-center rounded-full pr-1 text-heading lg:max-w-[18rem] lg:flex-initial">
          <StoreMark />
        </Link>

        <nav aria-label={t('nav.primary')} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="nav-link flex min-h-tap items-center rounded-full px-3 text-base font-bold text-ink-soft transition-colors hover:text-heading aria-[current=page]:text-heading"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={account.href} aria-label={account.label} title={account.label} aria-current={isActive(account.href) ? 'page' : undefined} className="icon-btn hidden shrink-0 text-heading hover:bg-surface-quiet lg:inline-grid">
          <UserRound aria-hidden="true" className="h-5 w-5" />
        </Link>

        <ThemeToggle />

        <button id="store-cart-trigger" type="button" onClick={openCart} className="btn btn-strong shrink-0 !gap-1.5 !px-2 sm:!px-3">
          <ShoppingBag key={adds} aria-hidden="true" className={`h-5 w-5 ${adds ? 'basket-settle' : ''}`} />
          <span className="hidden sm:inline">{t('nav.cart')}</span>
          <span aria-hidden="true" className="grid h-6 min-w-6 place-items-center rounded-full bg-[color:var(--pn-butter)] px-1.5 text-sm font-bold tabular-nums text-[color:var(--pn-choc)]">
            {count}
          </span>
          <span className="sr-only">{plural('nav.cart.count', count)}</span>
        </button>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="icon-btn shrink-0 text-heading hover:bg-surface-quiet lg:hidden" aria-label={t('nav.menu')}>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal container={headerRef.current}>
            <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-[color:var(--scrim)]" />
            <Dialog.Content className="nav-menu fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto overscroll-contain rounded-b-[1.75rem] bg-surface pb-[max(.75rem,env(safe-area-inset-bottom))] text-ink shadow-lift">
              <div aria-hidden="true" className="box-stripes h-3 w-full" />
              <div className="px-4 pt-[env(safe-area-inset-top)]">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-2xl text-heading">{t('nav.menu')}</Dialog.Title>
                  <Dialog.Description className="sr-only">{t('nav.primary')}</Dialog.Description>
                  <Dialog.Close className="icon-btn -mr-2 text-heading hover:bg-surface-quiet" aria-label={t('nav.close')}>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </Dialog.Close>
                </div>
                <nav aria-label={t('nav.primary')} className="mt-1">
                  <ul className="flex flex-col divide-y divide-[color:var(--rule)]">
                    {menuLinks.map(({ href, key }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={isActive(href) ? 'page' : undefined}
                          className="flex min-h-tap items-center justify-between px-3 font-display text-xl text-heading aria-[current=page]:text-accent-text"
                        >
                          {t(key)}
                          {isActive(href) && <span aria-hidden="true" className="bun h-4 w-5 bg-[color:var(--pn-butter)]" />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div aria-hidden="true" className="box-stripes h-1.5" />
    </header>
  );
}
