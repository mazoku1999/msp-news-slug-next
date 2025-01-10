import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import { cache } from 'react';
import { Suspense } from 'react';

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// Implementar cache para la función de fetching
export const getVideoById = cache(async (category: string, slug: string) => {
    const video = await api.getVideoById(category, slug);
    return video;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const video = await getVideoById(resolvedParams.category, resolvedParams.slug);

    if (!video) {
        return {
            title: 'Video Not Found | MSP News',
            description: 'The requested video could not be found.'
        };
    }

    return {
        title: `${video.title} | MSP News`,
        description: video.description,
        openGraph: {
            title: video.title,
            description: video.description,
            type: 'video.other',
            images: [{ url: video.thumbnail }],
            videos: [{ url: video.url }]
        }
    };
}

export default async function VideoPage({ params }: Props) {
    const resolvedParams = await params;
    const video = await getVideoById(resolvedParams.category, resolvedParams.slug);

    if (!video) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<div className="w-full h-[480px] animate-pulse bg-muted rounded-lg" />}>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <iframe
                            width="100%"
                            height="480"
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
                    <p className="text-gray-600">{video.description}</p>
                </div>
            </Suspense>
        </div>
    );
} 