import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Library as LibraryIcon, Search, Sparkles, Wand2, ArrowLeft, Clock, Zap, Shield, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const Library = () => {
    const navigate = useNavigate();

    const manifests = [
        {
            title: 'Alchemy of Concentration',
            category: 'Deep Focus',
            duration: '15m',
            difficulty: 'Initiate',
            icon: <Flame className="text-orange-400" />,
            desc: 'Learn to transmute distractions into raw focused energy using ancient breathing seals.'
        },
        {
            title: 'The Silent Warden',
            category: 'Environment',
            duration: '5m',
            difficulty: 'Apprentice',
            icon: <Shield className="text-indigo-400" />,
            desc: 'How to ward off digital spirits and notifications that haunt your study santuary.'
        },
        {
            title: 'Ethereal Networking',
            category: 'Bonding',
            duration: '20m',
            difficulty: 'Wizard',
            icon: <Sparkles className="text-emerald-400" />,
            desc: 'The magic of collaborative focus. How shared intentions double the mana of productivity.'
        },
        {
            title: 'Chronos Manipulation',
            category: 'Theory',
            duration: '45m',
            difficulty: 'Archmage',
            icon: <Clock className="text-yellow-400" />,
            desc: 'Advanced Time Turner techniques for high-stakes magical examinations.'
        }
    ];

    return (
        <div className="min-h-screen p-6 md:p-12 relative bg-[#020617] text-moonstone overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-3/4 -right-20 w-80 h-80 bg-amethyst-500/5 rounded-full blur-[100px] -z-10" />

            <header className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 relative z-10">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-moonstone/40 hover:text-white transition-colors mb-6 group text-[10px] font-black uppercase tracking-[0.2em]">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Portal
                    </button>
                    <h1 className="text-4xl md:text-6xl font-bold text-mystic flex items-center gap-4 md:gap-6 leading-none">
                        <LibraryIcon className="w-10 h-10 md:w-12 md:h-12 text-emerald-400 shrink-0" />
                        Grand Library
                    </h1>
                    <p className="text-moonstone/30 mt-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] md:tracking-[0.5em]">The Vault of Concentration</p>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-[450px] relative"
                >
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-moonstone/20" />
                    <input
                        type="text"
                        placeholder="Search the forbidden archives..."
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-6 text-white placeholder-moonstone/20 focus:border-emerald-500/50 outline-none transition-all shadow-inner focus:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="bg-white/10 text-[8px] font-bold px-2 py-1 rounded-md text-moonstone/40 uppercase">⌘ K</span>
                    </div>
                </motion.div>
            </header>

            <main className="max-w-6xl mx-auto space-y-20 relative z-10">
                <section className="grid md:grid-cols-2 gap-8">
                    {manifests.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="enchanted-glass p-10 rounded-[3.5rem] border-white/5 parchment-glow group cursor-pointer hover:border-emerald-500/20 active:scale-[0.98] transition-all flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-16 h-16 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all shadow-xl">
                                    {res.icon}
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] bg-white/10 px-4 py-1.5 rounded-full text-moonstone/60 uppercase font-black tracking-widest">{res.category}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-mystic transition-colors">{res.title}</h3>
                            <p className="text-moonstone/60 text-sm leading-relaxed mb-8 flex-1">{res.desc}</p>
                            <div className="flex justify-between items-center pt-6 border-t border-white/5 text-[10px] font-bold text-moonstone/30 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-emerald-400" /> {res.difficulty}</span>
                                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {res.duration}</span>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Featured Grimoire */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="enchanted-glass p-12 md:p-20 rounded-[4rem] relative overflow-hidden border-amethyst-500/20 shadow-2xl"
                >
                    <div className="relative z-10 max-w-2xl space-y-8">
                        <div className="bg-amethyst-500/20 text-amethyst-400 py-2 px-6 rounded-full w-fit text-[10px] font-black uppercase tracking-[0.3em] border border-amethyst-500/30">
                            Scroll of Request
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Can't find a specific Knowledge Manifest?</h2>
                        <p className="text-xl text-moonstone/60 leading-relaxed font-serif italic">"Ask and it shall be revealed, for the library is infinite to those who know how to look."</p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-amethyst-600 to-indigo-600 text-white font-bold px-10 py-6 rounded-[2.5rem] transition-all flex items-center gap-3 shadow-xl uppercase tracking-widest text-[10px]"
                        >
                            <Wand2 className="w-5 h-5" />
                            Summon the Librarian
                        </motion.button>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-amethyst-500/10 to-transparent -z-0" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 w-80 h-80 border-4 border-dashed border-amethyst-500/10 rounded-full"
                    />
                </motion.section>
            </main>
            <div className="h-20" />
        </div>
    );
};

export default Library;
