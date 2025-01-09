import { Metadata } from 'next';
import { api } from '@/services/api';
import { VideoCard } from '@/components/VideoCard';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Videos in ${resolvedParams.category}`,
        description: `Explore our videos about ${resolvedParams.category}`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;
    const videos = await api.getVideos(resolvedParams.category);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">
                Videos about {resolvedParams.category}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <VideoCard key={video.id} video={video} index={index} />
                ))}
            </div>
        </div>
    );
} 