export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text' | 'articles';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

export interface ArticleEntry {
    title: string;
    date?: string;
    summary?: string;
    tags?: string[];
    link?: string;
    image?: string;
    slug: string;
    content: string;
}

export interface ArticleListPageConfig extends BasePageConfig {
    type: 'articles';
    source: string;
}
