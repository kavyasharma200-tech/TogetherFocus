import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Wand2, Bell, Shield, Ghost, ArrowLeft, Check, Moon, Zap, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Settings = () => {
    const navigate = useNavigate();
    const { userProfile, updateUserProfile } = useAuthStore();
    const [selectedWand, setSelectedWand] = useState(userProfile?.wandType || 'ash');

    const wandTypes = [
        { id: 'ash', name: 'Ash & Phoenix Feather', power: 'High Stability', icon: <Sparkles className="text-emerald-400" /> },
        { id: 'elder', name: 'Elder & Thestral Hair', power: 'Raw Potency', icon: <Zap className="text-yellow-400" /> },
        { id: 'vine', name: 'Vine & Dragon Heartstring', power: 'Versatility', icon: <Moon className="text-amethyst-400" /> }
    ];

    const handleWandSelect = async (id, name) => {
        try {
            setSelectedWand(id);
            await updateUserProfile({ wandType: id });
            toast.success(`${name} has bonded with you.`);
        } catch (e) {
            toast.error("The wand rejected the connection.");
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 relative bg-[#020617] text-moonstone">
            <header className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mb-12 md:mb-16">
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-moonstone hover:text-white transition-colors group self-start"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Return to Realm</span>
                </motion.button>
                <div className="flex items-center gap-3">
                    <SettingsIcon className="w-5 h-5 md:w-6 md:h-6 text-amethyst-400 animate-spin-slow" />
                    <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">Wizardry Options</h1>
                </div>
                <div className="hidden md:block w-10" />
            </header>

            <main className="max-w-4xl mx-auto space-y-12">
                <section className="enchanted-glass p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10" />
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <Wand2 className="w-6 h-6 text-emerald-400" />
                        <h3 className="text-xl font-bold text-white">Wand Configuration</h3>
                    </div>

                    <div className="grid gap-4">
                        {wandTypes.map(wand => (
                            <motion.button
                                key={wand.id}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleWandSelect(wand.id, wand.name)}
                                className={clsx(
                                    "flex items-center justify-between p-6 rounded-2xl border transition-all",
                                    selectedWand === wand.id
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        : "bg-white/5 border-white/10 text-moonstone hover:border-white/20"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                                        {wand.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-lg">{wand.name}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-moonstone/40">{wand.power}</div>
                                    </div>
                                </div>
                                {selectedWand === wand.id && <Check className="w-6 h-6 text-emerald-400 glow-emerald" />}
                            </motion.button>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="enchanted-glass p-8 rounded-[3rem] space-y-6">
                        <div className="flex items-center gap-4">
                            <Bell className="w-5 h-5 text-amethyst-400" />
                            <h3 className="font-bold text-white">Ethereal Notifications</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Owl Post Alerts', desc: 'When you receive a message' },
                                { label: 'Focus Reminders', desc: 'Ancient bells to keep you active' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-black/20 rounded-2xl border border-white/5 group hover:border-amethyst-500/30 transition-all">
                                    <div>
                                        <div className="text-sm font-medium text-white">{item.label}</div>
                                        <div className="text-[10px] text-moonstone/40">{item.desc}</div>
                                    </div>
                                    <div className="w-12 h-6 bg-emerald-500/20 rounded-full relative cursor-pointer group-hover:bg-emerald-500/30 transition-all">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="enchanted-glass p-8 rounded-[3rem] space-y-6 relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -z-10" />
                        <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-bold text-white">Privacy Seal</h3>
                        </div>
                        <div className="p-6 bg-black/20 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-indigo-500/30 transition-all">
                            <div className="p-3 bg-indigo-500/10 rounded-xl">
                                <Ghost className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Invisibility Cloak</div>
                                <p className="text-[10px] text-moonstone/40 leading-relaxed">Hide your online status from Ministry observers and focus in secret.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Settings;
