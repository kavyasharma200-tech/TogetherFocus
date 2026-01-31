import React from 'react';
import { Settings, Copy, Sparkles, Wand2, ArrowLeft } from 'lucide-react';

const SetupGuide = () => {
    const exampleEnv = `VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key`;

    return (
        <div className="min-h-screen bg-neo-blue text-black font-quicksand flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-neo-pink border-4 border-black rounded-full rotate-12" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-neo-yellow border-4 border-black rounded-3xl -rotate-12" />

            <div className="max-w-2xl w-full bg-white rounded-[2rem] p-12 neo-card relative z-10 border-4 border-black">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-20 h-20 bg-neo-pink border-3 border-black rounded-3xl flex items-center justify-center mb-6 shadow-neo animate-float">
                        <Settings className="w-10 h-10 text-black" />
                    </div>
                    <h1 className="text-4xl font-black text-black tracking-tight mb-2 font-outfit uppercase">Initialize Foundation</h1>
                    <p className="text-black font-bold uppercase tracking-widest text-[10px] bg-neo-yellow border-2 border-black px-4 py-1">Spiritual Infrastructure Required</p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-neo-sm">
                        <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3 flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-neo-pink" />
                            1. Manifest Firebase
                        </h3>
                        <p className="text-xs text-black font-bold leading-relaxed px-1">
                            Visit the <a href="https://console.firebase.google.com" target="_blank" className="underline hover:bg-neo-yellow transition-colors">Firebase Console</a>. Create a project, enable <strong>Authentication</strong> (Google/Email) and <strong>Realtime Database</strong>.
                        </p>
                    </div>

                    <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-neo-sm">
                        <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3 flex items-center gap-3">
                            <Wand2 className="w-5 h-5 text-neo-blue" />
                            2. Bind the Essence
                        </h3>
                        <p className="text-xs text-black font-bold mb-4 leading-relaxed px-1">
                            Create a file named <code className="bg-neo-blue/20 border-2 border-black px-2 py-0.5 rounded-md font-black">.env</code> in your root directory and paste your spiritual keys:
                        </p>

                        <div className="relative group">
                            <pre className="bg-gray-50 p-6 rounded-2xl text-[10px] md:text-xs text-black font-black overflow-x-auto border-3 border-dashed border-black">
                                {exampleEnv}
                            </pre>
                            <button
                                onClick={() => { navigator.clipboard.writeText(exampleEnv); alert("Keys copied to your scroll!") }}
                                className="absolute top-4 right-4 p-3 bg-white border-2 border-black rounded-xl shadow-neo-sm hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                <Copy className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-neo-sm">
                        <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3 flex items-center gap-3">
                            <Settings className="w-5 h-5 text-neo-purple" />
                            3. Final Awakening
                        </h3>
                        <p className="text-xs text-black font-bold leading-relaxed px-1">
                            Restart your development server to allow the changes to take effect:
                        </p>
                        <div className="mt-4 bg-neo-yellow/20 p-4 rounded-xl flex items-center gap-4 border-2 border-black border-dashed">
                            <code className="text-[10px] font-black bg-white border-2 border-black px-3 py-1">CTRL + C</code>
                            <div className="h-4 w-[2px] bg-black" />
                            <code className="text-[10px] font-black bg-white border-2 border-black px-3 py-1">npm run dev</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupGuide;
