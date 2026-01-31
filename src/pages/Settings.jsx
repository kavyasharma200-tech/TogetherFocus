import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Wand2, Bell, Shield, Ghost, ArrowLeft, Check, Moon, Zap, Sparkles, Heart, Coffee, LayoutGrid } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Settings = () => {
    const navigate = useNavigate();
    const { userProfile, updateUserProfile } = useAuthStore();
    const [selectedInstrument, setSelectedInstrument] = useState(userProfile?.wandType || 'silent');

    const instrumentTypes = [
        { id: 'silent', name: 'Bamboo Flute', power: 'Deep Stillness', icon: <Sparkles className="text-black" />, color: 'bg-neo-blue' },
        { id: 'potency', name: 'Singing Bowl', power: 'Resonant Flow', icon: <Zap className="text-black" />, color: 'bg-neo-purple' },
        { id: 'versatility', name: 'Crystal Chimes', power: 'Clear Awareness', icon: <Moon className="text-black" />, color: 'bg-neo-pink' }
    ];

    const handleInstrumentSelect = async (id, name) => {
        try {
            setSelectedInstrument(id);
            await updateUserProfile({ wandType: id });
            toast.success(`${name} is now your focus companion. ✨`);
        } catch (e) {
            toast.error("The instrument could not be tuned.");
        }
    };

    return (
        <div className="min-h-screen bg-white text-main font-quicksand relative pb-20 overflow-x-hidden">

            {/* Navigation Header */}
            <header className="fixed top-4 left-4 right-4 z-50 neo-card bg-white p-4 flex justify-between items-center">
                <button onClick={() => navigate('/')} className="neo-btn bg-white hover:bg-gray-100 p-3">
                    <ArrowLeft className="w-5 h-5 text-black" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="bg-neo-yellow border-2 border-black p-2 rounded-lg shadow-neo-sm">
                        <SettingsIcon className="w-5 h-5 text-black animate-spin-slow" />
                    </div>
                    <h1 className="text-sm font-black uppercase tracking-widest text-black">Sanctuary Settings</h1>
                </div>
                <div className="w-10" />
            </header>

            <main className="max-w-4xl mx-auto pt-32 px-6 space-y-12">
                {/* Instrument Section */}
                <section className="neo-card p-10 md:p-14 bg-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b-3 border-black border-dashed">
                            <div className="p-3 bg-neo-blue border-2 border-black rounded-xl shadow-neo-sm">
                                <Wand2 className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-2xl font-black font-outfit text-black tracking-tight">Instrument of Focus</h3>
                        </div>

                        <div className="grid gap-6">
                            {instrumentTypes.map(item => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleInstrumentSelect(item.id, item.name)}
                                    className={clsx(
                                        "flex items-center justify-between p-6 rounded-2xl border-2 border-black transition-all relative overflow-hidden text-left",
                                        selectedInstrument === item.id
                                            ? "bg-neo-yellow shadow-neo"
                                            : "bg-white hover:bg-gray-50"
                                    )}
                                >
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className={clsx("p-4 rounded-xl border-2 border-black", item.color)}>
                                            {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                            <div className="font-black text-lg text-black font-outfit">{item.name}</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{item.power}</div>
                                        </div>
                                    </div>
                                    {selectedInstrument === item.id && (
                                        <div className="relative z-10 bg-black p-2 rounded-full">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Notifications */}
                    <section className="neo-card p-10 bg-neo-pink space-y-8">
                        <div className="flex items-center gap-4">
                            <Bell className="w-6 h-6 text-black" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-black">Flow Reminders</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Spirit Pulses', desc: 'When souls message you' },
                                { label: 'Zen Bells', desc: 'Alerts for session phase changes' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white rounded-xl border-2 border-black shadow-sm transition-all hover:translate-x-1">
                                    <div>
                                        <div className="text-sm font-black text-black">{item.label}</div>
                                        <div className="text-xs font-bold text-gray-500">{item.desc}</div>
                                    </div>
                                    <div className="w-12 h-6 bg-neo-green rounded-full relative cursor-pointer border-2 border-black">
                                        <div className="absolute right-0.5 top-0.5 bottom-0.5 w-5 bg-white rounded-full border-2 border-black" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Privacy */}
                    <section className="neo-card p-10 bg-neo-blue space-y-8 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                            <Shield className="w-6 h-6 text-black" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-black">Soul Veil</h3>
                        </div>
                        <div className="p-8 bg-white rounded-xl border-2 border-black flex flex-col gap-6 hover:shadow-neo-sm transition-all">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-neo-purple border-2 border-black rounded-xl">
                                    <Ghost className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-black">Meditation Cloak</div>
                                    <p className="text-xs font-bold text-gray-500">Hide your presence.</p>
                                </div>
                            </div>
                            <p className="text-xs font-bold text-gray-600 leading-relaxed">When active, your soul essence will remain hidden in the Zen Garden until you decide to manifest.</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Settings;

