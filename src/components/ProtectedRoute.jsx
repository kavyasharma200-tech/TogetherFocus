import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Sparkles } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthStore();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-neo-yellow flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-black" />
                </div>
                <p className="text-black font-black text-sm uppercase tracking-widest animate-pulse">Consulting the Oracle...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
