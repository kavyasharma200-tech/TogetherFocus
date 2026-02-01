import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Library as LibraryIcon, Search, Sparkles, Wand2, ArrowLeft, Clock, Zap, Shield, Flame, Coffee, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';


const Library = () => {
    const navigate = useNavigate();

    const manifests = [
        {
            title: 'The Art of Deep Focus',
            category: 'Deep Work',
            duration: '15m',
            difficulty: 'Beginner',
            icon: <Zap className="text-black" />,
            desc: 'A comprehensive guide on eliminating distractions and entering the flow state with ease.',
            color: 'bg-neo-pink'
        },
        {
            title: 'Sanctuary Design',
            category: 'Environment',
            duration: '5m',
            difficulty: 'Intermediate',
            icon: <Coffee className="text-black" />,
            desc: 'How to curate your physical and digital workspace to minimize cognitive load and maximize peace.',
            color: 'bg-neo-blue'
        },
        {
            title: 'Collaborative Pulse',
            category: 'Teamwork',
            duration: '20m',
            difficulty: 'Advanced',
            icon: <Sparkles className="text-black" />,
            desc: 'Strategies for synchronized focus sessions that amplify individual productivity through collective energy.',
            color: 'bg-neo-green'
        },
        {
            title: 'Mastering Time Flows',
            category: 'Efficiency',
            duration: '45m',
            difficulty: 'Expert',
            icon: <Clock className="text-black" />,
            desc: 'Advanced techniques for managing long-term projects while maintaining peak mental performance.',
            color: 'bg-neo-purple'
        }
    ];

    return (
        <div className="min-h-screen p-6 md:p-12 relative bg-white font-quicksand overflow-hidden">

            <header className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20 relative z-10">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <button onClick={() => navigate(-1)} className="neo-btn bg-white mb-8 text-xs font-bold">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <h1 className="text-5xl md:text-7xl font-black font-outfit text-main flex items-center gap-6 leading-none tracking-tight">
                        <div className="bg-neo-yellow border-3 border-black p-4 rounded-2xl shadow-neo">
                            <LibraryIcon className="w-10 h-10 text-black" />
                        </div>
                        Zen Library
                    </h1>
                    <p className="text-muted mt-6 text-sm font-bold uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                        Knowledge for a Focused Mind
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-[500px] relative"
                >
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="neo-input w-full pl-14 text-lg font-bold"
                    />
                </motion.div>
            </header>

            <main className="max-w-6xl mx-auto space-y-24 relative z-10">
                <section className="grid md:grid-cols-2 gap-10">
                    {manifests.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="neo-card p-12 bg-white flex flex-col h-full group hover:bg-gray-50"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className={clsx("w-20 h-20 rounded-2xl flex items-center justify-center border-3 border-black shadow-neo-sm group-hover:scale-110 transition-transform duration-300", res.color)}>
                                    {React.cloneElement(res.icon, { className: "w-10 h-10" })}
                                </div>
                                <div className="text-right">
                                    <span className="text-xs bg-black text-white px-4 py-2 rounded-lg font-black uppercase tracking-widest border-2 border-transparent">{res.category}</span>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black font-outfit text-main mb-6">{res.title}</h3>
                            <p className="text-muted text-base leading-relaxed mb-10 flex-1 font-bold">{res.desc}</p>
                            <div className="flex justify-between items-center pt-8 border-t-3 border-black border-dashed font-black uppercase tracking-wider text-xs">
                                <span className="flex items-center gap-2 bg-neo-pink/30 px-3 py-1 rounded-md border-2 border-black"><Star className="w-4 h-4 text-black" /> {res.difficulty}</span>
                                <span className="flex items-center gap-2 bg-neo-blue/30 px-3 py-1 rounded-md border-2 border-black"><Clock className="w-4 h-4 text-black" /> {res.duration}</span>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Featured Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="neo-card p-12 md:p-24 bg-neo-yellow relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-2xl space-y-10">
                        <div className="bg-white text-black py-2.5 px-6 rounded-xl w-fit text-xs font-black uppercase tracking-[0.2em] border-3 border-black shadow-neo-sm">
                            Curiosity
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black font-outfit text-black leading-tight tracking-tight">Need something specific?</h2>
                        <p className="text-xl text-black font-quicksand font-bold italic">"The right information at the right time is the ultimate catalyst for focus. Tell us what you're looking for."</p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="neo-btn bg-neo-purple px-10 py-5 text-sm"
                        >
                            <Heart className="w-6 h-6 mr-3 text-black" fill="currentColor" />
                            Request Knowledge
                        </motion.button>
                    </div>
                </motion.section>
            </main>
            <div className="h-24" />
        </div>
    );
};

export default Library;


