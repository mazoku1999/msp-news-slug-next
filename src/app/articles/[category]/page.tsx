import { Metadata } from 'next';
import { ContentService } from '@/services/content-service';
import { News } from '@/types';
import ArticleCard from '@/components/ArticleCard';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

async function getCategoryArticles(category: string): Promise<News[]> {
    return ContentService.getArticlesByCategory(category);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Articles in ${resolvedParams.category}`,
        description: `Explore our articles about ${resolvedParams.category}`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;
    const articles = await getCategoryArticles(resolvedParams.category);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">
                Articles about {resolvedParams.category}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                ))}
            </div>
        </div>
    );
} 