'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArticleEntry, ArticleListPageConfig } from '@/types/page';

interface ArticleListPageProps {
  config: ArticleListPageConfig;
  articles: ArticleEntry[];
}

const markdownComponents = {
  h1: ({ children }: React.ComponentProps<'h1'>) => <h1 className="text-2xl font-serif font-bold text-primary mt-6 mb-3">{children}</h1>,
  h2: ({ children }: React.ComponentProps<'h2'>) => <h2 className="text-xl font-serif font-bold text-primary mt-6 mb-3">{children}</h2>,
  h3: ({ children }: React.ComponentProps<'h3'>) => <h3 className="text-lg font-semibold text-primary mt-5 mb-2">{children}</h3>,
  p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-4 last:mb-0">{children}</p>,
  ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
  ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
  li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
  a: ({ ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
    />
  ),
  blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
      {children}
    </blockquote>
  ),
  strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
  em: ({ children }: React.ComponentProps<'em'>) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
};

export default function ArticleListPage({ config, articles }: ArticleListPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">{config.title}</h1>
        {config.description && (
          <p className="text-lg text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed">
            {config.description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary">{article.title}</h2>
                {article.summary && (
                  <p className="text-neutral-600 dark:text-neutral-500 mt-2">{article.summary}</p>
                )}
              </div>
              {article.date && (
                <span className="shrink-0 text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                  {article.date}
                </span>
              )}
            </div>

            {article.image && (
              <img
                src={article.image}
                alt=""
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 mb-4"
              />
            )}

            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
              <ReactMarkdown components={markdownComponents}>
                {article.content}
              </ReactMarkdown>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-5">
              {article.tags?.map((tag) => (
                <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                  {tag}
                </span>
              ))}
              {article.link && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent font-medium ml-auto"
                >
                  Open link
                </a>
              )}
            </div>
          </motion.article>
        ))}

        {articles.length === 0 && (
          <div className="text-neutral-600 dark:text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6">
            No articles yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}
