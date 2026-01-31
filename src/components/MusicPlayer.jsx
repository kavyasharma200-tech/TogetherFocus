import React, { useState } from 'react';
import { Music, Radio, Disc } from 'lucide-react';

const MusicPlayer = () => {
    const [playlistUrl, setPlaylistUrl] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS"); // Lofi Garden default
    const [inputUrl, setInputUrl] = useState("");
    const [showInput, setShowInput] = useState(false);

    const updatePlaylist = (e) => {
        e.preventDefault();
        let finalUrl = inputUrl;

        if (inputUrl.includes('open.spotify.com')) {
            const urlObj = new URL(inputUrl);
            const pathParts = urlObj.pathname.split('/');
            const type = pathParts[1];
            const id = pathParts[2];
            finalUrl = `https://open.spotify.com/embed/${type}/${id}`;
        }

        setPlaylistUrl(finalUrl);
        setShowInput(false);
    };

    return (
        <div className="neo-card p-4 bg-white w-full h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neo-purple border-2 border-black rounded-lg shadow-neo-sm">
                        <Music className="w-5 h-5 text-black" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg text-black uppercase leading-none">Sonic</h3>
                        <span className="text-xs font-bold bg-neo-yellow px-1 border border-black">VIBES</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="neo-btn px-2 py-1 text-[10px] bg-white hover:bg-gray-100"
                >
                    <Radio size={14} /> Tune Frame
                </button>
            </div>

            {showInput && (
                <form onSubmit={updatePlaylist} className="mb-4 flex gap-2 animate-in slide-in-from-top-2">
                    <input
                        type="text"
                        placeholder="Spotify Link..."
                        className="neo-input flex-1 p-2 text-xs"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button type="submit" className="neo-btn text-xs py-2 px-3 bg-neo-green">Load</button>
                </form>
            )}

            <div className="flex-1 rounded-xl overflow-hidden border-2 border-black bg-black relative">
                {/* Decorative background for when loading */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <Disc size={48} className="animate-spin-slow" />
                </div>
                <iframe
                    className="relative z-10"
                    style={{ borderRadius: '12px' }}
                    src={`${playlistUrl}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
