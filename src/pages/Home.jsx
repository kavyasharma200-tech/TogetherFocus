import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useRoomStore from '../store/useRoomStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LogOut, Flame, Clock, Calendar, ArrowRight, Heart, Sparkles, Book, Wand2, Shield, Ghost, User, Settings as SettingsIcon, Library as LibraryIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

const Home = () => {
    const { user, userProfile, logout } = useAuthStore();
    const { createRoom, joinRoom, loading } = useRoomStore();
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');

    const handleCreateRoom = async () => {
        try {
            const roomId = await createRoom(user);
            navigate(`/room/${roomId}`);
            toast.success("Focus portal opened!");
        } catch (error) {
            toast.error("Spell failed: " + error.message);
        }
    };

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        try {
            const roomId = await joinRoom(joinCode, user);
            navigate(`/room/${roomId}`);
            toast.success("Joined Common Room!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const sidebarItems = [
        { label: 'Common Room', icon: <Ghost className="w-5 h-5" />, path: '/' },
        { label: 'Ancient Library', icon: <LibraryIcon className="w-5 h-5" />, path: '/library' },
        { label: 'Magical Profile', icon: <User className="w-5 h-5" />, path: '/profile' },
        { label: 'Wizardry Settings', icon: <SettingsIcon className="w-5 h-5" />, path: '/settings' },
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#020617] text-moonstone font-poppins font-light pb-24 md:pb-0">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 enchanted-glass border-r border-white/5 z-50 flex-col p-6">
                <div className="flex items-center gap-3 mb-16 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-amethyst-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-white tracking-widest uppercase">Focus Magic</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(item.path)}
                            className={clsx(
                                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group cursor-none",
                                window.location.pathname === item.path ? "bg-white/5 text-emerald-400" : "hover:bg-white/5 text-moonstone/60 hover:text-white"
                            )}
                        >
                            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Leave Realm</span>
                </button>
            </aside>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 enchanted-glass border-t border-white/5 z-50 flex items-center justify-around px-4">
                {sidebarItems.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(item.path)}
                        className={clsx(
                            "flex flex-col items-center gap-1 transition-all",
                            window.location.pathname === item.path ? "text-emerald-400" : "text-moonstone/60"
                        )}
                    >
                        {item.icon}
                        <span className="text-[8px] uppercase tracking-tighter">{item.label.split(' ')[1]}</span>
                    </button>
                ))}
            </nav>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-12 overflow-x-hidden">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 max-w-6xl mx-auto">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Greetings, Wizard</h2>
                        <p className="text-[10px] text-moonstone/40 uppercase tracking-[0.4em] font-mono italic">Realm Status: Ethereal</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-2xl border border-white/5 w-full sm:w-auto">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                            <User className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white leading-none truncate">{userProfile?.displayName || 'User'}</p>
                            <p className="text-[9px] text-moonstone/40 uppercase tracking-widest mt-1">Level 14 Focus Master</p>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <div className="relative enchanted-glass p-8 md:p-20 rounded-[3rem] border-white/10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-emerald-500/10 rounded-full blur-[60px] md:blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-amethyst-500/10 rounded-full blur-[60px] md:blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

                        <div className="max-w-2xl space-y-6 md:space-y-8 relative z-10 text-center md:text-left">
                            <h2 className="text-4xl md:text-7xl font-bold text-mystic leading-tight">Manifest Your Deepest Focus</h2>
                            <p className="text-lg md:text-xl text-moonstone/60 leading-relaxed font-serif italic">
                                "The true magic isn't in the wand, but in the unwavering attention one gives to existence."
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={handleCreateRoom}
                                    disabled={loading}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-void font-bold py-4 md:py-5 px-8 md:px-10 rounded-[2rem] shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 cursor-none active:scale-95"
                                >
                                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                                    Open Common Room
                                </button>
                                <div className="flex-1 min-w-0">
                                    <form onSubmit={handleJoinRoom} className="relative h-full">
                                        <input
                                            type="text"
                                            placeholder="Enter Passphrase..."
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                            className="w-full h-full bg-white/5 border border-white/10 rounded-[2rem] py-4 md:py-5 pl-6 md:pl-8 pr-16 text-white placeholder-moonstone/40 focus:border-amethyst-500/50 outline-none transition-all cursor-none text-sm md:text-base"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-amethyst-500 hover:bg-amethyst-400 text-white rounded-2xl flex items-center justify-center transition-all cursor-none active:scale-90">
                                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <MagicCard
                            icon={<Clock className="w-8 h-8 text-emerald-400" />}
                            title="Total Practice"
                            value={`${userProfile?.totalFocusMinutes || 0}m`}
                            subtitle="Ancient Minutes"
                        />
                        <MagicCard
                            icon={<Flame className="w-8 h-8 text-orange-400" />}
                            title="Current Streak"
                            value={`${userProfile?.currentStreak || 0} Days`}
                            subtitle="Magical Continuity"
                        />
                        <MagicCard
                            icon={<Shield className="w-8 h-8 text-indigo-400" />}
                            title="Aura Tier"
                            value="Focused"
                            subtitle="Next: Enlightened"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

const MagicCard = ({ icon, title, value, subtitle }) => (
    <div className="enchanted-glass p-8 rounded-[3rem] border-white/5 hover:border-white/10 transition-all group group-hover:-translate-y-1">
        <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
        <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-moonstone/40">{title}</h4>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-[10px] text-emerald-500/60 uppercase tracking-widest mt-2">{subtitle}</p>
        </div>
    </div>
);

export default Home;
