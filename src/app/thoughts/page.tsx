import { getModulesPageConfig } from '@/lib/content';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import type { ThoughtsPageConfig } from '@/types/thought';
import ThoughtsModulesPageClient from '@/components/pages/ThoughtsModulesPageClient';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: 'Thoughts',
    description: 'Knowledge notes organized by topic.',
    openGraph: {
      title: `Thoughts | ${config.site.title}`,
      description: 'Knowledge notes organized by topic.',
    },
  };
}

export default function ThoughtsPage() {
  const baseConfig = getConfig();
  const runtimeI18n = getRuntimeI18nConfig(baseConfig.i18n);
  const targetLocales = runtimeI18n.enabled ? runtimeI18n.locales : [runtimeI18n.defaultLocale];

  const configsByLocale: Record<string, ThoughtsPageConfig> = {};

  for (const locale of targetLocales) {
    const cfg = getModulesPageConfig('thoughts.toml', 'thoughts', locale);
    if (cfg) {
      configsByLocale[locale] = cfg;
    }
  }

  const defaultCfg = getModulesPageConfig('thoughts.toml', 'thoughts');
  if (defaultCfg) {
    configsByLocale[runtimeI18n.defaultLocale] = configsByLocale[runtimeI18n.defaultLocale] || defaultCfg;
  }

  return <ThoughtsModulesPageClient configsByLocale={configsByLocale} defaultLocale={runtimeI18n.defaultLocale} moduleKind="thoughts" />;
}
