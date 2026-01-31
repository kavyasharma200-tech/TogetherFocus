import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { ref, set as dbSet, get as dbGet, update, serverTimestamp, onDisconnect, onValue } from 'firebase/database';
import { googleProvider } from '../lib/firebase';

const useAuthStore = create((set, get) => ({
    user: null,
    userProfile: null,
    loading: true,
    error: null,

    initialize: () => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                set({ user, loading: true });

                // Setup presence system
                const userStatusDatabaseRef = ref(db, `/presence/${user.uid}`);
                const isOfflineForDatabase = {
                    online: false,
                    lastSeen: serverTimestamp(),
                };
                const isOnlineForDatabase = {
                    online: true,
                    lastSeen: serverTimestamp(),
                };

                const connectedRef = ref(db, '.info/connected');
                onValue(connectedRef, (snap) => {
                    if (snap.val() === true) {
                        // We're connected (or reconnected)!
                        update(userStatusDatabaseRef, isOnlineForDatabase);

                        // When I disconnect, update the last time I was seen online
                        onDisconnect(userStatusDatabaseRef).update(isOfflineForDatabase);
                    }
                });

                // Fetch custom user profile from DB
                try {
                    const userRef = ref(db, `users/${user.uid}`);
                    const snapshot = await dbGet(userRef);

                    if (snapshot.exists()) {
                        set({ userProfile: snapshot.val() });
                        // Update last active
                        update(userRef, { lastActive: serverTimestamp() });
                    } else {
                        // Create profile if doesn't exist (e.g. first google login)
                        const newProfile = {
                            displayName: user.displayName || 'User',
                            email: user.email,
                            photoURL: user.photoURL,
                            createdAt: serverTimestamp(),
                            lastActive: serverTimestamp(),
                            totalFocusMinutes: 0,
                            totalSessions: 0,
                            currentStreak: 0,
                            longestStreak: 0,
                            seeds: 5, // Start with 5 seeds
                            forest: [], // Array of planted trees
                            xp: 0,
                            level: 1,
                            achievements: []
                        };
                        await dbSet(userRef, newProfile);
                        set({ userProfile: newProfile });
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                }
            } else {
                set({ user: null, userProfile: null });
            }
            set({ loading: false });
        });
        return unsubscribe;
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    register: async (email, password, displayName) => {
        set({ loading: true, error: null });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });

            // Create user profile in DB
            const userRef = ref(db, `users/${userCredential.user.uid}`);
            const newProfile = {
                displayName,
                email,
                photoURL: null,
                createdAt: serverTimestamp(),
                lastActive: serverTimestamp(),
                totalFocusMinutes: 0,
                totalSessions: 0,
                currentStreak: 0,
                longestStreak: 0,
                seeds: 5,
                forest: [],
                xp: 0,
                level: 1,
                achievements: []
            };
            await dbSet(userRef, newProfile);
            set({ userProfile: newProfile });

        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },


    loginWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
            await signInWithPopup(auth, googleProvider);
            // Profile creation handled in onAuthStateChanged
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            // Set offline status explicitly before signing out
            const user = get().user;
            if (user) {
                const userStatusDatabaseRef = ref(db, `/presence/${user.uid}`);
                await update(userStatusDatabaseRef, {
                    online: false,
                    lastSeen: serverTimestamp(),
                });
            }
            await signOut(auth);
            set({ user: null, userProfile: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateUserProfile: async (updates) => {
        const { user } = get();
        if (!user) return;

        try {
            const userRef = ref(db, `users/${user.uid}`);
            await update(userRef, updates);
            set(state => ({
                userProfile: { ...state.userProfile, ...updates }
            }));
        } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
        }
    }
}));


export default useAuthStore;
