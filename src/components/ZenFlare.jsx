import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZenFlare = ({ active, onComplete }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (active) {
            const newParticles = Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                color: ['var(--neo-pink)', 'var(--neo-blue)', 'var(--neo-purple)', 'var(--neo-green)'][Math.floor(Math.random() * 4)],
                size: Math.random() * 15 + 5
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                onComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [active, onComplete]);

    return (
        <AnimatePresence>
            {active && (
                <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 2 }}
                        className="w-0 h-0"
                    >
                        {particles.map(p => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    x: p.x * 15,
                                    y: p.y * 15,
                                    opacity: 0,
                                    scale: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 2.5, ease: "easeOut" }}
                                style={{
                                    position: 'absolute',
                                    width: p.size,
                                    height: p.size,
                                    backgroundColor: p.color,
                                    borderRadius: '50%',
                                    boxShadow: `0 0 20px ${p.color}`
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ZenFlare;
