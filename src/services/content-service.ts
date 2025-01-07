import { News, Video } from '@/types';
import { news } from '@/data/news';
import { videos } from '@/data/videos';

export class ContentService {
    static async getArticleBySlug(category: string, slug: string): Promise<News | null> {
        // console.log('Searching for article:', { category, slug });
        // console.log('Available articles:', news);

        const article = news.find(
            article => {
                console.log('Comparing:', {
                    articleCategory: article.category.toLowerCase(),
                    searchCategory: category.toLowerCase(),
                    articleSlug: article.slug,
                    searchSlug: slug
                });
                return article.category.toLowerCase() === category.toLowerCase() &&
                    article.slug === slug;
            }
        );

        // console.log('Found article:', article);
        return article || null;
    }

    static async getArticlesByCategory(category: string): Promise<News[]> {
        return news.filter(
            article => article.category.toLowerCase() === category.toLowerCase()
        );
    }

    static async getVideoBySlug(category: string, slug: string): Promise<Video | null> {
        const video = videos.find(
            video =>
                video.category.toLowerCase() === category.toLowerCase() &&
                video.slug === slug
        );

        return video || null;
    }

    static async getVideosByCategory(category: string): Promise<Video[]> {
        return videos.filter(
            video => video.category.toLowerCase() === category.toLowerCase()
        );
    }
} 