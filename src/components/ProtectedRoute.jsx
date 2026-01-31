import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Sparkles } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthStore();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d0b1a] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-[#d4af37] animate-pulse" />
                </div>
                <p className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Unveiling the Realm...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
