import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import useAuthStore from '../store/useAuthStore';

const DebugStatus = () => {
    const [status, setStatus] = useState('Initializing...');
    const [dbStatus, setDbStatus] = useState('Checking DB...');
    const [config, setConfig] = useState({});
    const { error: authError, user } = useAuthStore();

    useEffect(() => {
        try {
            setConfig({
                apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Present' : 'Missing',
                projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
                dbUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL
            });

            if (!auth) {
                setStatus('Auth module not initialized');
            } else {
                setStatus('Auth module ready');
            }

            if (!db) {
                setDbStatus('DB module not initialized');
            } else {
                const connectedRef = ref(db, '.info/connected');
                onValue(connectedRef, (snap) => {
                    if (snap.val() === true) {
                        setDbStatus('Connected to Database ✅');
                    } else {
                        setDbStatus('Disconnected from Database ❌');
                    }
                }, (error) => {
                    setDbStatus(`DB Error: ${error.message}`);
                });
            }
        } catch (err) {
            setStatus(`Critical Error: ${err.message}`);
        }
    }, []);

    return (
        <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono border border-white/20 z-[9999] max-w-lg pointer-events-none">
            <h3 className="font-bold border-b border-white/20 mb-2 pb-1">Debug Info</h3>
            <div>App Status: {status}</div>
            <div>DB Status: {dbStatus}</div>
            <div className="mt-2 text-red-400 font-bold">
                {authError ? `Last Auth Error: ${authError}` : ''}
            </div>
            <div className="text-green-400">
                {user ? `User: ${user.email}` : 'User: Not Logged In'}
            </div>
            <div className="mt-2 opacity-50">
                <div>Project: {config.projectId}</div>
            </div>
        </div>
    );
};

export default DebugStatus;
