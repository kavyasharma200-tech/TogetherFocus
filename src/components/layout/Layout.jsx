import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import GeminiChatbot from '../GeminiChatbot';
import { Music, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white text-black font-quicksand overflow-x-hidden relative">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at 10% 20%, #ffa8e0 0%, transparent 20%), radial-gradient(circle at 90% 80%, #a8d5ff 0%, transparent 20%)'
                }}
            />

            <div className="relative z-10">
                {children}
            </div>

            {/* Global Chatbot */}
            <GeminiChatbot />

            <Toaster
                position="top-center"
                toastOptions={{
                    className: 'neo-card bg-white border-2 border-black text-black font-bold',
                    style: {
                        borderRadius: '12px',
                        background: '#fff',
                        color: '#000',
                        border: '2px solid #000',
                        boxShadow: '4px 4px 0px 0px #000',
                    },
                    success: {
                        iconTheme: {
                            primary: '#a8ffb5',
                            secondary: '#000',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ff6b6b',
                            secondary: '#000',
                        },
                    }
                }}
            />
        </div>
    );
};

export default Layout;
