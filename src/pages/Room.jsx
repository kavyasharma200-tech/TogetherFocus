import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRoomStore from '../store/useRoomStore';
import useAuthStore from '../store/useAuthStore';
import usePlannerStore from '../store/usePlannerStore';
import Environment from '../components/room/Environment';
import { Play, Pause, RotateCcw, MessageCircle, Settings, LogOut, Copy, Check, ArrowRight, Sparkles, Calendar, Trash2, Wand2, BookOpen, Clock, LayoutGrid, Timer as TimerIcon, Plus, AlertTriangle, Send, User as UserIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Room = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { currentRoom, messages, subscribeToRoom, unsubscribeFromRoom, updateSessionState, leaveRoom, sendPing, sendMessage } = useRoomStore();
    const { subscribeToPlanner, tasks, addTask, toggleTask, deleteTask } = usePlannerStore();

    const isHost = currentRoom?.hostId === user?.uid;
    const session = currentRoom?.currentSession;
    const members = currentRoom?.members || {};
    const memberCount = Object.keys(members).length;

    const [localTimeRemaining, setLocalTimeRemaining] = useState(25 * 60);
    const [showSettings, setShowSettings] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [taskInput, setTaskInput] = useState('');
    const [customMinutes, setCustomMinutes] = useState(25);
    const [showChat, setShowChat] = useState(true);

    const chatEndRef = useRef(null);

    // Initial Join / Subscribe
    useEffect(() => {
        if (!user) return;
        subscribeToRoom(roomId);
        subscribeToPlanner(roomId);
        return () => unsubscribeFromRoom(roomId);
    }, [roomId, user]);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Timer Logic
    useEffect(() => {
        if (!session) return;
        let interval;
        if (session.isActive && !session.isPaused && session.startTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const elapsedSinceStart = Math.floor((now - session.startTime) / 1000);
                const remaining = Math.max(0, session.timeRemaining - elapsedSinceStart);

                setLocalTimeRemaining(remaining);
                if (remaining <= 0) {
                    clearInterval(interval);
                    handleComplete();
                }
            }, 1000);
        } else {
            setLocalTimeRemaining(session.timeRemaining);
        }
        return () => clearInterval(interval);
    }, [session?.isActive, session?.isPaused, session?.startTime, session?.timeRemaining]);

    const handleStart = () => {
        if (!isHost && !currentRoom.settings?.allowPartnerControl) {
            toast.error("Under Ministry decree, only the Host may cast the timer.");
            return;
        }
        updateSessionState(roomId, {
            isActive: true,
            isPaused: false,
            startTime: Date.now(),
            timeRemaining: localTimeRemaining
        });
    };

    const handlePause = () => {
        if (!isHost && !currentRoom.settings?.allowPartnerControl) return;
        updateSessionState(roomId, {
            isActive: true,
            isPaused: true,
            startTime: null,
            timeRemaining: localTimeRemaining
        });
    };

    const handleReset = () => {
        if (!isHost && !currentRoom.settings?.allowPartnerControl) return;
        const duration = currentRoom.settings?.defaultDuration || 25 * 60;
        updateSessionState(roomId, {
            isActive: false,
            isPaused: false,
            timeRemaining: duration,
            startTime: null
        });
        setLocalTimeRemaining(duration);
    };

    const handleSetDuration = (minutes) => {
        if (!isHost && !currentRoom.settings?.allowPartnerControl) return;
        const seconds = parseInt(minutes) * 60;
        updateSessionState(roomId, {
            timeRemaining: seconds,
            isActive: false,
            isPaused: false,
            startTime: null
        });
        setLocalTimeRemaining(seconds);
        toast.success(`Time Turner set to ${Math.floor(minutes / 60)}h ${minutes % 60}m`);
    };

    const handleComplete = () => {
        if (isHost) toast.success("Focus Session Complete! ✨");
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        sendMessage(roomId, user, chatInput);
        setChatInput('');
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatSliderLabel = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    if (!currentRoom) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-emerald-400 font-mono italic tracking-[0.5em] animate-pulse">Summoning Realm...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-moonstone selection:bg-emerald-500/20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 enchanted-glass border-b border-white/5 p-4 flex justify-between items-center backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-xl transition-all cursor-none">
                        <LayoutGrid className="w-5 h-5 text-emerald-400" />
                    </button>
                    <div className="h-6 w-[1px] bg-white/10" />

                    {/* Assembly Members (up to 4) */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3 mr-4">
                            {Object.values(members).map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={clsx(
                                        "w-10 h-10 rounded-full border-2 border-void flex items-center justify-center text-void font-bold text-xs shadow-lg relative",
                                        member.online ? "bg-emerald-500" : "bg-slate-700 text-moonstone/40"
                                    )}
                                    title={`${member.name} (${member.online ? 'Online' : 'Offline'})`}
                                >
                                    {member.name.charAt(0)}
                                    <div className={clsx(
                                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-void",
                                        member.online ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
                                    )} />
                                </motion.div>
                            ))}
                            {[...Array(4 - memberCount)].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center text-moonstone/10 font-bold text-xs" />
                            ))}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-moonstone/30">
                            {memberCount}/4 Wizards Present
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => { navigator.clipboard.writeText(currentRoom.roomCode); toast.success("Code copied!"); }} className="hidden sm:flex bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono font-bold hover:border-emerald-500/30 transition-all items-center gap-2 cursor-none">
                        {currentRoom.roomCode}
                        <Copy className="w-3 h-3 text-moonstone/40" />
                    </button>
                    <button
                        onClick={() => leaveRoom(roomId, user.uid).then(() => navigate('/'))}
                        className="p-2 hover:bg-red-500/10 rounded-xl transition-all text-red-400/40 hover:text-red-400 cursor-none"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="pt-24 px-4 md:px-12 pb-32">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Environment & Timer */}
                    <div className="lg:col-span-8 space-y-8 md:space-y-12">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 h-[350px] md:h-[500px]">
                            <Environment type={session?.environment || 'garden'} sessionState={session} />
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent flex justify-center items-end h-full">
                                <div className="text-center group-hover:scale-105 transition-transform duration-1000">
                                    <motion.div
                                        animate={session?.isActive && !session?.isPaused ? {
                                            filter: ["drop-shadow(0 0 0px #10b981)", "drop-shadow(0 0 30px #10b981)", "drop-shadow(0 0 0px #10b981)"]
                                        } : {}}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className={clsx(
                                            "font-bold tracking-tighter transition-all leading-none selection:bg-none",
                                            session?.isActive && !session?.isPaused ? "text-mystic text-[5rem] sm:text-[8rem] md:text-[12rem]" : "text-moonstone/10 text-[4rem] sm:text-[6rem] md:text-[10rem]"
                                        )}
                                    >
                                        {formatTime(localTimeRemaining)}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex justify-center gap-6 md:gap-12 items-center">
                            <motion.button whileHover={{ rotate: 180, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleReset} className="p-4 md:p-5 rounded-full bg-white/5 border border-white/10 text-moonstone/40 hover:text-white transition-all cursor-none">
                                <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
                            </motion.button>
                            {!session?.isActive || session.isPaused ? (
                                <motion.button whileHover={{ scale: 1.1 }} onClick={handleStart} className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-emerald-500 text-void flex items-center justify-center shadow-2xl transition-all cursor-none">
                                    <Play className="w-10 h-10 md:w-12 md:h-12 ml-1 md:ml-2" fill="currentColor" />
                                </motion.button>
                            ) : (
                                <motion.button whileHover={{ scale: 1.1 }} onClick={handlePause} className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all cursor-none">
                                    <Pause className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" />
                                </motion.button>
                            )}
                            <motion.button whileHover={{ scale: 1.2, color: "#a855f7" }} onClick={() => sendPing(roomId, user.uid, user.displayName)} className="p-4 md:p-5 rounded-full bg-white/5 border border-white/10 text-moonstone/40 transition-all cursor-none">
                                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Chat & Assembly */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col">
                        {/* Custom Timer Slider */}
                        <div className="enchanted-glass p-8 rounded-[3rem] space-y-8 overflow-hidden relative border-white/5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-3">
                                    <TimerIcon className="w-5 h-5" />
                                    Ancient Time Turner
                                </h3>
                                <span className="text-xl font-mono text-white bg-black/40 px-4 py-1 rounded-xl">{formatSliderLabel(customMinutes)}</span>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="720"
                                    value={customMinutes}
                                    onChange={(e) => setCustomMinutes(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-none accent-emerald-500"
                                />
                                <div className="flex justify-between text-[10px] text-moonstone/20 font-bold uppercase tracking-widest">
                                    <span>1m</span>
                                    <span>6h</span>
                                    <span>12h</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleSetDuration(customMinutes)}
                                className="w-full py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-void transition-all cursor-none"
                            >
                                Inscribe Duration
                            </button>
                        </div>

                        {/* Live Chatbox */}
                        <div className="enchanted-glass rounded-[3rem] h-[400px] flex flex-col overflow-hidden relative border-white/5">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">Live Owl Post</h3>
                                </div>
                                <span className="text-[10px] text-moonstone/40 font-mono italic">Realm Channel active</span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                                {messages.map((msg, i) => (
                                    <div key={i} className={clsx("flex flex-col", msg.senderId === user.uid ? "items-end" : "items-start")}>
                                        <div className={clsx("max-w-[80%] p-4 rounded-2xl text-xs", msg.senderId === user.uid ? "bg-emerald-500 text-void font-medium rounded-tr-none" : "bg-white/5 text-moonstone rounded-tl-none border border-white/5")}>
                                            <p className="text-[8px] uppercase tracking-widest opacity-40 mb-1 font-bold">{msg.senderName}</p>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-6 bg-white/2 border-t border-white/5 flex gap-3">
                                <input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Inscribe a message..."
                                    className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-xs text-white outline-none focus:border-emerald-500/50 transition-all cursor-none"
                                />
                                <button type="submit" className="p-3 bg-emerald-500 rounded-xl text-void hover:bg-emerald-400 transition-all cursor-none flex items-center justify-center">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Registry of Intent (Minimized/Moved) */}
                        <div className="enchanted-glass p-8 rounded-[3rem] space-y-4 border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-amethyst-400 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Guild Tasks
                            </h3>
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (taskInput.trim()) addTask(roomId, user.uid, user.displayName, taskInput); setTaskInput(''); }}>
                                <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white outline-none cursor-none" placeholder="Task..." />
                                <button className="p-2 bg-amethyst-500 rounded-xl text-white cursor-none"><Plus className="w-4 h-4" /></button>
                            </form>
                            <div className="max-h-[150px] overflow-y-auto space-y-2">
                                {tasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
                                        <button onClick={() => toggleTask(roomId, task.id, !task.completed)} className={clsx("w-4 h-4 rounded-full border flex items-center justify-center cursor-none", task.completed ? "bg-emerald-500 border-emerald-500" : "border-white/20")}>
                                            {task.completed && <Check className="w-3 h-3 text-void" />}
                                        </button>
                                        <span className={clsx("text-[10px]", task.completed && "line-through opacity-30")}>{task.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Room;
