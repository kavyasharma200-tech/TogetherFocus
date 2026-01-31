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
        <div className="fixed bottom-4 left-4 bg-white p-4 rounded-xl text-[10px] font-bold border-2 border-black shadow-neo-sm z-[9999] max-w-lg pointer-events-none">
            <h3 className="font-black border-b-2 border-black mb-2 pb-1 uppercase tracking-widest">Debug Info</h3>
            <div>App Status: {status}</div>
            <div>DB Status: {dbStatus}</div>
            <div className="mt-2 text-neo-pink font-black uppercase">
                {authError ? `Auth Error: ${authError}` : ''}
            </div>
            <div className="text-neo-blue font-black uppercase">
                {user ? `User: ${user.email}` : 'User: Offline'}
            </div>
            <div className="mt-2 border-t border-black border-dashed pt-2">
                <div>Project: {config.projectId}</div>
            </div>
        </div>
    );
};

export default DebugStatus;
