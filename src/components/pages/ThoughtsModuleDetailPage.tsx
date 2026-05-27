'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { ThoughtModule } from '@/types/thought';

interface ThoughtsModuleDetailPageProps {
  module: ThoughtModule;
  content: string;
  backHref?: string;
  backLabel?: string;
}

const markdownComponents = {
  h1: ({ children }: React.ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>
  ),
  h3: ({ children }: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }: React.ComponentProps<'h4'>) => (
    <h4 className="text-lg font-semibold text-primary mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }: React.ComponentProps<'p'>) => (
    <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: React.ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside mb-4 space-y-1.5 ml-2">{children}</ul>
  ),
  ol: ({ children }: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1.5 ml-2">{children}</ol>
  ),
  li: ({ children }: React.ComponentProps<'li'>) => (
    <li className="mb-1">{children}</li>
  ),
  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    if (isInternal) {
      return (
        <Link
          href={href || '#'}
          className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
      {children}
    </blockquote>
  ),
  strong: ({ children }: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  em: ({ children }: React.ComponentProps<'em'>) => (
    <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>
  ),
  code: ({ className, children, ...props }: React.ComponentProps<'code'> & { className?: string }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.9em] text-accent" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 my-3 text-sm overflow-x-auto ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: React.ComponentProps<'pre'>) => (
    <pre className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 my-4 overflow-x-auto text-sm leading-relaxed border border-neutral-200 dark:border-neutral-700">
      {children}
    </pre>
  ),
  table: ({ children }: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-neutral-200 dark:border-neutral-700 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: React.ComponentProps<'thead'>) => (
    <thead className="bg-neutral-50 dark:bg-neutral-800">{children}</thead>
  ),
  th: ({ children }: React.ComponentProps<'th'>) => (
    <th className="border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-left font-semibold text-primary">
      {children}
    </th>
  ),
  td: ({ children }: React.ComponentProps<'td'>) => (
    <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-2">{children}</td>
  ),
  img: ({ src, alt }: React.ComponentProps<'img'>) => (
    <img
      src={src}
      alt={alt || ''}
      className="w-full max-w-2xl rounded-lg border border-neutral-200 dark:border-neutral-800 my-4"
      loading="lazy"
    />
  ),
  hr: () => <hr className="my-8 border-neutral-200 dark:border-neutral-800" />,
};

export default function ThoughtsModuleDetailPage({ module, content, backHref = '/thoughts', backLabel = 'Back to Thoughts' }: ThoughtsModuleDetailPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors duration-200 mb-8 group"
      >
        <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        {backLabel}
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-primary mb-3">{module.title}</h1>
        {module.subtitle && (
          <p className="text-lg text-neutral-600 dark:text-neutral-500 leading-relaxed">
            {module.subtitle}
          </p>
        )}
        {module.keywords && module.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {module.keywords.map((kw) => (
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

      <article className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
        <ReactMarkdown components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </article>

      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors duration-200 group"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          {backLabel}
        </Link>
      </div>
    </motion.div>
  );
}