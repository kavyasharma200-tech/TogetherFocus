import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import GeminiChatbot from '../GeminiChatbot';
import CustomCursor from '../CustomCursor';
import { Music, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const [showMusic, setShowMusic] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] text-moonstone font-poppins selection:bg-emerald-500/20 overflow-x-hidden relative">
            {/* Global Magical Vignette */}
            <div className="fixed inset-0 pointer-events-none z-[100] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

            <div className="relative z-0">
                {children}
            </div>

            {/* Floating Elements */}
            <CustomCursor />
            <GeminiChatbot />

            {/* Music Player (Spotify) */}
            <div className={clsx(
                "fixed bottom-10 right-10 z-[180] transition-all duration-700 flex flex-col items-end gap-4",
                showMusic ? "w-[350px] md:w-[400px]" : "w-16"
            )}>
                <AnimatePresence>
                    {showMusic && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full enchanted-glass rounded-[2.5rem] p-5 border border-amethyst-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden backdrop-blur-2xl"
                        >
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amethyst-400">Ethereal Radio</span>
                                <div className="flex gap-1.5">
                                    <div className="w-1 h-1 bg-amethyst-500 rounded-full animate-pulse" />
                                    <div className="w-1 h-1 bg-amethyst-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-amethyst-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                                </div>
                            </div>
                            <iframe
                                style={{ borderRadius: '20px' }}
                                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb990u30x?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMusic(!showMusic)}
                    className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amethyst-600 to-indigo-800 rounded-[2rem] flex items-center justify-center text-white shadow-[0_0_40px_rgba(168,85,247,0.3)] group relative"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all rounded-[2rem]" />
                    <Music className={clsx("w-8 h-8 z-10", showMusic ? "animate-pulse" : "group-hover:rotate-12")} />
                    <div className="absolute inset-0 bg-amethyst-500/10 rounded-[2rem] animate-aura" />
                </motion.button>
            </div>

            <Toaster
                position="top-center"
                toastOptions={{
                    className: 'enchanted-glass border-white/10 text-white font-mono text-xs uppercase tracking-widest',
                    style: {
                        background: '#0f172a',
                        color: '#94a3b8',
                        border: '1px solid rgba(148, 163, 184, 0.1)',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#020617',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#020617',
                        },
                    }
                }}
            />
        </div>
    );
};

export default Layout;
