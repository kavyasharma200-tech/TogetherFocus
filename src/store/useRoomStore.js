import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, set as dbSet, get as dbGet, update, onValue, off, serverTimestamp, query, orderByChild, equalTo, push, onDisconnect } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { nanoid } from 'nanoid';

const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.slice(0, 3) + '-' + result.slice(3);
};

const useRoomStore = create((set, get) => ({
    currentRoom: null,
    messages: [],
    roomError: null,
    loading: false,

    subscribeToRoom: (roomId) => {
        if (!roomId) return;
        set({ loading: true });
        const roomRef = ref(db, `rooms/${roomId}`);
        const chatRef = ref(db, `chats/${roomId}`);

        onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                set({ currentRoom: data, loading: false });
            } else {
                set({ currentRoom: null, loading: false, roomError: "Room not found" });
            }
        });

        // Subscribe to chat messages
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.entries(data).map(([id, msg]) => ({
                    id,
                    ...msg
                })).sort((a, b) => a.timestamp - b.timestamp);
                set({ messages: messageList });
            } else {
                set({ messages: [] });
            }
        });
    },

    unsubscribeFromRoom: (roomId) => {
        if (!roomId) return;
        off(ref(db, `rooms/${roomId}`));
        off(ref(db, `chats/${roomId}`));
    },

    createRoom: async (user) => {
        set({ loading: true, roomError: null });
        try {
            const roomCode = generateRoomCode();
            const roomId = `room_${nanoid(10)}`;

            const newRoom = {
                roomId,
                roomCode,
                hostId: user.uid,
                members: {
                    [user.uid]: {
                        name: user.displayName || 'Wizard',
                        joinedAt: serverTimestamp(),
                        isHost: true,
                        online: true
                    }
                },
                status: 'active',
                createdAt: serverTimestamp(),
                settings: {
                    defaultDuration: 25 * 60,
                    allowPartnerControl: true,
                },
                currentSession: {
                    isActive: false,
                    isPaused: false,
                    startTime: null,
                    timeRemaining: 25 * 60,
                    environment: 'garden',
                }
            };

            await dbSet(ref(db, `rooms/${roomId}`), newRoom);

            // Presence Logic
            onDisconnect(ref(db, `rooms/${roomId}/members/${user.uid}/online`)).set(false);

            set({ loading: false });
            return roomId;
        } catch (error) {
            set({ roomError: error.message, loading: false });
            throw error;
        }
    },

    joinRoom: async (roomCode, user) => {
        set({ loading: true, roomError: null });
        const formattedCode = roomCode.toUpperCase();

        try {
            const roomsRef = ref(db, 'rooms');
            const q = query(roomsRef, orderByChild('roomCode'), equalTo(formattedCode));
            const snapshot = await dbGet(q);

            if (!snapshot.exists()) throw new Error("Room not found");

            let roomId = null;
            let roomData = null;
            snapshot.forEach((child) => {
                roomId = child.key;
                roomData = child.val();
            });

            const members = roomData.members || {};
            if (Object.keys(members).length >= 4 && !members[user.uid]) {
                throw new Error("This Common Room is at capacity (max 4).");
            }

            await update(ref(db, `rooms/${roomId}/members/${user.uid}`), {
                name: user.displayName || 'Apprentice',
                joinedAt: serverTimestamp(),
                isHost: false,
                online: true
            });

            // Presence Logic
            onDisconnect(ref(db, `rooms/${roomId}/members/${user.uid}/online`)).set(false);

            set({ loading: false });
            return roomId;
        } catch (error) {
            set({ roomError: error.message, loading: false });
            throw error;
        }
    },

    sendMessage: async (roomId, user, text) => {
        if (!text.trim()) return;
        try {
            const chatRef = ref(db, `chats/${roomId}`);
            await push(chatRef, {
                senderId: user.uid,
                senderName: user.displayName || 'Wizard',
                text: text.trim(),
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    },

    leaveRoom: async (roomId, userId) => {
        try {
            const roomRef = ref(db, `rooms/${roomId}/members/${userId}`);
            await dbSet(roomRef, null);

            // Check if room is empty
            const rRef = ref(db, `rooms/${roomId}`);
            const snap = await dbGet(rRef);
            if (snap.exists()) {
                const data = snap.val();
                if (!data.members || Object.keys(data.members).length === 0) {
                    // Reset or delete? Let's just reset timer for now as per "Ministry Decree"
                    await update(ref(db, `rooms/${roomId}/currentSession`), {
                        isActive: false,
                        isPaused: false,
                        timeRemaining: 0,
                        lastResetReason: "All wizards have left the portal.",
                        lastResetTime: serverTimestamp()
                    });
                } else {
                    // If host leaves, assign new host? For simplicity, we'll keep the decree
                    await update(ref(db, `rooms/${roomId}/currentSession`), {
                        isActive: false,
                        isPaused: false,
                        timeRemaining: 0,
                        lastResetReason: "A wizard has left the portal.",
                        lastResetTime: serverTimestamp()
                    });
                }
            }
        } catch (error) {
            console.error("Leave room error:", error);
        }
    },

    updateSessionState: async (roomId, updates) => {
        try {
            await update(ref(db, `rooms/${roomId}/currentSession`), {
                ...updates,
                lastSyncTime: serverTimestamp()
            });
        } catch (error) {
            console.error("Update session error:", error);
        }
    },

    sendPing: async (roomId, userId, userName) => {
        try {
            await update(ref(db, `rooms/${roomId}/currentSession`), {
                lastPing: { from: userId, fromName: userName, timestamp: serverTimestamp() }
            });
        } catch (error) {
            console.error("Ping error:", error);
        }
    }
}));

export default useRoomStore;
