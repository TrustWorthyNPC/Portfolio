import { useRef, useEffect } from "react";

const CyberGridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let mouse = { x: 0, y: 0 };
        let frame = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX - width / 2) / (width / 2);
            mouse.y = (e.clientY - height / 2) / (height / 2);
        };

        const project = (x: number, y: number, z: number) => {
            const focalLength = 400;
            const scale = focalLength / (focalLength + z);
            return {
                x: x * scale + width / 2,
                y: y * scale + height / 2,
                scale,
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frame += 0.005;

            const gridSize = 40;
            const spacing = 100;
            const depth = 2000;

            ctx.beginPath();
            ctx.strokeStyle = "rgba(0, 255, 255, 0.15)";
            ctx.lineWidth = 1;

            // Z-lines (depth)
            for (let x = -gridSize / 2; x <= gridSize / 2; x++) {
                for (let y = -gridSize / 2; y <= gridSize / 2; y++) {
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) continue; // Sparse outer grid

                    const p1 = project(x * spacing + mouse.x * 100, y * spacing + mouse.y * 100, 0);
                    const p2 = project(x * spacing + mouse.x * 200, y * spacing + mouse.y * 200, depth);

                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                }
            }

            // X-Y Planes (Cross sections)
            const planeCount = 8;
            for (let i = 0; i < planeCount; i++) {
                const z = ((i * (depth / planeCount) + frame * 300) % depth);
                const opacity = (1 - z / depth) * 0.3;
                ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;

                const gridSegments = 10;
                for (let s = -gridSegments; s <= gridSegments; s++) {
                    // Horizontal segments
                    const p1 = project(-gridSegments * spacing + mouse.x * (z / 10), s * spacing + mouse.y * (z / 10), z);
                    const p2 = project(gridSegments * spacing + mouse.x * (z / 10), s * spacing + mouse.y * (z / 10), z);
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);

                    // Vertical segments
                    const p3 = project(s * spacing + mouse.x * (z / 10), -gridSegments * spacing + mouse.y * (z / 10), z);
                    const p4 = project(s * spacing + mouse.x * (z / 10), gridSegments * spacing + mouse.y * (z / 10), z);
                    ctx.moveTo(p3.x, p3.y);
                    ctx.lineTo(p4.x, p4.y);
                }
            }

            ctx.stroke();

            // Atmospheric Particles
            ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
            for (let i = 0; i < 50; i++) {
                const pz = (Math.sin(frame + i) * 1000 + 1000) % depth;
                const px = Math.cos(i * 137.5) * 800 + mouse.x * (pz / 2);
                const py = Math.sin(i * 137.5) * 800 + mouse.y * (pz / 2);

                const pos = project(px, py, pz);
                const size = 2 * pos.scale;

                ctx.beginPath();
                ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-50 pointer-events-none"
            style={{ filter: "blur(0.5px)" }}
        />
    );
};

export default CyberGridBackground;
