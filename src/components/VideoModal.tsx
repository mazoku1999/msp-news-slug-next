import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "./ui/modal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ThumbsUp, Share2, Bookmark, User } from "lucide-react";
import { getVideoData, type Video } from "@/data/videos";

export default function VideoModal() {
    const { category, slug } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        if (category && slug) {
            const videoData = getVideoData(slug);
            if (videoData && videoData.category.toLowerCase() === category.toLowerCase()) {
                setVideo(videoData);
            } else {
                navigate('/');
            }
        }
    }, [category, slug, navigate]);

    const handleClose = () => {
        navigate('/');
    };

    if (!video) return null;

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <div className="overflow-hidden rounded-3xl">
                <div className="relative">
                    <div className="relative aspect-video w-full bg-black">
                        <div className="absolute inset-0 bg-purple-500/10 animate-pulse pointer-events-none" />
                        <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="py-12 px-8 lg:py-14 lg:px-10 space-y-8 bg-background/95 backdrop-blur-sm max-h-[60vh] overflow-y-auto">
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                        >
                            {video.title}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center ring-2 ring-purple-500/20">
                                    <User className="h-7 w-7 text-purple-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{video.author}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(video.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" variant="outline" className="rounded-full border-purple-500/20 hover:bg-purple-500/10 gap-2">
                                        <Share2 className="h-5 w-5" />
                                        <span>Share</span>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="icon" variant="outline" className="rounded-full border-purple-500/20 hover:bg-purple-500/10">
                                        <Bookmark className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-purple-500/5 rounded-2xl p-6 border border-purple-500/10">
                            <h3 className="text-xl font-semibold mb-4">About this video</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {video.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Category</h4>
                            <div className="flex flex-wrap gap-2">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 cursor-pointer transition-colors"
                                >
                                    {video.category}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Modal>
    );
} 