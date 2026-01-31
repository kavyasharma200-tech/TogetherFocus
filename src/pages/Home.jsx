import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useRoomStore from '../store/useRoomStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LogOut, Flame, Clock, Calendar, ArrowRight, Video, Zap, LayoutGrid, BookOpen, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Forest from '../components/Forest';
import MusicPlayer from '../components/MusicPlayer';
import GeminiChatbot from '../components/GeminiChatbot';

const Home = () => {
    const { user, userProfile, logout } = useAuthStore();
    const { createRoom, joinRoom, loading } = useRoomStore();
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');

    useEffect(() => {
        if (userProfile && !userProfile.onboardingCompleted) {
            navigate('/onboarding');
        }
    }, [userProfile, navigate]);

    const handleCreateRoom = async () => {
        try {
            const roomId = await createRoom(user);
            if (roomId) {
                navigate(`/room/${roomId}`);
                toast.success("Focus Session Initiated!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to start session.");
        }
    };

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        if (!joinCode.trim()) return;
        try {
            const success = await joinRoom(joinCode.toUpperCase(), user);
            if (success) {
                navigate(`/room/${joinCode.toUpperCase()}`);
                toast.success("Joined the room!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Room not found.");
        }
    };

    const openGoogleMeet = () => {
        window.open('https://meet.google.com/new', '_blank');
    };

    return (
        <div className="min-h-screen bg-transparent font-quicksand p-4 md:p-8 relative overflow-x-hidden">

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* --- Sidebar / Navigation --- */}
                <aside className="md:col-span-2 flex flex-col gap-4">
                    <div className="neo-card bg-neo-pink p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white border-3 border-black rounded-full mb-4 overflow-hidden relative">
                            <img
                                src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="font-extrabold text-xl leading-tight font-outfit">{user?.displayName?.split(' ')[0]}</h2>
                        <button onClick={() => navigate('/profile')} className="mt-2 text-xs font-bold bg-white px-3 py-1 rounded-full border-2 border-black inline-flex items-center gap-1 hover:bg-gray-100">
                            <Flame size={12} className="text-orange-500 fill-orange-500" />
                            Lvl {userProfile?.level || 1}
                        </button>
                    </div>

                    <nav className="flex flex-col gap-3">
                        <NavItem icon={<LayoutGrid />} label="Dashboard" active />
                        <NavItem icon={<BookOpen />} label="Library" onClick={() => navigate('/library')} />
                        <NavItem icon={<Users />} label="Community" />
                        <NavItem icon={<Settings />} label="Config" onClick={() => navigate('/settings')} />
                    </nav>

                    <button
                        onClick={logout}
                        className="mt-auto neo-btn bg-red-200 hover:bg-red-300 w-full justify-start"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </aside>

                {/* --- Main Content --- */}
                <main className="md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Header Banner */}
                    <div className="md:col-span-3 neo-card bg-neo-yellow p-8 flex justify-between items-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold font-outfit uppercase tracking-tight">
                                Ready to <span className="text-neo-purple underline decoration-4 underline-offset-4">Grow?</span>
                            </h1>
                            <p className="font-bold text-lg mt-2 opacity-80 font-quicksand">Your forest is waiting for new life.</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white border-3 border-black px-6 py-2 rounded-xl font-black text-xl shadow-neo-sm transform rotate-[-2deg]">
                                {userProfile?.currentStreak || 0} Day Streak 🔥
                            </div>
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-neo-pink rounded-full border-3 border-black opacity-50" />
                    </div>

                    {/* Central Forest (2 cols wide) */}
                    <div className="md:col-span-2 h-[500px]">
                        <Forest />
                    </div>

                    {/* Right Column Tools */}
                    <div className="md:col-span-1 flex flex-col gap-6 ">

                        {/* Focus Controls */}
                        <div className="neo-card p-6 bg-neo-blue flex flex-col gap-4">
                            <h3 className="font-black text-xl uppercase flex items-center gap-2 font-outfit">
                                <Zap className="fill-yellow-400 text-black" /> Focus Mode
                            </h3>

                            <button
                                onClick={handleCreateRoom}
                                disabled={loading}
                                className="neo-btn bg-white w-full py-4 text-lg hover:bg-neo-green font-outfit"
                            >
                                <Plus size={24} /> New Session
                            </button>

                            <div className="flex gap-2">
                                <input
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value)}
                                    placeholder="CODE"
                                    className="neo-input w-full uppercase text-center tracking-widest font-black"
                                />
                                <button onClick={handleJoinRoom} className="neo-btn bg-neo-purple px-4">
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>

                        {/* Google Meet & Spotify */}
                        <div className="grid grid-rows-2 font-bold gap-6 flex-1">
                            <div onClick={openGoogleMeet} className="neo-card bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 group">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-3 rounded-xl border-2 border-black group-hover:bg-red-200 transition-colors">
                                        <Video size={24} className="text-red-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm uppercase tracking-wider font-extrabold">Co-Work</div>
                                        <div className="text-lg">Google Meet</div>
                                    </div>
                                </div>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>

                            <div className="h-full min-h-[12rem]">
                                <MusicPlayer />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Row */}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatBox label="Total Focus" value={`${Math.floor((userProfile?.totalFocusMinutes || 0) / 60)}h ${Math.floor((userProfile?.totalFocusMinutes || 0) % 60)}m`} color="bg-neo-green" icon={<Clock />} />
                        <StatBox label="Sessions" value={userProfile?.totalSessions || 0} color="bg-neo-pink" icon={<Calendar />} />
                        <StatBox label="Trees Planted" value={userProfile?.forest?.length || 0} color="bg-neo-purple" icon={<Users />} />
                        <StatBox label="XP Gained" value={userProfile?.xp || 0} color="bg-neo-blue" icon={<Zap />} />

                    </div>

                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`neo-btn w-full justify-start ${active ? 'bg-neo-yellow translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#1a1a1a]' : 'hover:bg-gray-50'
            }`}
    >
        {React.cloneElement(icon, { size: 20 })} {label}
    </button>
);

const StatBox = ({ label, value, color, icon }) => (
    <div className={`neo-card p-6 flex items-center gap-4 ${color}`}>
        <div className="bg-white p-3 rounded-xl border-2 border-black shadow-neo-sm">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-xs font-bold opacity-70 uppercase tracking-wider">{label}</div>
            <div className="text-2xl font-black font-outfit">{value}</div>
        </div>
    </div>
);

export default Home;
