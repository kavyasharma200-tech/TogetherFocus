import React from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Flame, Zap, TreeDeciduous, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, userProfile } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neo-purple p-4 md:p-8 font-quicksand">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="neo-btn bg-white px-3">
                        <ArrowLeft /> Back
                    </button>
                    <h1 className="text-3xl font-black font-outfit uppercase bg-white px-4 py-1 border-3 border-black text-black transform -skew-x-12">
                        Soul Profile
                    </h1>
                </div>

                {/* Profile Card */}
                <div className="neo-card bg-white p-8 md:p-12 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-8 z-10 relative">
                        <div className="relative group">
                            <div className="w-40 h-40 bg-neo-green rounded-full border-4 border-black overflow-hidden relative z-10">
                                <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-0 right-0 bg-neo-yellow px-3 py-1 border-2 border-black rounded-full font-black text-xs z-20">
                                Lvl {userProfile?.level || 1}
                            </div>
                            <div className="absolute inset-0 bg-neo-pink rounded-full border-4 border-black translate-x-2 translate-y-2 -z-0" />
                        </div>

                        <div className="text-center md:text-left space-y-2">
                            <h2 className="text-4xl font-black font-outfit uppercase tracking-tight">{user?.displayName}</h2>
                            <p className="font-bold text-muted bg-gray-100 px-4 py-1 rounded-lg inline-block border-2 border-dashed border-gray-300">
                                Forest Guardian
                            </p>
                            <div className="max-w-md text-sm font-medium pt-2">
                                "The best time to plant a tree was 20 years ago. The second best time is now."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ProfileStat label="Seeds" value={userProfile?.seeds || 0} icon={<Award />} color="bg-neo-green" />
                    <ProfileStat label="Forest" value={(userProfile?.forest?.length || 0) + ' Trees'} icon={<TreeDeciduous />} color="bg-neo-blue" />
                    <ProfileStat label="Streak" value={(userProfile?.currentStreak || 0) + ' Days'} icon={<Flame />} color="bg-neo-pink" />
                    <ProfileStat label="XP" value={userProfile?.xp || 0} icon={<Zap />} color="bg-neo-yellow" />
                </div>

                {/* Achievements Section */}
                <div className="neo-card bg-neo-blue/20 p-8 space-y-6">
                    <h3 className="font-black text-2xl font-outfit flex items-center gap-3">
                        <Award className="w-8 h-8" /> Achievements
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: 'First Seed', desc: 'Planted your first tree' },
                            { title: 'Early Bird', desc: 'Completed a session before 8AM' },
                            { title: 'Zen Master', desc: 'reached 1000 minutes of focus' }
                        ].map((ach, i) => (
                            <div key={i} className="neo-card p-4 bg-white flex items-center gap-4 hover:scale-[1.02]">
                                <div className="w-12 h-12 bg-neo-purple rounded-full border-3 border-black flex items-center justify-center shrink-0">
                                    <BookOpen className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1">{ach.title}</h4>
                                    <p className="text-xs font-semibold text-muted">{ach.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileStat = ({ label, value, icon, color }) => (
    <div className={`neo-card ${color} p-4 flex flex-col items-center justify-center text-center space-y-2`}>
        <div className="bg-white p-3 rounded-full border-3 border-black">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-2xl font-black font-outfit">{value}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</div>
        </div>
    </div>
);

export default Profile;
