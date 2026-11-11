import { Link } from 'wouter';
import { categoriesWithItems, facetsFor, featuredItems, homeContent, paragraphs, useCatalog, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { BoxTile } from '@/components/BoxTile';
import { BreadCard, BreadCardSkeleton } from '@/components/BreadCard';
import { CmsIcon } from '@/components/CmsIcon';
import { HoursTicket } from '@/components/HoursTicket';
import { Placeholder } from '@/components/Placeholder';
import { Steam } from '@/components/Steam';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';
import { Vitrina, VitrinaItem } from '@/components/Vitrina';

export default function Home() {
  const { t } = useI18n();
  const cms = useCmsPage('home');
  const home = homeContent(cms.page);
  const catalog = useCatalog();
  usePageMeta(cms.page?.title, cms.page?.metaDescription);

  const featured = featuredItems(catalog.items, 10);
  const boxes = categoriesWithItems(catalog.categories, catalog.items);
  const counts = facetsFor(catalog.items).categories;
  const categoryOf = (id: string | null) => catalog.categories.find((c) => c.id === id);
  const story = paragraphs(home.story.content);

  return (
    <>
      <section className="page grid items-center gap-x-12 gap-y-14 pb-6 pt-10 md:grid-cols-12 md:pt-16">
        <div className={home.hero.image ? 'md:col-span-6' : 'md:col-span-9'}>
          {cms.isLoading ? (
            <div aria-hidden="true" className="flex flex-col gap-4">
              <div className="skeleton h-8 w-36 rounded-full" />
              <div className="skeleton h-16 w-full" />
              <div className="skeleton h-16 w-2/3" />
              <div className="skeleton h-5 w-3/4" />
            </div>
          ) : cms.isError ? (
            <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
          ) : (
            <>
              {home.hero.badge && (
                <p className="mb-5 inline-flex rounded-full bg-[color:var(--pn-butter)] px-4 py-1.5 font-bold text-[color:var(--pn-choc)]">{home.hero.badge}</p>
              )}
              {home.hero.title && <h1 className="text-[clamp(2.75rem,7.5vw,5.25rem)] text-heading">{home.hero.title}</h1>}
              {home.hero.subtitle && <p className="mt-6 max-w-[34rem] text-lg text-ink-soft">{home.hero.subtitle}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                {home.hero.ctaPrimary && (
                  <Link href="/products" className="btn btn-accent">
                    {home.hero.ctaPrimary}
                  </Link>
                )}
                {home.hero.ctaSecondary && (
                  <Link href="/contact" className="btn btn-quiet">
                    {home.hero.ctaSecondary}
                  </Link>
                )}
              </div>
            </>
          )}
          <HoursTicket className="mt-8 max-w-md" />
        </div>
        {home.hero.image && (
          <div className="md:col-span-6">
            <div className="relative mx-auto w-[min(32rem,88vw)] max-w-full pt-[clamp(4.5rem,8vw,6rem)]">
              <Steam className="absolute left-1/2 top-1 h-[clamp(4.5rem,8vw,6rem)] -translate-x-1/2" />
              <div className="rise bun relative aspect-[5/4] bg-surface-quiet shadow-lift">
                <StoreImage src={home.hero.image} alt="" priority sizes="(min-width: 768px) 32rem, 88vw" maxWidth={1200} fallback={<Placeholder />} />
              </div>
            </div>
          </div>
        )}
      </section>

      {(boxes.length > 0 || catalog.isLoading) && (
        <section aria-labelledby={home.categories.title ? 'home-boxes' : undefined} className="page pt-20">
          {(home.categories.title || home.categories.subtitle) && (
            <div className="mb-9 max-w-2xl">
              {home.categories.title && (
                <h2 id="home-boxes" className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">
                  {home.categories.title}
                </h2>
              )}
              {home.categories.subtitle && <p className="mt-3 text-lg text-ink-soft">{home.categories.subtitle}</p>}
            </div>
          )}
          {catalog.isLoading ? (
            <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="skeleton aspect-[4/5]" />
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {boxes.map((category, index) => (
                <li key={category.id}>
                  <BoxTile category={category} count={counts.get(category.id) ?? 0} index={index} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section aria-labelledby={home.featured.title ? 'home-vitrina' : undefined} className="page pt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {home.featured.title && (
              <h2 id="home-vitrina" className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">
                {home.featured.title}
              </h2>
            )}
            {home.featured.subtitle && <p className="mt-3 text-lg text-ink-soft">{home.featured.subtitle}</p>}
          </div>
          {catalog.items.length > 0 && (
            <Link href="/products" className="btn btn-quiet">
              {t('catalog.viewAll')}
            </Link>
          )}
        </div>
        {catalog.isLoading ? (
          <div className="vitrina px-5 pb-6 pt-5">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className={i > 1 ? 'hidden sm:block' : ''}>
                  <BreadCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : catalog.isError ? (
          <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
        ) : featured.length === 0 ? (
          <p className="text-lg text-ink-soft">{t('catalog.empty.store')}</p>
        ) : (
          <Vitrina label={home.featured.title ?? t('catalog.title')}>
            {featured.map((item) => (
              <VitrinaItem key={item.id}>
                <BreadCard item={item} category={categoryOf(item.categoryId)} />
              </VitrinaItem>
            ))}
          </Vitrina>
        )}
      </section>

      {home.benefits.length > 0 && (
        <section className="page pt-24">
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {home.benefits.map((benefit) => (
              <li key={benefit.title} className="flex flex-col gap-3 rounded-frame bg-surface-quiet p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-raised text-accent-text shadow-soft">
                    <CmsIcon icon={benefit.icon} className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="min-w-0 text-xl text-heading">{benefit.title}</h3>
                </div>
                {benefit.description && <p className="mt-1 text-ink-soft">{benefit.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(home.story.title || story.length > 0) && (
        <section className="page pt-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
            {home.story.image && (
              <div className="bun aspect-[5/4] bg-surface-quiet md:col-span-5">
                <StoreImage src={home.story.image} alt="" sizes="(min-width: 768px) 38vw, 100vw" maxWidth={1100} fallback={<Placeholder />} />
              </div>
            )}
            <div className={home.story.image ? 'md:col-span-7' : 'md:col-span-9'}>
              {home.story.title && <h2 className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">{home.story.title}</h2>}
              <div className="mt-5 flex max-w-[58ch] flex-col gap-3 text-lg text-ink-soft">
                {story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link href="/about" className="btn btn-quiet mt-8">
                {t('nav.about')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {(home.cta.title || home.cta.description) && (
        <section className="page pt-24">
          <div className="on-deep overflow-hidden rounded-[2rem] bg-surface-deep text-ink-on-deep">
            <div aria-hidden="true" className="box-stripes h-4" />
            <div className="flex flex-col items-start gap-7 p-8 sm:p-10 md:flex-row md:items-center md:justify-between md:p-14">
              <div className="max-w-xl">
                {home.cta.title && <h2 className="text-[clamp(2rem,4vw,3rem)]">{home.cta.title}</h2>}
                {home.cta.description && <p className="mt-3 text-lg text-ink-on-deep-soft">{home.cta.description}</p>}
              </div>
              {home.cta.buttonText && (
                <Link href="/contact" className="btn btn-butter shrink-0">
                  {home.cta.buttonText}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
