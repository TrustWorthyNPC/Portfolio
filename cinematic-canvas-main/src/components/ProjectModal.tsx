import { motion, AnimatePresence } from "framer-motion";
import { X, Play, TrendingUp, Cpu } from "lucide-react";
import { useEffect, useCallback } from "react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    // Handle ESC key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [project, handleKeyDown]);

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl glass-hover rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-10 p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-foreground/50 hover:text-foreground transition-all group"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="grid grid-cols-1 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <div className="p-10 md:p-16 lg:p-24 flex flex-col items-center text-center">
                                <div className="max-w-3xl w-full">
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-primary text-[10px] tracking-[0.5em] uppercase mb-6 font-black"
                                    >
                                        {project.category}
                                    </motion.p>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-12 leading-[1.1] gradient-text tracking-tighter"
                                    >
                                        {project.title}
                                    </motion.h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mb-16">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-white/[0.03] p-8 rounded-3xl border border-white/5"
                                        >
                                            <p className="text-foreground/30 text-[9px] tracking-[0.3em] uppercase mb-4 font-bold">
                                                The Strategic Goal
                                            </p>
                                            <p className="text-foreground/90 text-xl leading-relaxed font-medium">
                                                {project.goal}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="bg-white/[0.03] p-8 rounded-3xl border border-white/5"
                                        >
                                            <p className="text-foreground/30 text-[9px] tracking-[0.3em] uppercase mb-4 font-bold">
                                                The Impact
                                            </p>
                                            <div className="flex flex-col gap-4">
                                                <span className="inline-flex items-center gap-3 text-3xl font-black text-primary italic">
                                                    <TrendingUp className="w-6 h-6" />
                                                    {project.result_metrics}
                                                </span>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-8 mb-20">
                                        <div className="text-center">
                                            <p className="text-foreground/30 text-[9px] tracking-[0.3em] uppercase mb-4 font-bold">
                                                Client
                                            </p>
                                            <p className="text-foreground/80 font-black px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 uppercase tracking-tight text-xs">
                                                {project.client_type}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-foreground/30 text-[9px] tracking-[0.3em] uppercase mb-4 font-bold">
                                                Toolkit
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {project.tools_used.map((tool) => (
                                                    <span
                                                        key={tool}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black tracking-tighter"
                                                    >
                                                        <Cpu className="w-3 h-3" />
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 border-t border-white/5">
                                        <motion.a
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={project.instagram_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto px-12 py-6 rounded-full bg-primary text-primary-foreground font-black text-xl flex items-center justify-center gap-4 glow-button transition-all duration-500 shadow-2xl shadow-primary/40 group"
                                        >
                                            Watch Full Reel
                                            <Play className="w-6 h-6 fill-primary-foreground group-hover:scale-110 transition-transform" />
                                        </motion.a>

                                        <button
                                            onClick={onClose}
                                            className="w-full sm:w-auto px-12 py-6 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-foreground/40 hover:text-foreground font-bold text-xl"
                                        >
                                            Close Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
