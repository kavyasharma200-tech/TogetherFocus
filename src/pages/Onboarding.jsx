import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sprout, Target } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Onboarding = () => {
    const { user, userProfile, updateUserProfile } = useAuthStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [selectedAvatar, setSelectedAvatar] = useState(user?.photoURL);
    const [focusGoal, setFocusGoal] = useState(25);

    const avatars = [
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`,
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}123`,
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}456`,
        `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.uid}`
    ];

    const completeOnboarding = async () => {
        try {
            await updateUserProfile({
                photoURL: selectedAvatar,
                focusGoal,
                onboardingCompleted: true,
                seeds: (userProfile?.seeds || 0) + 1 // Bonus seed
            });
            toast.success("Welcome to your Journey!");
            navigate('/');
        } catch (error) {
            toast.error("Failed to save progress");
        }
    };

    const steps = [
        {
            title: "Choose Your Persona",
            content: (
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {avatars.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedAvatar(img)}
                            className={`p-2 rounded-2xl border-3 cursor-pointer transition-all ${selectedAvatar === img ? 'border-neo-green bg-neo-green/20 scale-105' : 'border-transparent hover:bg-gray-100'
                                }`}
                        >
                            <img src={img} className="w-24 h-24 rounded-xl border-2 border-black" alt="avatar" />
                        </div>
                    ))}
                </div>
            )
        },
        {
            title: "Set Your Focus Goal",
            content: (
                <div className="mt-8 flex flex-col items-center">
                    <div className="w-full neo-card p-6 bg-neo-blue mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">Daily Focus Target</span>
                            <span className="font-black text-2xl">{focusGoal}m</span>
                        </div>
                        <input
                            type="range"
                            min="15"
                            max="120"
                            step="5"
                            value={focusGoal}
                            onChange={(e) => setFocusGoal(e.target.value)}
                            className="w-full h-4 bg-white rounded-full appearance-none border-2 border-black accent-black cursor-pointer"
                        />
                    </div>
                    <p className="text-center font-bold text-muted">Start small. Construct consistency.</p>
                </div>
            )
        },
        {
            title: "A Gift For You",
            content: (
                <div className="mt-8 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-32 h-32 bg-neo-green rounded-full border-3 border-black flex items-center justify-center mb-6 shadow-neo"
                    >
                        <Sprout size={64} className="text-black" />
                    </motion.div>
                    <h3 className="font-black text-xl mb-2">1x Rare Seed</h3>
                    <p className="font-medium text-muted">Plant this in your forest to begin your legacy.</p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-neo-pink flex items-center justify-center p-6 font-quicksand">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full neo-card bg-white p-8 relative overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-2 bg-neo-purple transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />

                <h1 className="text-3xl font-black font-outfit text-center mb-2 mt-4">{steps[step].title}</h1>

                <div className="min-h-[300px] flex flex-col">
                    {steps[step].content}
                </div>

                <div className="flex justify-between mt-auto pt-6 border-t-3 border-black border-dashed">
                    <button
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className={`font-bold uppercase tracking-widest text-xs px-4 py-2 ${step === 0 ? 'opacity-0' : 'opacity-100'}`}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            if (step === steps.length - 1) completeOnboarding();
                            else setStep(step + 1);
                        }}
                        className="neo-btn bg-neo-yellow px-6"
                    >
                        {step === steps.length - 1 ? 'Start Journey' : 'Next'} <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Onboarding;
