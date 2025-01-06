import { HeroSection, LatestVideos, NewsSection } from '@/lib/client-components'

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <LatestVideos />
            <NewsSection />
        </main>
    )
} 