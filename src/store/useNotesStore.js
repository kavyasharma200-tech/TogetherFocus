import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, push, onValue, update, serverTimestamp, off } from 'firebase/database';

const useNotesStore = create((set, get) => ({
    notes: [],
    loading: false,

    subscribeToNotes: (roomId) => {
        const notesRef = ref(db, `notes/${roomId}`);
        set({ loading: true });

        // Cleanup previous listener if any? 
        // Zustand doesn't auto-cleanup, we should handle it.
        // Ideally, we return an unsubscribe function.

        const unsubscribe = onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notesList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                })).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

                set({ notes: notesList, loading: false });
            } else {
                set({ notes: [], loading: false });
            }
        });

        return () => off(notesRef);
    },

    sendNote: async (roomId, userId, userName, text, type = 'text') => {
        if (!text.trim()) return;
        const notesRef = ref(db, `notes/${roomId}`);
        await push(notesRef, {
            authorId: userId,
            authorName: userName,
            text,
            timestamp: serverTimestamp(),
            read: false,
            type
        });
    },

    markNotesRead: async (roomId, userId) => {
        const { notes } = get();
        // Mark all notes from partner as read
        const updates = {};
        notes.forEach(note => {
            if (note.authorId !== userId && !note.read) {
                updates[`notes/${roomId}/${note.id}/read`] = true;
                updates[`notes/${roomId}/${note.id}/readAt`] = serverTimestamp();
            }
        });

        if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
        }
    }
}));

export default useNotesStore;
