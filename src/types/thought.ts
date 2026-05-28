export interface ThoughtModuleLink {
  title: string;
  href?: string;
}

export interface ThoughtModule {
  id: string;
  title: string;
  subtitle?: string;
  keywords?: string[];
  links?: ThoughtModuleLink[];
  source: string;
  topic?: string;
}

export interface ThoughtsPageConfig {
  type: 'thoughts';
  title: string;
  description?: string;
  modules: ThoughtModule[];
}
