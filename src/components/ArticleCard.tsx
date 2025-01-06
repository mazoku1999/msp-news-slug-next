"use client"

import { ArrowRight, User, Calendar } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { News } from "@/types"

interface ArticleCardProps {
    article: News
    index: number
}

const getRandomSize = (index: number) => {
    const sizes = [
        'aspect-[2/3]',    // Alto
        'aspect-square',   // Cuadrado
        'aspect-[3/4]',    // Rectangular vertical
        'aspect-[4/5]',    // Casi cuadrado
        'aspect-[5/6]',    // Ligeramente vertical
        'aspect-[3/2]'     // Paisaje
    ]

    if (index > 0) {
        const prevSize = sizes[index % sizes.length]
        const availableSizes = sizes.filter(size => size !== prevSize)
        return availableSizes[Math.floor(Math.random() * availableSizes.length)]
    }

    return sizes[index % sizes.length]
}

export function ArticleCard({ article, index }: ArticleCardProps) {
    return (
        <article
            className={`break-inside-avoid mb-4 group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${getRandomSize(index)}`}
        >
            <Link
                href={`/articles/${article.id}`}
                className="block h-full"
            >
                <div className="absolute inset-0">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                <div className="relative h-full p-5 flex flex-col justify-end z-10">
                    <Badge className="self-start mb-3 bg-white/90 hover:bg-white text-zinc-900 transition-colors">
                        {article.category}
                    </Badge>

                    <h3 className="text-xl font-medium mb-2 text-white group-hover:text-white/90 transition-colors line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-white/70 text-sm line-clamp-2 mb-3 group-hover:text-white/80 transition-colors">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-white/60 text-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                    {new Date(article.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </article>
    )
} 