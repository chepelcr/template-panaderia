import { Clock } from 'lucide-react';
import { businessHours, useStore } from '@/core';
import { useI18n } from '@/i18n';

/** The store's hours as the store wrote them (informational, never an "open now" claim). */
export function HoursTicket({ className = '' }: { className?: string }) {
  const { contact } = useStore();
  const { t } = useI18n();
  const hours = businessHours(contact);
  if (!hours) return null;
  return (
    <div className={`flex items-start gap-3 rounded-2xl bg-surface-raised p-4 shadow-soft ${className}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--pn-butter)] text-[color:var(--pn-choc)]">
        <Clock aria-hidden="true" className="h-5 w-5" />
      </span>
      <div>
        <p className="font-bold text-heading">{t('contact.hours')}</p>
        <p className="whitespace-pre-line text-sm text-ink-soft">{hours}</p>
      </div>
    </div>
  );
}
