import { NextResponse } from 'next/server'
import { news } from '@/data/news'

export async function GET(
    request: Request,
    { params }: { params: { category: string; slug: string } }
) {
    const { category, slug } = params

    const article = news.find(
        item => item.category === category && item.slug === slug
    )

    if (!article) {
        return NextResponse.json(
            { error: 'Article not found' },
            { status: 404 }
        )
    }

    return NextResponse.json(article)
} 