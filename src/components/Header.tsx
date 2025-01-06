"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Manejar la hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = ['Home', 'Videos', 'Articles'];

  // No renderizar el ícono del tema hasta que el componente esté montado
  const renderThemeIcon = () => {
    if (!mounted) {
      return null;
    }

    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="text-violet-600 dark:text-violet-400"
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <div className="h-20" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        {/* Fondo base mejorado */}
        <div className="absolute inset-0 bg-white/60 dark:bg-[#020817]/80 backdrop-blur-xl transition-colors duration-300" />

        {/* Gradiente superior */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-[#020817]/90 dark:via-[#020817]/50 dark:to-[#020817]/0 transition-colors duration-300" />

        {/* Línea superior con brillo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent dark:via-violet-500/20" />

        {/* Línea inferior */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gray-200/50 via-gray-200 to-gray-200/50 dark:from-white/[0.02] dark:via-white/[0.05] dark:to-white/[0.02]" />

        <div className="relative mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo y Menú móvil */}
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden relative group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 dark:bg-violet-400/10 dark:hover:bg-violet-400/20 border border-violet-500/20 hover:border-violet-500/30 dark:border-violet-400/20 dark:hover:border-violet-400/30 transition-all duration-300">
                  <Menu className="h-[18px] w-[18px] text-violet-600 dark:text-violet-400" />
                </div>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative px-4 py-2"
              >
                <Link href="/" className="relative z-10">
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-white dark:to-white/70 group-hover:from-violet-600 group-hover:via-fuchsia-600 group-hover:to-pink-600 dark:group-hover:from-violet-400 dark:group-hover:via-fuchsia-400 dark:group-hover:to-pink-400 transition-all duration-500">
                    Msp
                  </span>
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 group-hover:from-gray-900 group-hover:via-gray-800 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:via-white dark:group-hover:to-white/70 transition-all duration-500">
                    News
                  </span>
                </Link>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 blur-xl transition-all duration-500" />
              </motion.div>
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center rounded-full bg-white/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-[0_0_2rem_rgba(167,139,250,0.1)] p-1">
                {menuItems.map((item) => (
                  <Link
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="relative px-6 py-2 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-violet-600 dark:hover:text-white transition-colors duration-300 rounded-full hover:bg-violet-50/50 dark:hover:bg-white/5"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Búsqueda y Tema */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="hidden md:flex relative group"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/60 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 z-10" />
                  <Input
                    placeholder="Search content..."
                    className="w-[240px] lg:w-[280px] pl-11 h-11 rounded-xl bg-white/80 dark:bg-white/5 border-gray-200/50 dark:border-white/10 backdrop-blur-md text-gray-600 dark:text-white/70 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-violet-500/50 focus:bg-white/90 dark:focus:bg-white/10 hover:bg-white/90 dark:hover:bg-white/[0.07] shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/5 group-hover:to-pink-500/5 blur-xl transition-opacity duration-500" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 dark:bg-violet-400/10 dark:hover:bg-violet-400/20 border border-violet-500/20 hover:border-violet-500/30 dark:border-violet-400/20 dark:hover:border-violet-400/30 transition-all duration-300"
                >
                  {renderThemeIcon()}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Menú Móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute inset-x-4 sm:inset-x-6 top-full mt-4 rounded-3xl bg-white/80 dark:bg-[#020817]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_0_3rem_rgba(0,0,0,0.3)] overflow-hidden"
              >
                <nav className="relative">
                  <div className="p-6 grid gap-4">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={`mobile-${item}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                          className="group flex items-center gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-fuchsia-500/10 border border-transparent hover:border-violet-500/10 transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] text-sm font-medium text-violet-600/70 dark:text-violet-400/70 group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold text-gray-800 dark:text-white/90 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                              {item}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-white/50">
                              {item === 'Home' && 'Return to main page'}
                              {item === 'Videos' && 'Watch latest content'}
                              {item === 'Articles' && 'Read trending stories'}
                            </span>
                          </div>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 rounded-full bg-violet-500/10 flex items-center justify-center">
                              <span className="text-violet-600 dark:text-violet-400">→</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-black/5 dark:border-white/5">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/60 z-10" />
                      <Input
                        placeholder="Search content..."
                        className="w-full pl-11 h-12 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/10 text-gray-700 dark:text-white/70 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-violet-500/50 focus:bg-black/[0.03] dark:focus:bg-white/[0.03] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-300"
                      />
                    </div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};