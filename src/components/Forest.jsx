import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import { TreeDeciduous, Sprout, CloudRain, Sun, Wind } from 'lucide-react';

import { toast } from 'react-hot-toast';

const Forest = () => {
    const { userProfile, updateUserProfile } = useAuthStore();
    const [selectedTree, setSelectedTree] = useState(null);

    const plantTree = async () => {
        if ((userProfile?.seeds || 0) < 1) {
            toast.error("Not enough seeds! Complete sessions to earn more.");
            return;
        }

        try {
            const newTree = {
                id: Date.now(),
                plantedAt: Date.now(),
                stage: 'sapling',
                type: ['oak', 'pine', 'willow'][Math.floor(Math.random() * 3)],
                position: Math.random() * 90 // Random left position %
            };

            const updatedForest = [...(userProfile?.forest || []), newTree];

            await updateUserProfile({
                seeds: (userProfile.seeds || 0) - 1,
                forest: updatedForest
            });

            toast.success("A new life begins! 🌱");
        } catch (error) {
            toast.error("Failed to plant tree.");
        }
    };

    return (
        <div className="neo-card p-8 h-[500px] relative overflow-hidden bg-gradient-to-b from-neo-blue to-pastel-green">
            {/* Sky Elements */}
            <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 left-10 text-white/40"
            >
                <CloudRain size={48} />
            </motion.div>

            <div className="absolute top-6 right-6">
                <div className="bg-neo-yellow w-16 h-16 rounded-full border-3 border-black shadow-neo animate-spin-slow flex items-center justify-center">
                    <Sun size={32} className="text-black" />
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-6 left-6 z-10 flex gap-4">
                <div className="neo-card px-4 py-2 bg-white flex items-center gap-2">
                    <Sprout className="text-neo-green font-bold" />
                    <span className="font-bold text-lg">{userProfile?.seeds || 0} Seeds</span>
                </div>
            </div>

            {/* Tree Container */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#4ade80] border-t-3 border-black transform skew-y-1 origin-bottom-left" />

            <div className="absolute bottom-10 left-4 right-4 h-64 flex items-end justify-around px-8 pointer-events-none">
                <AnimatePresence>
                    {(userProfile?.forest || []).map((tree, i) => (
                        <motion.div
                            key={tree.id}
                            initial={{ scale: 0, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", bounce: 0.5, delay: i * 0.1 }}
                            className="relative group cursor-pointer pointer-events-auto"
                            style={{
                                left: `${(i % 5) * 10}px`, // Simple staggering to avoid overlap
                                zIndex: i
                            }}
                            onClick={() => setSelectedTree(tree)}
                        >
                            <TreeDeciduous
                                size={tree.stage === 'sapling' ? 48 : 96}
                                className={`text-black drop-shadow-lg transition-transform hover:scale-110 ${tree.type === 'oak' ? 'fill-neo-green' :
                                    tree.type === 'pine' ? 'fill-[#15803d]' : 'fill-[#fca5a5]'
                                    }`}
                                strokeWidth={2.5}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <button
                    onClick={plantTree}
                    className="neo-btn bg-neo-pink text-black hover:bg-pastel-pink text-xl px-8 py-3"
                >
                    <Sprout className="mr-2" /> Plant Seed (-1)
                </button>
            </div>
        </div>
    );
};

export default Forest;
