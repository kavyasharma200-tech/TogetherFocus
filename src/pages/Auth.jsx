import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, Github, Chrome, Zap, Shield, Wand2, Coffee, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import ZenFlare from '../components/ZenFlare';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { login, register, loginWithGoogle, user, loading } = useAuthStore();
    const navigate = useNavigate();
    const [flareActive, setFlareActive] = useState(false);
    const [flareCount, setFlareCount] = useState(0);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) await login(email, password);
            else await register(email, password, displayName);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const triggerFlare = () => {
        setFlareCount(prev => prev + 1);
        if (flareCount + 1 >= 7) {
            setFlareActive(true);
            setFlareCount(0);
            toast.success("Welcome to Together Focus! ✨", {
                duration: 4000,
                style: {
                    borderRadius: '12px',
                    background: 'white',
                    color: '#000',
                    fontWeight: 'bold',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px 0px #000'
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neo-purple font-quicksand">
            {/* Background Decorations */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-neo-yellow border-3 border-black rounded-full -rotate-12" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-neo-green border-3 border-black rounded-2xl rotate-12" />

            <ZenFlare active={flareActive} onComplete={() => setFlareActive(false)} />

            <div className="relative z-10 w-full max-w-lg p-6">
                <div className="text-center mb-8">
                    <div onClick={triggerFlare} className="inline-flex items-center justify-center p-6 bg-white border-3 border-black rounded-3xl mb-6 shadow-neo cursor-pointer active:scale-95 transition-transform">
                        <Sparkles className="w-10 h-10 text-black" />
                    </div>
                    <h1 className="text-5xl font-black text-black mb-2 font-outfit uppercase tracking-tighter">TogetherFocus</h1>
                    <p className="text-black font-bold uppercase tracking-widest text-[10px] bg-white border-2 border-black px-4 py-1 inline-block">Deep Work Sanctuary</p>
                </div>

                <div className="neo-card p-8 md:p-12 bg-white">
                    <div className="flex mb-8 gap-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={clsx(
                                "flex-1 py-3 border-2 border-black font-black uppercase tracking-widest text-xs transition-all shadow-neo-sm",
                                isLogin ? "bg-neo-blue translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:bg-gray-50"
                            )}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={clsx(
                                "flex-1 py-3 border-2 border-black font-black uppercase tracking-widest text-xs transition-all shadow-neo-sm",
                                !isLogin ? "bg-neo-pink translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white hover:bg-gray-50"
                            )}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Soul Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                                    <input
                                        type="text"
                                        placeholder="Druid Name?"
                                        className="neo-input w-full pl-12"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="neo-input w-full pl-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Security Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="neo-input w-full pl-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={clsx(
                                "w-full py-4 border-3 border-black font-black uppercase tracking-[0.2em] text-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-neo",
                                isLogin ? "bg-neo-blue" : "bg-neo-pink"
                            )}
                        >
                            {loading ? "INITIALIZING..." : isLogin ? "ENTER SANCTUARY" : "START JOURNEY"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-10">
                        <div className="relative mb-8 text-center">
                            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black"></div>
                            <span className="relative bg-white border-2 border-black px-4 text-[10px] font-black uppercase tracking-widest text-black">OR</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => loginWithGoogle()}
                            className="w-full py-3 bg-white border-2 border-black text-[10px] font-black uppercase tracking-widest text-black flex items-center justify-center gap-4 shadow-neo-sm hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            Universal Portal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
