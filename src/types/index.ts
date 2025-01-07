export interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    category: string;
    created_at: string;
    video?: {
        id: string;
        title: string;
        description?: string;
    };
}

export interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    author: string;
    created_at: string;
    slug: string;
    category: string;
    views?: number;
    duration?: string;
}

export interface News {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    created_at: string;
    category: string;
    slug: string;
    readTime?: string;
    tags?: string[];
    video?: {
        id: string;
        title: string;
        description?: string;
        slug: string;
    };
} 