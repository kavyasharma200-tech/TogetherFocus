import React from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Shield, Flame, Award, BookOpen, ArrowLeft, Star, Ghost, Sparkles, Zap, Moon, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { userProfile } = useAuthStore();
    const navigate = useNavigate();

    const stats = [
        { label: 'Ancient Knowledge', value: `${userProfile?.totalFocusMinutes || 0}m`, icon: <BookOpen className="text-emerald-400" />, detail: 'Total focus time' },
        { label: 'Ethereal Streak', value: `${userProfile?.currentStreak || 0} Days`, icon: <Flame className="text-orange-400" />, detail: 'Consecutive days' },
        { label: 'Aura Level', value: `Lvl ${Math.floor((userProfile?.totalFocusMinutes || 0) / 100) + 1}`, icon: <Star className="text-yellow-400" />, detail: 'Mastery of focus' },
        { label: 'House Bond', value: 'Tier II', icon: <Shield className="text-indigo-400" />, detail: 'Partner synergy' }
    ];

    const getWandIcon = (type) => {
        switch (type) {
            case 'ash': return <Sparkles className="text-emerald-400" />;
            case 'elder': return <Zap className="text-yellow-400" />;
            case 'vine': return <Moon className="text-amethyst-400" />;
            default: return <Sparkles className="text-emerald-400" />;
        }
    };

    const getWandName = (type) => {
        switch (type) {
            case 'ash': return 'Ash & Phoenix Feather';
            case 'elder': return 'Elder & Thestral Hair';
            case 'vine': return 'Vine & Dragon Heartstring';
            default: return 'Unbound Wand';
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 relative overflow-hidden bg-[#020617] text-moonstone">
            {/* Background Magic */}
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-amethyst-500/5 rounded-full blur-[120px] -z-10" />

            <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-moonstone hover:text-white transition-colors mb-12 group"
            >
                <div className="p-2 rounded-full border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest">Return to Common Room</span>
            </motion.button>

            <header className="max-w-4xl mx-auto mb-20 text-center relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="relative inline-block mb-8"
                >
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-amethyst-500/20 border-2 border-emerald-500/30 flex items-center justify-center animate-float relative">
                        <Ghost className="w-20 h-20 text-emerald-400 glow-emerald" />
                        {/* Orbiting particles could go here */}
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dotted border-amethyst-500/20 rounded-full"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-full border-4 border-[#020617] shadow-[0_0_20px_#10b98166]">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-6xl font-bold text-mystic mb-6"
                >
                    {userProfile?.displayName || 'Unknown Wizard'}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-3 bg-white/5 py-2 px-6 rounded-full border border-white/10 w-fit mx-auto shadow-inner"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Focus Grade: Magister</span>
                </motion.div>
            </header>

            <main className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 mb-20">
                {/* Stats Grid */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="enchanted-glass p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] parchment-glow border-white/5 hover:border-emerald-500/20 transition-all flex flex-row sm:flex-col items-center sm:items-start gap-5 sm:gap-0"
                        >
                            <div className="p-3 bg-black/40 rounded-2xl w-fit sm:mb-6 shadow-lg shrink-0">{stat.icon}</div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-white sm:mb-2">{stat.value}</div>
                                <div className="text-[9px] uppercase tracking-[0.2em] text-moonstone/40 font-bold">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Wand Profile */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-4 enchanted-glass p-10 rounded-[3rem] border-amethyst-500/20 flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amethyst-500/50 to-transparent" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-amethyst-400 mb-10">Bound Artifact</h3>
                    <div className="w-24 h-24 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-amethyst-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                        <Wand2 className="w-10 h-10 text-amethyst-400 relative z-10" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            {getWandIcon(userProfile?.wandType)}
                            <p className="text-lg font-bold text-white">{getWandName(userProfile?.wandType)}</p>
                        </div>
                        <p className="text-[10px] text-moonstone/40 italic">Mastered on {new Date(userProfile?.createdAt?.seconds * 1000).toLocaleDateString() || 'The Dawn of Time'}</p>
                    </div>
                </motion.div>
            </main>

            <section className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/5" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-moonstone/30">Registry of Achievements</h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/5" />
                </div>
                <div className="enchanted-glass rounded-[4rem] overflow-hidden border-white/5">
                    <div className="divide-y divide-white/5">
                        {[
                            { title: 'The Silent Warden', desc: 'Completed a 4 hour focus session', exp: '+150 EXP', date: '3 days ago' },
                            { title: 'Kindred Spirit', desc: 'Sent 50 encouragement charms', exp: '+80 EXP', date: 'Yesterday' },
                            { title: 'Registry Master', desc: 'Completed all planned intents', exp: '+45 EXP', date: '2 hours ago' }
                        ].map((item, i) => (
                            <div key={i} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                        <Award className="w-6 h-6 text-moonstone group-hover:text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-base font-bold text-white group-hover:text-mystic transition-all">{item.title}</div>
                                        <div className="text-xs text-moonstone/40 mt-1">{item.desc}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-emerald-400 font-mono font-bold">{item.exp}</div>
                                    <div className="text-[10px] text-moonstone/20 uppercase tracking-widest mt-1">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="h-20" /> {/* Bottom spacer */}
        </div>
    );
};

export default Profile;
