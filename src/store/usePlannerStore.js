import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, push, onValue, update, serverTimestamp, off, remove, set as dbSet } from 'firebase/database';

const usePlannerStore = create((set, get) => ({
    tasks: [],
    loading: false,

    subscribeToPlanner: (roomId) => {
        const plannerRef = ref(db, `planner/${roomId}`);
        set({ loading: true });

        const unsubscribe = onValue(plannerRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const taskList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                set({ tasks: taskList, loading: false });
            } else {
                set({ tasks: [], loading: false });
            }
        });

        return () => off(plannerRef);
    },

    addTask: async (roomId, userId, userName, title) => {
        if (!title.trim()) return;
        const plannerRef = ref(db, `planner/${roomId}`);
        await push(plannerRef, {
            title,
            completed: false,
            createdBy: userId,
            createdByName: userName,
            timestamp: serverTimestamp()
        });
    },

    toggleTask: async (roomId, taskId, completed) => {
        await update(ref(db, `planner/${roomId}/${taskId}`), {
            completed,
            completedAt: completed ? serverTimestamp() : null
        });
    },

    deleteTask: async (roomId, taskId) => {
        await remove(ref(db, `planner/${roomId}/${taskId}`));
    }
}));

export default usePlannerStore;
