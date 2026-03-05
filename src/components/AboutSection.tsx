import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const tools = [
  { name: "After Effects", icon: "🎬" },
  { name: "Premiere Pro", icon: "✂️" },
  { name: "DaVinci Resolve", icon: "🎨" },
  { name: "Photoshop", icon: "📸" },
];

const skills = [
  { name: "Short-Form Reels", level: 98, color: "var(--primary)" },
  { name: "Color Grading", level: 94, color: "var(--gradient-blue)" },
  { name: "Motion Graphics", level: 88, color: "var(--accent)" },
  { name: "Sound Design", level: 85, color: "var(--primary)" },
];

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  function handleMouseMove(event: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      <div className="h-full glass !rounded-3xl p-8 border-white/5 group-hover:border-primary/30 transition-colors duration-500 overflow-hidden relative">
        <div style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};



const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* Main Story Card */}
          <BentoCard className="md:col-span-8 lg:col-span-7">
            <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-4 font-black">
              The Journey
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-8 leading-tight">
              Meet <span className="gradient-text italic px-4 -mx-4">Whiro</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">
              <p>
                I’m Abhinav, known as Whiro — a performance-focused video editor with
                over <span className="text-white font-bold">5 years</span> of cinematic depth.
              </p>
              <p>
                Specializing in high-stakes gym reels and STORYLINE edits, I transform raw
                footage into conversion-driven digital assets.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-px bg-primary/30" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary italic">Visual Authority</span>
              </div>
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard className="md:col-span-4 lg:col-span-5" delay={0.1}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-10 font-bold">
                  Growth Metrics
                </p>
                <div className="space-y-8">
                  {[
                    { num: "5+", label: "Years Exp", color: "var(--primary)" },
                    { num: "100+", label: "Masterpieces", color: "var(--gradient-blue)" },
                    { num: "20+", label: "Global Clients", color: "var(--accent)" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-end gap-4">
                      <span className="font-display text-5xl font-black text-white leading-none">
                        {stat.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground pb-1 font-bold">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 h-20 w-full relative">
                {/* Visual pulse indicator */}
                <div className="absolute inset-0 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 80, 50, 95, 70, 85].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Tech Stack Card */}
          <BentoCard className="md:col-span-6 lg:col-span-5" delay={0.2}>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-8 font-bold">
              Tech Stack
            </p>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 text-center"
                >
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-xs font-bold text-foreground/80">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-6 lg:col-span-7" delay={0.3}>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-8 font-bold">
              Editing Precision
            </p>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider relative z-10">
                    <span className="text-foreground/60">{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
