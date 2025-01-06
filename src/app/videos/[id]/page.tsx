import { notFound } from "next/navigation"
import { getVideo } from "@/lib/data"
import { User } from "lucide-react"
import { VideoPlayer } from "@/components/VideoPlayer"
import { vi } from "date-fns/locale"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function VideoPage({ params }: PageProps) {
    const videoId = await params
    const video = await getVideo(videoId.id)
    // Si el ID no es un número válido, retornamos 404
    if (!video) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <VideoPlayer url={video.url} />
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{video.title}</h1>
                        <p className="text-lg text-muted-foreground">{video.description}</p>
                    </div>

                    <div className="flex items-center justify-between py-4 border-y">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-violet-500" />
                            <span className="text-sm font-medium">{video.author}</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {new Date(video.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 