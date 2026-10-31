import { Link } from 'wouter';
import { usePageMeta } from '@/core';
import { useI18n } from '@/i18n';

/** An empty tray where the page should have been. */
function EmptyTray() {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 120" className="h-auto w-full">
      <ellipse cx="120" cy="96" rx="104" ry="14" style={{ fill: 'var(--rule)' }} />
      <path d="M22 78h196l-14 18H36Z" style={{ fill: 'var(--accent)' }} />
      <path d="M22 78h196" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: 'var(--heading)' }} />
      {[62, 104, 150, 178].map((x, i) => (
        <circle key={x} cx={x} cy={70 - (i % 2) * 3} r="2.6" style={{ fill: 'var(--pn-butter)' }} />
      ))}
    </svg>
  );
}

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t('notFound.title'));
  return (
    <div className="page grid items-center gap-12 pt-16 md:grid-cols-12">
      <div className="md:col-span-7">
        <h1 className="text-[clamp(2.75rem,7vw,5rem)] text-heading">{t('notFound.title')}</h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">{t('notFound.body')}</p>
        <Link href="/" className="btn btn-accent mt-8">
          {t('notFound.cta')}
        </Link>
      </div>
      <div className="mx-auto w-[min(20rem,72vw)] md:col-span-5">
        <EmptyTray />
      </div>
    </div>
  );
}
