import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, Wand2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const GEMINI_API_KEY = 'AIzaSyB8nwpiEhr3MIqmFh80iw5RsvurnjM1b3E';
// Using the simpler v1beta URL for broad compatibility
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are "The Oracle of Focus", an AI assistant for the "Together Focus" website. 
The website is a magical, wizard-themed productivity platform. 

Your tone: Wise, ancient, mystical, helpful. Refer to users as "Wizard" or "Apprentice". 
Stay in character. Keep responses concise but magical.

Key features you should know:
- Shared Timer (up to 12 hours)
- Shared Registry of Intent (Planner)
- Owl Post (Chat between partners)
- Enchanted Environments (Forbidden Forest, Astronomy Tower)
- Ministry Decree: If any one person leaves a room, the timer resets to 0.`;

const GeminiChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: 'Greetings, seeker of focus. I am the Oracle. How may I assist your magical practice today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userValue = input.trim();
        setInput('');

        // Update UI immediately
        const updatedMessages = [...messages, { role: 'user', content: userValue }];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            // Prepare history for API
            const history = updatedMessages.map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));

            const body = {
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: history,
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.8,
                }
            };

            const response = await fetch(GEMINI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Gemini API Error details:", data);
                throw new Error(data.error?.message || "Communication Rift");
            }

            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "The scrolls are indecipherable... try again.";
            setMessages(prev => [...prev, { role: 'model', content: aiText }]);
        } catch (error) {
            console.error("Oracle Error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "My connection to the ether is weak. Please re-cast your query." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[300]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="mb-6 w-80 md:w-96 h-[500px] enchanted-glass rounded-[3rem] flex flex-col overflow-hidden border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.3)]"
                    >
                        {/* Header */}
                        <div className="p-6 bg-emerald-500/10 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Bot className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">The Oracle</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-moonstone/40 hover:text-white" /></button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={clsx("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                                    <div className={clsx(
                                        "max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed",
                                        m.role === 'user'
                                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-100 rounded-tr-none"
                                            : "bg-white/5 border border-white/10 text-moonstone rounded-tl-none"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && <div className="text-[10px] text-emerald-500/50 uppercase tracking-widest animate-pulse ml-2">Consulting the scroll...</div>}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSend} className="p-6 bg-black/20 border-t border-white/5 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Whisper..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                            />
                            <button type="submit" disabled={isLoading} className="p-3 bg-emerald-500 rounded-xl text-void shadow-lg">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-void shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10 relative"
            >
                <Bot className="w-8 h-8" />
            </motion.button>
        </div>
    );
};

export default GeminiChatbot;
