import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Play, Cpu, Instagram } from "lucide-react";
import { projects, Project } from "@/data/projects";

const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Magnetic Tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const magneticRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const magneticRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // 3D Exit Transforms (Tunnel Effect)
    const perspective = useTransform(scrollYProgress, [0, 1], [1000, 500]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, -45]);
    const translateZ = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 20]);

    // Smooth stacking/exit
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const springConfig = { stiffness: 60, damping: 20, mass: 0.5 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothTranslateZ = useSpring(translateZ, springConfig);
    const smoothSectionScale = useSpring(sectionScale, springConfig);

    // Magnetic Media & Parallax
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            skewY: 7,
            filter: "blur(20px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            skewY: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] // Custom elastic-out
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
            style={{
                zIndex: index + 1,
                perspective: "1200px"
            }}
        >
            <motion.div
                style={{
                    scale: smoothSectionScale,
                    opacity: sectionOpacity,
                    rotateX: smoothRotateX,
                    z: smoothTranslateZ
                } as any}
                className="w-full h-full flex items-center justify-center px-6 relative origin-bottom"
            >
                {/* Cinematic Lens Layer */}
                <motion.div
                    style={{ filter: useTransform(blurAmount, (v) => `blur(${v}px)`) }}
                    className="absolute inset-0 pointer-events-none z-20"
                />

                {/* Background Layer with Deep Parallax */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-30`}
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 backdrop-blur-[120px]" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                >
                    {/* Left Side: Visual Media with Parallax */}
                    <motion.div
                        variants={textVariants}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX: magneticRotateX,
                            rotateY: magneticRotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="relative group aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden bg-black/40 border border-white/10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] cursor-none"
                    >
                        <motion.img
                            src={project.thumbnail}
                            alt={project.title}
                            style={{
                                scale: imageScale,
                                rotate: imageRotate,
                                z: 50
                            } as any}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-1000" />

                        {/* Magnetic Glow Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-20 animate-pulse" />
                        </div>

                        {/* Interactive Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                style={{ z: 100 } as any}
                                whileHover={{ scale: 1.15, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-28 h-28 rounded-full bg-white/5 backdrop-blur-3xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-700 group"
                            >
                                <Play className="w-12 h-12 text-white fill-white group-hover:text-primary group-hover:fill-primary transition-colors duration-500" />
                            </motion.div>
                        </div>

                        <div className="absolute top-10 left-10" style={{ transform: "translateZ(80px)" }}>
                            <motion.span
                                variants={textVariants}
                                className="px-6 py-2.5 rounded-full bg-black/80 backdrop-blur-2xl border border-primary/30 text-[10px] uppercase tracking-[0.4em] font-black text-primary shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                            >
                                {project.category}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Right Side: Narrative Information */}
                    <motion.div
                        className="flex flex-col items-start"
                    >
                        <motion.div variants={textVariants} className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-transparent" />
                            <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] animate-pulse">
                                {project.client_type}
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={textVariants}
                            className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-[10px] uppercase leading-[0.85] bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent italic"
                        >
                            {project.title}
                        </motion.h2>

                        <motion.p
                            variants={textVariants}
                            className="text-white/60 text-lg md:text-xl max-w-lg mb-14 leading-relaxed font-medium tracking-tight"
                        >
                            {project.description}
                        </motion.p>

                        <motion.div
                            variants={textVariants}
                            className="flex flex-wrap gap-3 mb-16"
                        >
                            {project.tools_used.map((tool) => (
                                <span key={tool} className="group/tool inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 text-[10px] font-black text-primary/80 uppercase tracking-widest hover:bg-primary/20 hover:border-primary/40 transition-all duration-500">
                                    <Cpu className="w-4 h-4 text-primary group-hover/tool:rotate-180 transition-transform duration-700" />
                                    {tool}
                                </span>
                            ))}
                        </motion.div>

                        <motion.a
                            href={project.instagram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={textVariants}
                            whileHover={{ scale: 1.05, letterSpacing: "0.25em" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-6 px-12 py-6 rounded-3xl bg-primary text-black font-black text-[10px] uppercase tracking-[0.2em] overflow-hidden shadow-[0_0_60px_-10px_rgba(0,255,255,0.5)] transition-all duration-500"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                <Instagram className="w-6 h-6 flex-shrink-0" />
                                Launch Discovery
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

const ScrollStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollVelocity = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

    return (
        <div id="work" ref={containerRef} className="relative bg-black">
            <div className="relative">
                {projects.map((project, index) => (
                    <ProjectSection key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Life-Pulse HUD */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8 items-center">
                <div className="absolute top-[-100px] bottom-[-100px] w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

                {projects.map((_, i) => {
                    const { scrollYProgress: sectionProgress } = useScroll({
                        target: containerRef,
                        offset: [`${i / projects.length} start`, `${(i + 1) / projects.length} end`]
                    });

                    return (
                        <div key={i} className="relative flex items-center justify-center">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-primary/20 border border-primary/40 relative z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    boxShadow: ["0 0 0px rgba(0,255,255,0)", "0 0 15px rgba(0,255,255,0.4)", "0 0 0px rgba(0,255,255,0)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                            {/* Active Ring */}
                            <motion.div
                                className="absolute inset-[-8px] border border-primary rounded-full opacity-0"
                                whileInView={{ opacity: 1 }}
                                viewport={{ margin: "-45% 0px" }}
                            />
                        </div>
                    );
                })}

                {/* Velocity Pulse */}
                <motion.div
                    style={{ height: useTransform(smoothVelocity, [0, 100], [20, 200]) }}
                    className="w-[2px] bg-primary shadow-[0_0_20px_rgba(0,255,255,0.8)] rounded-full mt-4"
                />
            </div>
        </div>
    );
};

export default ScrollStory;
