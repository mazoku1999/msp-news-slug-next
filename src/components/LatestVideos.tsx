"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Play, User } from "lucide-react"
import { useRef } from "react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { videos } from "@/data/videos"
import type { Video } from "@/types"

export const LatestVideos = () => {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">
                  Latest
                </span>
                <span className="ml-3 text-foreground/90">Videos</span>
              </h2>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
            </div>
            <p className="text-lg text-muted-foreground/80 max-w-2xl">
              Discover our curated collection of trending content
            </p>
          </div>
          <Button
            variant="outline"
            className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium transition-all duration-300
              border-none bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 hover:from-violet-500/20 hover:via-fuchsia-500/20 hover:to-pink-500/20"
          >
            <span className="relative z-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-semibold">
              Explore All
            </span>
            <span className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>

        <div className="relative" ref={carouselRef}>
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background via-background/50 md:via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background via-background/50 md:via-background/80 to-transparent z-10 pointer-events-none" />

          <Carousel
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps",
              skipSnaps: false
            }}
          >
            <CarouselContent className="-ml-1 md:-ml-4">
              {videos.map((video) => (
                <CarouselItem key={video.id} className="pl-1 md:pl-4 basis-[75%] xs:basis-[70%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pt-4 pb-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5"
                  >
                    <Link
                      href={`/videos/${video.category.toLowerCase()}/${video.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-[16/10]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.8]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-40 xs:opacity-60 group-hover:opacity-90 transition-all duration-300 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/0 to-pink-500/0 group-hover:from-violet-500/20 group-hover:via-fuchsia-500/20 group-hover:to-pink-500/20 transition-all duration-500 z-20" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                          <motion.div
                            initial={false}
                            animate={{
                              scale: [0.9, 1],
                              opacity: [0, 1]
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut"
                            }}
                            className="transform group-hover:translate-y-0 translate-y-4 transition-all duration-300"
                          >
                            <div className="relative w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center group/play">
                              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover/play:opacity-20 transition-opacity duration-300" />
                              <Play className="h-8 w-8 text-white transform group-hover/play:scale-110 transition-all duration-300" strokeWidth={2.5} />
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 xs:p-6 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-[5]">
                        <div className="space-y-3 xs:space-y-4">
                          <h3 className="text-base xs:text-xl font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors duration-300">
                            {video.title}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 xs:gap-3">
                              <div className="h-7 w-7 xs:h-9 xs:w-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shadow-[0_0_1rem_rgba(167,139,250,0.1)]">
                                <User className="h-3 w-3 xs:h-4 xs:w-4 text-violet-300" />
                              </div>
                              <div>
                                <p className="text-xs xs:text-sm font-medium text-white group-hover:text-violet-200 transition-colors duration-300">
                                  {video.author}
                                </p>
                                <p className="text-[10px] xs:text-xs text-violet-200/70">
                                  {new Date(video.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-8 top-1/2 h-16 w-16 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-white/20 hover:border-white/40" />
              <CarouselNext className="absolute right-8 top-1/2 h-16 w-16 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-white/20 hover:border-white/40" />
            </div>

            <div className="flex md:hidden justify-center gap-6 mt-6">
              <CarouselPrevious className="static h-14 w-14 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 hover:border-white/40" />
              <CarouselNext className="static h-14 w-14 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 hover:border-white/40" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}