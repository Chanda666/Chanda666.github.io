import { notFound } from 'next/navigation';
import { getTomlContent, getMarkdownContent } from '@/lib/content';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import type { ThoughtsPageConfig, ThoughtModule } from '@/types/thought';
import ThoughtsModuleDetailPageClient from '@/components/pages/ThoughtsModuleDetailPageClient';
import type { Metadata } from 'next';

interface ModulePageData {
  module: ThoughtModule;
  content: string;
}

function loadModuleData(slug: string, locale?: string): ModulePageData | null {
  const cfg = getTomlContent<ThoughtsPageConfig>('learning.toml', locale);
  if (!cfg) return null;

  const mod = cfg.modules.find((m) => m.id === slug);
  if (!mod) return null;

  const content = getMarkdownContent(mod.source, locale);
  return { module: mod, content };
}

export function generateStaticParams() {
  const cfg = getTomlContent<ThoughtsPageConfig>('learning.toml');
  if (!cfg) return [];
  return cfg.modules.map((mod) => ({ module: mod.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const data = loadModuleData(module);
  if (!data) return {};
  const config = getConfig();
  return {
    title: data.module.title,
    description: data.module.subtitle,
    openGraph: {
      title: `${data.module.title} | ${config.site.title}`,
      description: data.module.subtitle,
    },
  };
}

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const baseConfig = getConfig();
  const runtimeI18n = getRuntimeI18nConfig(baseConfig.i18n);
  const targetLocales = runtimeI18n.enabled ? runtimeI18n.locales : [runtimeI18n.defaultLocale];

  const dataByLocale: Record<string, ModulePageData> = {};

  for (const locale of targetLocales) {
    const data = loadModuleData(module, locale);
    if (data) {
      dataByLocale[locale] = data;
    }
  }

  const defaultData = loadModuleData(module);
  if (defaultData) {
    dataByLocale[runtimeI18n.defaultLocale] = dataByLocale[runtimeI18n.defaultLocale] || defaultData;
  }

  if (Object.keys(dataByLocale).length === 0) {
    notFound();
  }

  return (
    <ThoughtsModuleDetailPageClient
      dataByLocale={dataByLocale}
      defaultLocale={runtimeI18n.defaultLocale}
      backHref="/learning"
      backLabel="Back to Learning"
    />
  );
}