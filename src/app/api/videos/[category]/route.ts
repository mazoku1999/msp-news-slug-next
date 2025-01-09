import { NextResponse } from 'next/server'
import { videos } from '@/data/videos'

export async function GET(
    request: Request,
    { params }: { params: { category: string } }
) {
    const { category } = params

    const categoryVideos = videos.filter(item => item.category === category)

    if (!categoryVideos.length) {
        return NextResponse.json(
            { error: 'No videos found in this category' },
            { status: 404 }
        )
    }

    return NextResponse.json(categoryVideos)
} 