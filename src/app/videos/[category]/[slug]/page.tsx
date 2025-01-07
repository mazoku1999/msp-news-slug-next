import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentService } from '@/services/content-service';
import { Video } from '@/types';

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

async function getVideo(category: string, slug: string): Promise<Video | null> {
    try {
        const video = await ContentService.getVideoBySlug(category, slug);
        console.log('Video found:', video);
        return video;
    } catch (error) {
        console.error('Error fetching video:', error);
        return null;
    }
}

export default async function VideoPage({ params }: Props) {
    const resolvedParams = await params;
    const video = await getVideo(
        resolvedParams.category.toLowerCase(),
        resolvedParams.slug
    );

    if (!video) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
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
        </div>
    );
} 