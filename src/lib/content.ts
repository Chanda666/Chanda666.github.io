import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import { getTopicFromSource } from '@/lib/topics';
import type { ArticleEntry } from '@/types/page';
import type { ThoughtModule, ThoughtsPageConfig } from '@/types/thought';

const DEFAULT_CONTENT_DIR = 'content';

function normalizeLocale(locale: string): string {
  return locale.trim().replace('_', '-').toLowerCase();
}

function getCandidateFilePaths(filename: string, locale?: string): string[] {
  const candidates: string[] = [];

  if (locale) {
    candidates.push(path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizeLocale(locale)}`, filename));
  }

  candidates.push(path.join(process.cwd(), DEFAULT_CONTENT_DIR, filename));

  return candidates;
}

function readFirstAvailableFile(filename: string, locale?: string): string {
  const candidates = getCandidateFilePaths(filename, locale);

  for (const filePath of candidates) {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Error loading file ${filePath}:`, error);
      }
    }
  }

  if (locale) {
    console.warn(`Missing localized file \"${filename}\" for locale \"${locale}\", and no fallback found in content/.`);
  } else {
    console.warn(`Missing file \"${filename}\" in content/.`);
  }

  return '';
}

export function getMarkdownContent(filename: string, locale?: string): string {
  return readFirstAvailableFile(filename, locale);
}

export function getBibtexContent(filename: string, locale?: string): string {
  return readFirstAvailableFile(filename, locale);
}

export function getTomlContent<T>(filename: string, locale?: string): T | null {
  const content = readFirstAvailableFile(filename, locale);
  if (!content) {
    return null;
  }

  try {
    return parse(content) as unknown as T;
  } catch (error) {
    console.error(`Error parsing TOML file ${filename}:`, error);
    return null;
  }
}

export function getPageConfig<T = unknown>(pageName: string, locale?: string): T | null {
  return getTomlContent<T>(`${pageName}.toml`, locale);
}

function parseFrontmatter(markdown: string): { data: Record<string, unknown>; content: string } {
  if (!markdown.startsWith('---')) {
    return { data: {}, content: markdown.trim() };
  }

  const end = markdown.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: markdown.trim() };
  }

  const rawFrontmatter = markdown.slice(3, end).trim();
  const content = markdown.slice(end + 4).trim();

  try {
    return {
      data: parse(rawFrontmatter) as Record<string, unknown>,
      content,
    };
  } catch (error) {
    console.error('Error parsing markdown frontmatter:', error);
    return { data: {}, content };
  }
}

function getArticlesDirectory(source: string, locale?: string): string {
  if (locale) {
    const localizedPath = path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizeLocale(locale)}`, source);
    if (fs.existsSync(localizedPath)) {
      return localizedPath;
    }
  }

  return path.join(process.cwd(), DEFAULT_CONTENT_DIR, source);
}

export function getArticleEntries(source: string, locale?: string): ArticleEntry[] {
  const articlesDirectory = getArticlesDirectory(source, locale);

  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs.readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filepath = path.join(articlesDirectory, filename);
      const markdown = fs.readFileSync(filepath, 'utf-8');
      const { data, content } = parseFrontmatter(markdown);
      const slug = filename.replace(/\.md$/, '');

      return {
        title: typeof data.title === 'string' ? data.title : slug,
        date: typeof data.date === 'string' ? data.date : undefined,
        summary: typeof data.summary === 'string' ? data.summary : undefined,
        tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
        link: typeof data.link === 'string' ? data.link : undefined,
        image: typeof data.image === 'string' ? data.image : undefined,
        slug,
        content,
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function toPosixPath(filepath: string): string {
  return filepath.split(path.sep).join('/');
}

function titleFromSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function walkMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkMarkdownFiles(fullPath);
    }
    return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

function moduleFromMarkdown(source: string, markdown: string): ThoughtModule {
  const { data } = parseFrontmatter(markdown);
  const id = typeof data.id === 'string'
    ? data.id
    : path.basename(source, '.md');

  return {
    id,
    title: typeof data.title === 'string' ? data.title : titleFromSlug(id),
    subtitle: typeof data.subtitle === 'string'
      ? data.subtitle
      : typeof data.summary === 'string'
        ? data.summary
        : undefined,
    keywords: Array.isArray(data.keywords)
      ? data.keywords.filter((item): item is string => typeof item === 'string')
      : Array.isArray(data.tags)
        ? data.tags.filter((item): item is string => typeof item === 'string')
        : undefined,
    links: Array.isArray(data.links)
      ? data.links.filter((item): item is { title: string; href?: string } => {
        return Boolean(item) && typeof item === 'object' && typeof (item as { title?: unknown }).title === 'string';
      })
      : undefined,
    source,
    topic: getTopicFromSource(source),
  };
}

function discoverModules(root: string, locale?: string): ThoughtModule[] {
  const roots = [
    path.join(process.cwd(), DEFAULT_CONTENT_DIR, root),
  ];

  if (locale) {
    const localizedRoot = path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizeLocale(locale)}`, root);
    if (fs.existsSync(localizedRoot)) {
      roots.push(localizedRoot);
    }
  }

  const bySource = new Map<string, ThoughtModule>();

  for (const directory of roots) {
    for (const filepath of walkMarkdownFiles(directory)) {
      const relativePath = toPosixPath(path.relative(directory, filepath));
      const source = `${root}/${relativePath}`;
      const markdown = fs.readFileSync(filepath, 'utf-8');
      bySource.set(source, moduleFromMarkdown(source, markdown));
    }
  }

  return Array.from(bySource.values());
}

export function getModulesPageConfig(filename: string, root: string, locale?: string): ThoughtsPageConfig | null {
  const config = getTomlContent<ThoughtsPageConfig>(filename, locale);
  if (!config) {
    return null;
  }

  const configuredModules = (config.modules || []).map((module) => ({
    ...module,
    topic: module.topic || getTopicFromSource(module.source),
  }));
  const modulesBySource = new Map<string, ThoughtModule>();

  for (const mod of configuredModules) {
    modulesBySource.set(mod.source, mod);
  }

  for (const mod of discoverModules(root, locale)) {
    if (!modulesBySource.has(mod.source)) {
      modulesBySource.set(mod.source, mod);
    }
  }

  return {
    ...config,
    modules: Array.from(modulesBySource.values()),
  };
}
