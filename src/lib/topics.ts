export type SiteLocale = 'zh' | 'en';

export type TopicOption = {
  key: string;
  label: {
    zh: string;
    en: string;
  };
};

export const learningTopics: TopicOption[] = [
  {
    key: 'math',
    label: {
      zh: '数理基础',
      en: 'Mathematical Foundations',
    },
  },
  {
    key: 'computer',
    label: {
      zh: '计算机基础',
      en: 'Computer Science Foundations',
    },
  },
  {
    key: 'papers',
    label: {
      zh: '论文学习',
      en: 'Paper Reading',
    },
  },
  {
    key: 'others',
    label: {
      zh: '其他',
      en: 'Others',
    },
  },
];

export const thoughtTopics: TopicOption[] = [
  {
    key: 'music',
    label: {
      zh: '音乐分享',
      en: 'Music Sharing',
    },
  },
  {
    key: 'film',
    label: {
      zh: '影视分享',
      en: 'Film & TV Sharing',
    },
  },
  {
    key: 'random',
    label: {
      zh: '碎碎念',
      en: 'Random Thoughts',
    },
  },
  {
    key: 'yearly',
    label: {
      zh: '年度纪念',
      en: 'Yearly Memories',
    },
  },
];

export function getTopicLabel(topic: TopicOption, locale: string): string {
  return locale === 'zh' ? topic.label.zh : topic.label.en;
}

export function getTopicFromSource(source: string): string | undefined {
  const parts = source.split('/').filter(Boolean);
  return parts.length >= 3 ? parts[1] : undefined;
}

export function getTopicsForKind(kind: 'learning' | 'thoughts'): TopicOption[] {
  return kind === 'learning' ? learningTopics : thoughtTopics;
}

export function getDefaultTopic(kind: 'learning' | 'thoughts'): string {
  return kind === 'learning' ? 'computer' : 'random';
}
