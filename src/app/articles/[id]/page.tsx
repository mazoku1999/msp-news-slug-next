import { notFound } from "next/navigation"
import { getArticle } from "@/lib/data"
import { User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { ArticleActions } from "@/components/ArticleActions"

interface PageProps {
    params: Promise<{
        id: string
    }>
}


export default async function ArticlePage({ params }: PageProps) {
    const resolvedParams = await params
    const article = await getArticle(resolvedParams.id)

    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative min-h-[50vh] w-full overflow-hidden">
                {/* Imagen de fondo con efectos */}
                <div className="absolute inset-0">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Efectos de brillo con máscara de degradado */}
                    <div className="absolute inset-0">
                        <div className="absolute top-12 -right-12 w-96 aspect-square bg-violet-500/40 rounded-full blur-3xl animate-pulse opacity-70" />
                        <div className="absolute -bottom-12 -left-12 w-96 aspect-square bg-fuchsia-500/40 rounded-full blur-3xl animate-pulse delay-1000 opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background" />
                    </div>
                    <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-10" />
                </div>

                {/* Contenido del hero */}
                <div className="relative h-full max-w-[2000px] mx-auto px-4 py-6">
                    <div className="h-full flex flex-col max-w-4xl mx-auto">
                        {/* Navegación y categoría */}
                        <div className="flex items-center justify-between pt-4">
                            <Link href="/articles">
                                <Button
                                    variant="ghost"
                                    className="group gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
                                >
                                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                    Back to Articles
                                </Button>
                            </Link>
                        </div>

                        {/* Contenido central */}
                        <div className="mt-12 mb-8">
                            {/* Categoría */}
                            <div className="mb-4">
                                <Badge className="bg-violet-500/20 hover:bg-violet-500/30 text-white backdrop-blur-sm border-0">
                                    {article.category}
                                </Badge>
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>

                            {/* Autor y acciones */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-full pl-2 pr-4 py-1.5">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-[2px]">
                                        <div className="h-full w-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{article.author}</p>
                                        <p className="text-sm text-white/60">
                                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <ArticleActions />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <main className="w-full max-w-[2000px] mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            className="markdown-content"
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-3xl font-bold mb-6" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-2xl font-semibold mt-10 mb-4" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-xl font-medium mt-8 mb-4" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="text-base leading-relaxed text-muted-foreground mb-6" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="text-muted-foreground" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-muted-foreground" {...props} />
                                ),
                                a: ({ node, ...props }) => (
                                    <a className="text-violet-500 hover:text-violet-600 transition-colors" {...props} />
                                ),
                                img: ({ node, ...props }) => (
                                    <div className="my-8 rounded-lg overflow-hidden">
                                        <img {...props} className="w-full" />
                                    </div>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </div>

                    {/* Sección de Video */}
                    {article.video && (
                        <div className="mt-20 space-y-12">
                            {/* Separador decorativo */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0" />
                                </div>
                                <div className="relative flex justify-center">
                                    <div className="bg-violet-500/10 backdrop-blur-sm px-6 py-2 rounded-full border border-violet-500/20">
                                        <Badge className="bg-transparent text-violet-400 hover:bg-transparent border-0 font-medium">
                                            Featured Video
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Título del video */}
                            <div className="text-center space-y-4 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                                    {article.video.title}
                                </h2>
                                {article.video.description && (
                                    <p className="text-lg text-zinc-500 dark:text-zinc-400">
                                        {article.video.description}
                                    </p>
                                )}
                            </div>

                            {/* Contenedor del video */}
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/20">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${article.video.id}`}
                                        title={article.video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </main>
        </div>
    )
}