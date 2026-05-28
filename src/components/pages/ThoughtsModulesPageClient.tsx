'use client';

import ThoughtsModulesPage from './ThoughtsModulesPage';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { ThoughtsPageConfig } from '@/types/thought';

interface ThoughtsModulesPageClientProps {
  configsByLocale: Record<string, ThoughtsPageConfig>;
  defaultLocale: string;
  baseHref?: string;
  moduleKind: 'learning' | 'thoughts';
}

export default function ThoughtsModulesPageClient({
  configsByLocale,
  defaultLocale,
  baseHref,
  moduleKind,
}: ThoughtsModulesPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = configsByLocale[defaultLocale] || Object.values(configsByLocale)[0];
  const config = configsByLocale[locale] || fallback;

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ThoughtsModulesPage config={config} baseHref={baseHref} moduleKind={moduleKind} locale={locale || defaultLocale} />
    </div>
  );
}
