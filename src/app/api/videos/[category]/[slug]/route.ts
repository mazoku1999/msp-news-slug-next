import { NextResponse } from 'next/server'
import { videos } from '@/data/videos'

export async function GET(
    request: Request,
    { params }: { params: { category: string; slug: string } }
) {
    const { category, slug } = params

    const video = videos.find(
        item => item.category === category && item.slug === slug
    )

    if (!video) {
        return NextResponse.json(
            { error: 'Video not found' },
            { status: 404 }
        )
    }

    return NextResponse.json(video)
} 