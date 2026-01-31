import React, { useEffect, useRef } from 'react';

const Environment = ({ type, sessionState }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        let animationFrame;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const time = Date.now() / 1000;

            if (type === 'garden') {
                // Forbidden Forest / Enchanted Garden
                drawForest(ctx, width, height, time);
            } else if (type === 'cottage') {
                // Gryffindor Tower / Cozy Cottage
                drawCommonRoom(ctx, width, height, time);
            } else if (type === 'space') {
                // Astronomy Tower / Deep Space
                drawAstronomyTower(ctx, width, height, time);
            }

            animationFrame = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [type]);

    const drawForest = (ctx, w, h, t) => {
        // Deep magical greens and moving mists
        const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w);
        grad.addColorStop(0, '#0a210f');
        grad.addColorStop(1, '#050a05');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Floating Spores (Fireflies)
        ctx.fillStyle = '#d4af37';
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(t * 0.5 + i) * 0.5 + 0.5) * w;
            const y = (Math.cos(t * 0.3 + i * 2) * 0.5 + 0.5) * h;
            const size = Math.sin(t + i) * 2 + 3;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#d4af37';
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    };

    const drawCommonRoom = (ctx, w, h, t) => {
        // Warm fireplace glow
        const grad = ctx.createLinearGradient(0, h, 0, 0);
        grad.addColorStop(0, '#741b1b');
        grad.addColorStop(1, '#1a0d0d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Sparks from fireplace
        ctx.fillStyle = '#ff9d00';
        for (let i = 0; i < 15; i++) {
            const x = (i * (w / 15)) + Math.sin(t + i) * 10;
            const y = h - ((t * 100 + i * 200) % h);
            const size = Math.random() * 2 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawAstronomyTower = (ctx, w, h, t) => {
        // Deep stars and nebula
        ctx.fillStyle = '#010103';
        ctx.fillRect(0, 0, w, h);

        // Shooting stars / twinkling stars
        for (let i = 0; i < 50; i++) {
            const x = (i * 137.5) % w;
            const y = (i * 333) % h;
            const opacity = Math.sin(t * 2 + i) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        // Floating celestial rings
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(w / 2, h / 2, 200 + Math.sin(t) * 20, 100, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
    };

    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7] rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 shadow-2xl">
            <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0b1a]/80" />

            {/* Environment Title */}
            <div className="absolute bottom-10 left-10">
                <h3 className="text-[#d4af37] font-bold uppercase tracking-[0.4em] text-sm flex items-center gap-3">
                    <span className="w-12 h-[1px] bg-[#d4af37]/40" />
                    {type === 'garden' ? 'Forbidden Forest' : type === 'cottage' ? 'Gryffindor Tower' : 'Astronomy Tower'}
                </h3>
            </div>
        </div>
    );
};

export default Environment;
