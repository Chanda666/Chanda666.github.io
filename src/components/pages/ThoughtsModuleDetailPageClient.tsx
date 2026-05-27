'use client';

import ThoughtsModuleDetailPage from './ThoughtsModuleDetailPage';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { ThoughtModule } from '@/types/thought';

interface ModulePageData {
  module: ThoughtModule;
  content: string;
}

interface ThoughtsModuleDetailPageClientProps {
  dataByLocale: Record<string, ModulePageData>;
  defaultLocale: string;
  backHref?: string;
  backLabel?: string;
}

export default function ThoughtsModuleDetailPageClient({
  dataByLocale,
  defaultLocale,
  backHref,
  backLabel,
}: ThoughtsModuleDetailPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ThoughtsModuleDetailPage module={data.module} content={data.content} backHref={backHref} backLabel={backLabel} />
    </div>
  );
}