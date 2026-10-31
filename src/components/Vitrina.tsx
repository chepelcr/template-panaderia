import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useI18n } from '@/i18n';

/**
 * The display case: a glass shelf that scrolls sideways (snap); the arrows
 * appear only when it overflows and stop at either end.
 */
export function Vitrina({ children, label }: { children: ReactNode; label: string }) {
  const { t } = useI18n();
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const measure = () => {
      const max = node.scrollWidth - node.clientWidth;
      setEdges({ start: node.scrollLeft <= 2, end: node.scrollLeft >= max - 2 });
    };
    measure();
    node.addEventListener('scroll', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      node.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const node = scroller.current;
    node?.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: 'smooth' });
  };
  const overflows = !(edges.start && edges.end);

  return (
    <div>
      <div className="vitrina px-2 pb-6 pt-5 sm:px-4">
        <ul
          ref={scroller}
          aria-label={label}
          className="flex snap-x snap-mandatory scroll-px-3 gap-5 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:gap-7 [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </ul>
      </div>
      {overflows && (
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="icon-btn btn-quiet disabled:opacity-40" disabled={edges.start} onClick={() => scrollBy(-1)} aria-label={t('vitrina.previous')}>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" className="icon-btn btn-quiet disabled:opacity-40" disabled={edges.end} onClick={() => scrollBy(1)} aria-label={t('vitrina.next')}>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export function VitrinaItem({ children }: { children: ReactNode }) {
  return <li className="w-[62%] shrink-0 snap-start sm:w-[32%] lg:w-[calc((100%-3*1.75rem)/4)]">{children}</li>;
}
