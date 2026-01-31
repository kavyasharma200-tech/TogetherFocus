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
                drawPastelPark(ctx, width, height, time);
            } else if (type === 'cottage') {
                drawCozyCorner(ctx, width, height, time);
            } else {
                drawDreamySky(ctx, width, height, time);
            }

            animationFrame = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [type]);

    const drawPastelPark = (ctx, w, h, t) => {
        // Background
        ctx.fillStyle = '#e6fff0'; // Pastel Green
        ctx.fillRect(0, 0, w, h);

        // Sun
        ctx.fillStyle = '#fffda8'; // Neo Yellow
        ctx.beginPath();
        ctx.arc(w - 100, 100, 60, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Abstract Trees
        for (let i = 0; i < 5; i++) {
            const x = (w / 5) * i + 100;
            const y = h - 100;
            const treeHeight = 150 + Math.sin(t + i) * 10;

            // Trunk
            ctx.fillStyle = '#a89f91'; // Soft Brown
            ctx.fillRect(x - 15, y - treeHeight, 30, treeHeight);
            ctx.strokeRect(x - 15, y - treeHeight, 30, treeHeight);

            // Leaves (Circle)
            ctx.fillStyle = i % 2 === 0 ? '#a8ffb5' : '#ffa8e0'; // Green or Pink
            ctx.beginPath();
            ctx.arc(x, y - treeHeight, 50, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    };

    const drawCozyCorner = (ctx, w, h, t) => {
        // Background
        ctx.fillStyle = '#fffda8'; // Neo Yellow
        ctx.fillRect(0, 0, w, h);

        // Floating Shapes (Lamps/Decor)
        for (let i = 0; i < 8; i++) {
            const x = (i * 150 + t * 20) % w;
            const y = 100 + Math.sin(t + i) * 50;

            ctx.fillStyle = '#ffa8e0'; // Neo Pink
            ctx.beginPath();
            ctx.rect(x, y, 40, 40);
            ctx.fill();
            ctx.stroke();

            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(x + 5, y + 5, 40, 40);
        }
    };

    const drawDreamySky = (ctx, w, h, t) => {
        // Background
        ctx.fillStyle = '#e6f2ff'; // Pastel Blue
        ctx.fillRect(0, 0, w, h);

        // Clouds
        for (let i = 0; i < 6; i++) {
            const x = (t * 50 + i * 250) % (w + 200) - 100;
            const y = 100 + Math.sin(t * 0.5 + i) * 30;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, Math.PI * 2);
            ctx.arc(x + 30, y - 10, 50, 0, Math.PI * 2);
            ctx.arc(x + 60, y, 40, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        // Stars
        for (let i = 0; i < 20; i++) {
            const x = (i * 90) % w;
            const y = (i * 130) % h;

            if (Math.sin(t * 5 + i) > 0) {
                ctx.fillStyle = '#dca8ff'; // Neo Purple
                ctx.beginPath();
                ctx.moveTo(x, y - 10);
                ctx.lineTo(x + 3, y - 3);
                ctx.lineTo(x + 10, y);
                ctx.lineTo(x + 3, y + 3);
                ctx.lineTo(x, y + 10);
                ctx.lineTo(x - 3, y + 3);
                ctx.lineTo(x - 10, y);
                ctx.lineTo(x - 3, y - 3);
                ctx.fill();
                ctx.stroke();
            }
        }
    };

    return (
        <div className="relative w-full h-full bg-white">
            <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
            />

            {/* Environment Title */}
            <div className="absolute bottom-6 left-6 neo-card px-4 py-2 bg-white flex items-center gap-3">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-black">
                    {type === 'garden' ? 'Pastel Park' : type === 'cottage' ? 'Cozy Corner' : 'Dreamy Sky'}
                </span>
            </div>
        </div>
    );
};

export default Environment;
