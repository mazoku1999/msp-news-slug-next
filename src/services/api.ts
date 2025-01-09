import { News, Video } from '@/types'

const DEFAULT_CACHE_TIME = 3600
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = {
    async getNews(category?: string): Promise<News[]> {
        const url = category ? `${BASE_URL}/api/articles/${category}` : `${BASE_URL}/api/articles`
        const response = await fetch(url, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch news')
        return response.json()
    },

    async getNewsById(category: string, slug: string): Promise<News> {
        const response = await fetch(`${BASE_URL}/api/articles/${category}/${slug}`, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch news article')
        return response.json()
    },

    async getVideos(category?: string): Promise<Video[]> {
        const url = category ? `${BASE_URL}/api/videos/${category}` : `${BASE_URL}/api/videos`
        const response = await fetch(url, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch videos')
        return response.json()
    },

    async getVideoById(category: string, slug: string): Promise<Video> {
        const response = await fetch(`${BASE_URL}/api/videos/${category}/${slug}`, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch video')
        return response.json()
    }
} 