import React from 'react';
import { Settings, Copy } from 'lucide-react';

const SetupGuide = () => {
    const exampleEnv = `VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`;

    return (
        <div className="min-h-screen bg-[#0F0C29] text-white font-sans flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[#1A1538] rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4 text-red-400">
                        <Settings className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Configuration Required</h1>
                    <p className="text-gray-400">The application needs your Firebase credentials to work.</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-black/20 rounded-xl p-4">
                        <h3 className="font-semibold text-blue-400 mb-2">Step 1: Create Firebase Project</h3>
                        <p className="text-sm text-gray-300">
                            Go to the <a href="https://console.firebase.google.com" target="_blank" className="underline hover:text-white">Firebase Console</a>, create a project, and enable <strong>Authentication</strong> (Google/Email) and <strong>Realtime Database</strong>.
                        </p>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4">
                        <h3 className="font-semibold text-green-400 mb-2">Step 2: Add Environment Variables</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Create a file named <code className="bg-black/40 px-2 py-1 rounded text-yellow-300">.env</code> in the project root (<code className="text-xs">{window.location.hostname === 'localhost' ? 'c:\\Users\\kavya\\card\\together-focus' : 'project root'}</code>) and paste your keys:
                        </p>

                        <div className="relative group">
                            <pre className="bg-black/50 p-4 rounded-lg text-xs md:text-sm text-gray-400 overflow-x-auto border border-white/5">
                                {exampleEnv}
                            </pre>
                            <button
                                onClick={() => navigator.clipboard.writeText(exampleEnv)}
                                className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                title="Copy layout"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4">
                        <h3 className="font-semibold text-purple-400 mb-2">Step 3: Restart Server</h3>
                        <p className="text-sm text-gray-300">
                            After creating the .env file, you must restart the development server in your terminal:
                        </p>
                        <pre className="mt-2 bg-black/40 p-2 rounded text-xs text-gray-400 font-mono">
                            Ctrl+C
                            npm run dev
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupGuide;
