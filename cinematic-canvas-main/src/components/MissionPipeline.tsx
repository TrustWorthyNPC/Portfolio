import { motion } from "framer-motion";
import { Search, Scissors, Volume2, Palette, Send, ChevronRight } from "lucide-react";
import { useState } from "react";

const stages = [
    {
        id: "audit",
        title: "Project Audit",
        desc: "Analyzing footage, identifying hooks, and defining the narrative strategy.",
        icon: Search,
        color: "var(--primary)",
        details: ["Hook Extraction", "Pacing Strategy", "Competitor Analysis"]
    },
    {
        id: "cut",
        title: "Narrative Cut",
        desc: "Assembly of story points with high-impact transitions and rhythmic flow.",
        icon: Scissors,
        color: "#60A5FA",
        details: ["A-Roll Assembly", "Rhythmic Pacing", "Glitch Transitions"]
    },
    {
        id: "sound",
        title: "Sonic Layering",
        desc: "Immersive sound design that drives emotion and reinforces every frame.",
        icon: Volume2,
        color: "#A855F7",
        details: ["SFX Design", "Audio Leveling", "Rhythmic Impact"]
    },
    {
        id: "grade",
        title: "Visual Grade",
        desc: "Cinematic color correction and grading to establish a premium look.",
        icon: Palette,
        color: "var(--accent)",
        details: ["Color Correction", "Cinematic Look", "Dynamic Contrast"]
    },
    {
        id: "delivery",
        title: "Final Output",
        desc: "Format optimization for all platforms with maximum visual retention.",
        icon: Send,
        color: "var(--primary)",
        details: ["Platform Optimization", "Quality Assurance", "Asset Delivery"]
    }
];

const MissionPipeline = () => {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <section id="pipeline" className="relative py-32 px-6 overflow-hidden bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary text-[10px] tracking-[0.4em] uppercase mb-4 font-black"
                    >
                        Tactical Workflow
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-5xl md:text-7xl font-black mb-6 italic"
                    >
                        Mission <span className="gradient-text">Pipeline</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        A high-performance editing framework designed for maximum retention and explosive growth.
                    </motion.p>
                </div>

                <div className="relative">


                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative">
                        {stages.map((stage, i) => (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                                onMouseEnter={() => setActiveStage(i)}
                            >
                                {/* Node */}
                                <div className="relative mb-12 flex justify-center">
                                    <motion.div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 ${activeStage === i ? "scale-110 shadow-[0_0_30px_rgba(0,255,255,0.3)] border-primary" : "border-white/10"
                                            }`}
                                        style={{
                                            backgroundColor: activeStage === i ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.03)",
                                            border: "1px solid"
                                        }}
                                    >
                                        <stage.icon className={`w-6 h-6 transition-colors duration-500 ${activeStage === i ? "text-primary" : "text-white/40"}`} />
                                    </motion.div>

                                    {/* Pulse Ring */}
                                    {activeStage === i && (
                                        <motion.div
                                            layoutId="pulse"
                                            className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`text-center transition-all duration-500 ${activeStage === i ? "opacity-100 transform translate-y-0" : "opacity-40 transform translate-y-2"}`}>
                                    <span className="text-[10px] font-mono tracking-widest text-primary mb-2 block font-bold uppercase">
                                        Stage 0{i + 1}
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {stage.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                        {stage.desc}
                                    </p>

                                    <ul className="space-y-2 text-[10px] font-mono tracking-wider text-white/60">
                                        {stage.details.map((detail, index) => (
                                            <li key={index} className="flex items-center justify-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-primary/40" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Visual Connection (Mobile/MD) */}
                                <div className="absolute top-1/2 -right-3 hidden md:block lg:hidden text-white/5">
                                    <ChevronRight />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionPipeline;
