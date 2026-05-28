'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpenIcon,
  ArrowRightIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import type { ThoughtsPageConfig } from '@/types/thought';
import {
  getDefaultTopic,
  getTopicsForKind,
  type TopicOption,
} from '@/lib/topics';
import TopicDropdown from './TopicDropdown';

interface ThoughtsModulesPageProps {
  config: ThoughtsPageConfig;
  baseHref?: string;
  moduleKind: 'learning' | 'thoughts';
  locale: string;
}

function getUiText(locale: string) {
  return locale === 'zh'
    ? {
      topic: '主题',
      contents: '内容',
      readMore: 'Read more',
      empty: '暂无内容',
    }
    : {
      topic: 'Topic',
      contents: 'Contents',
      readMore: 'Read more',
      empty: 'No content yet',
    };
}

function resolveInitialTopic(options: TopicOption[], moduleKind: 'learning' | 'thoughts') {
  const preferred = getDefaultTopic(moduleKind);
  return options.some((option) => option.key === preferred) ? preferred : options[0]?.key;
}

export default function ThoughtsModulesPage({
  config,
  baseHref = '/thoughts',
  moduleKind,
  locale,
}: ThoughtsModulesPageProps) {
  const options = useMemo(() => getTopicsForKind(moduleKind), [moduleKind]);
  const [currentTopic, setCurrentTopic] = useState(() => resolveInitialTopic(options, moduleKind));
  const ui = getUiText(locale);
  const filteredModules = useMemo(() => {
    return config.modules.filter((mod) => mod.topic === currentTopic);
  }, [config.modules, currentTopic]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">{config.title}</h1>
          {config.description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed">
              {config.description}
            </p>
          )}
        </div>

        <div className="shrink-0 sm:pt-8">
          <TopicDropdown
            options={options}
            currentTopic={currentTopic || options[0]?.key || ''}
            onChange={setCurrentTopic}
            locale={locale}
            label={ui.topic}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredModules.map((mod, index) => (
          <motion.article
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <Link href={`${baseHref}/${mod.id}`} className="block">
              <div className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpenIcon className="h-5 w-5 text-accent shrink-0" />
                      <h2 className="text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                        {mod.title}
                      </h2>
                    </div>

                    {mod.subtitle && (
                      <p className="text-neutral-600 dark:text-neutral-500 mt-2 mb-4 leading-relaxed">
                        {mod.subtitle}
                      </p>
                    )}

                    {mod.links && mod.links.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          {ui.contents}
                        </p>
                        <div className="space-y-1.5">
                          {mod.links.map((link) => (
                            <div
                              key={link.title}
                              className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-500"
                            >
                              <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                              {link.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {mod.keywords && mod.keywords.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        <TagIcon className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                        {mod.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent whitespace-nowrap">
                      <span>{ui.readMore}</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}

        {filteredModules.length === 0 && (
          <div className="text-neutral-600 dark:text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6 text-center">
            {ui.empty}
          </div>
        )}
      </div>
    </motion.div>
  );
}
