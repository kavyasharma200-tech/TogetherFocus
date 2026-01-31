import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRoomStore from '../store/useRoomStore';
import useAuthStore from '../store/useAuthStore';
import usePlannerStore from '../store/usePlannerStore';
import Environment from '../components/room/Environment';
import { Play, Pause, RotateCcw, MessageCircle, Settings, LogOut, Copy, Check, ArrowRight, Sparkles, Calendar, Trash2, Wand2, BookOpen, Clock, LayoutGrid, Timer as TimerIcon, Plus, AlertTriangle, Send, User as UserIcon, Coffee, Sun, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import ZenFlare from '../components/ZenFlare';

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
    const [showChat, setShowChat] = useState(true);
    const [chatInput, setChatInput] = useState('');
    const [taskInput, setTaskInput] = useState('');
    const [customMinutes, setCustomMinutes] = useState(25);
    const [flareActive, setFlareActive] = useState(false);
    const [flareCount, setFlareCount] = useState(0);

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
            toast.error("Only the host can control the session.");
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
        toast.success(`Session set to ${Math.floor(minutes / 60)}h ${minutes % 60}m`);
    };

    const handleComplete = () => {
        if (isHost) toast.success("Session Complete! Great work! ✨");
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        sendMessage(roomId, user, chatInput);
        setChatInput('');
    };

    const triggerFlare = () => {
        setFlareCount(prev => prev + 1);
        if (flareCount + 1 >= 7) {
            setFlareActive(true);
            setFlareCount(0);
            toast.success("Zen Burst! ✨", {
                duration: 4000,
                style: {
                    borderRadius: '20px',
                    background: 'white',
                    color: '#333',
                    fontWeight: 'bold',
                    boxShadow: '5px 5px 0px 0px #000'
                }
            });
        }
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

    if (!currentRoom) return <div className="min-h-screen flex items-center justify-center font-black text-2xl animate-bounce">Loading Space...</div>;

    return (
        <div className="min-h-screen bg-white text-main font-quicksand relative">
            <ZenFlare active={flareActive} onComplete={() => setFlareActive(false)} />

            {/* Header */}
            <header className="fixed top-4 left-4 right-4 z-50 neo-card bg-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="neo-btn bg-neo-pink p-3">
                        <LayoutGrid className="w-5 h-5 text-black" />
                    </button>
                    <div className="h-8 w-[2px] bg-black mx-2 hidden md:block" />

                    {/* Members */}
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {Object.values(members).map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={clsx(
                                        "w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-xs relative",
                                        member.online ? "bg-neo-green text-black" : "bg-gray-300 text-gray-500"
                                    )}
                                >
                                    {member.name.charAt(0)}
                                    <div className={clsx(
                                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border border-black",
                                        member.online ? "bg-green-500" : "bg-red-500"
                                    )} />
                                </motion.div>
                            ))}
                        </div>
                        <span className="text-xs uppercase font-black tracking-widest hidden md:block">
                            {memberCount} active souls
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => { navigator.clipboard.writeText(currentRoom.roomCode); toast.success("Copied!"); }} className="hidden sm:flex bg-neo-blue px-4 py-2 rounded-xl text-xs font-black border-2 border-black shadow-neo-sm items-center gap-2 hover:translate-y-1 hover:shadow-none transition-all">
                        {currentRoom.roomCode}
                        <Copy className="w-3 h-3" />
                    </button>
                    <button
                        onClick={() => leaveRoom(roomId, user.uid).then(() => navigate('/'))}
                        className="neo-btn bg-red-400 p-3 hover:bg-red-500"
                    >
                        <LogOut className="w-5 h-5 text-black" />
                    </button>
                </div>
            </header>

            <main className="pt-28 px-4 md:px-12 pb-32">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Environment & Timer */}
                    <div className="lg:col-span-8 space-y-8 md:space-y-12">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative rounded-[3rem] overflow-hidden group neo-card bg-white h-[400px] md:h-[550px]">
                            {/* Environment Placeholder until refactored, assuming it handles its own visuals but layering Neo frame around it */}
                            <div className="absolute inset-0">
                                <Environment type={session?.environment || 'garden'} sessionState={session} />
                            </div>

                            <div className="absolute inset-0 pointer-events-none border-4 border-black rounded-[3rem] z-20" />

                            <div className="absolute inset-x-0 bottom-0 p-12 flex justify-center items-end h-full z-30">
                                <div onClick={triggerFlare} className="text-center cursor-pointer select-none">
                                    <motion.div
                                        animate={session?.isActive && !session?.isPaused ? {
                                            scale: [1, 1.02, 1],
                                        } : {}}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className={clsx(
                                            "font-black tracking-tighter leading-none select-none drop-shadow-xl text-white text-outline-black",
                                            session?.isActive && !session?.isPaused ? "text-[6rem] sm:text-[10rem] md:text-[13rem]" : "text-[5rem] sm:text-[8rem] md:text-[11rem] opacity-50"
                                        )}
                                        style={{ textShadow: '4px 4px 0px #000' }}
                                    >
                                        {formatTime(localTimeRemaining)}
                                    </motion.div>
                                    {session?.isActive && !session?.isPaused && (
                                        <div className="mt-4 flex justify-center gap-2">
                                            <div className="px-6 py-2 rounded-full bg-neo-green text-black border-2 border-black text-xs font-black uppercase tracking-widest shadow-neo-sm animate-pulse">Deep Flow Active</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex justify-center gap-6 md:gap-10 items-center">
                            <motion.button whileHover={{ rotate: -10, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleReset} className="neo-btn bg-white p-5">
                                <RotateCcw className="w-8 h-8" />
                            </motion.button>

                            {!session?.isActive || session.isPaused ? (
                                <motion.button whileHover={{ scale: 1.05 }} onClick={handleStart} className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neo-green border-3 border-black shadow-neo flex items-center justify-center transition-all hover:bg-green-400">
                                    <Play className="w-12 h-12 ml-2 text-black" fill="currentColor" />
                                </motion.button>
                            ) : (
                                <motion.button whileHover={{ scale: 1.05 }} onClick={handlePause} className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neo-yellow border-3 border-black shadow-neo flex items-center justify-center transition-all hover:bg-yellow-200">
                                    <Pause className="w-12 h-12 text-black" fill="currentColor" />
                                </motion.button>
                            )}

                            <motion.button whileHover={{ rotate: 10, scale: 1.1 }} onClick={() => sendPing(roomId, user.uid, user.displayName)} className="neo-btn bg-neo-purple p-5">
                                <Sparkles className="w-8 h-8 text-black" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Chat & Tasks */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col pt-4">
                        {/* Custom Timer Slider */}
                        <div className="neo-card p-6 bg-white space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Duration
                                </h3>
                                <span className="text-sm font-black bg-neo-blue px-3 py-1 rounded-lg border-2 border-black">{formatSliderLabel(customMinutes)}</span>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="720"
                                    value={customMinutes}
                                    onChange={(e) => setCustomMinutes(parseInt(e.target.value))}
                                    className="w-full h-4 bg-gray-200 rounded-full appearance-none border-2 border-black accent-black cursor-pointer"
                                />
                                <button
                                    onClick={() => handleSetDuration(customMinutes)}
                                    className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all border-2 border-transparent hover:border-black"
                                >
                                    Set Interval
                                </button>
                            </div>
                        </div>

                        {/* Live Chatbox */}
                        <div className="neo-card bg-white h-[450px] flex flex-col overflow-hidden p-0">
                            <div className="p-4 border-b-3 border-black bg-neo-yellow flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Coffee className="w-5 h-5 text-black" />
                                    <h3 className="text-sm font-black uppercase tracking-widest">Chat Stream</h3>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-green-500 border border-black animate-pulse" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map((msg, i) => (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={clsx("flex flex-col", msg.senderId === user.uid ? "items-end" : "items-start")}>
                                        <div className={clsx("max-w-[85%] p-3 rounded-xl text-sm border-2 border-black font-bold shadow-sm", msg.senderId === user.uid ? "bg-neo-blue rounded-tr-none" : "bg-white rounded-tl-none")}>
                                            <p className="text-[9px] uppercase tracking-wider opacity-60 mb-1">{msg.senderName}</p>
                                            <p>{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t-3 border-black flex gap-2">
                                <input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="neo-input flex-1 text-sm py-2"
                                />
                                <button type="submit" className="neo-btn bg-black text-white p-2">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Tasks */}
                        <div className="neo-card p-6 bg-neo-pink space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                Focus Tasks
                            </h3>
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (taskInput.trim()) addTask(roomId, user.uid, user.displayName, taskInput); setTaskInput(''); }}>
                                <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} className="neo-input flex-1 py-2 text-xs" placeholder="Add a task..." />
                                <button className="neo-btn bg-white p-2"><Plus className="w-5 h-5" /></button>
                            </form>
                            <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                                {tasks.map(task => (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border-2 border-black shadow-sm">
                                        <button onClick={() => toggleTask(roomId, task.id, !task.completed)} className={clsx("w-6 h-6 rounded border-2 border-black flex items-center justify-center transition-all", task.completed ? "bg-neo-green" : "bg-white")}>
                                            {task.completed && <Check className="w-4 h-4" />}
                                        </button>
                                        <span className={clsx("text-xs font-bold", task.completed ? "line-through opacity-50" : "text-black")}>{task.title}</span>
                                        <button onClick={() => deleteTask(roomId, task.id)} className="ml-auto text-red-400 hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
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
