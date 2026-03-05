import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Play, Rocket } from "lucide-react";
import CyberGridBackground from "./CyberGridBackground";

const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ perspective: "1500px" }}
    >
      <CyberGridBackground />

      {/* Decorative Rhythmic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-[1px] h-32 bg-primary blur-sm -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[1px] h-32 bg-accent blur-sm -translate-y-1/2" />
      </div>      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ transform: "translateZ(-100px)" }}
        >
          <div className="floating-orb w-[800px] h-[800px] -top-1/2 -left-1/4 opacity-10 bg-primary/20 blur-[120px]" />
          <div className="floating-orb w-96 h-96 top-0 right-0 opacity-10 bg-accent/20 blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/30 text-primary text-[10px] tracking-[0.3em] uppercase mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,255,255,0.8)]" />
            Freelance Editor
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] mb-8"
          >
            {["Edits", "that", "Hook."].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-6 italic gradient-text py-4 px-6 -mx-4"
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-white relative inline-block group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Impact that Stays.
            </motion.span>
          </motion.div>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            5+ years of editing experience crafting powerful, cinematic fitness content
            that drives engagement and builds authority.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton
              href="#work"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest glow-button hover:brightness-110 transition-all duration-300 relative z-10"
            >
              <Play className="w-4 h-4" />
              View My Work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-secondary border border-border text-foreground font-black uppercase tracking-widest hover:border-primary/30 hover:bg-secondary/80 transition-all duration-300 relative z-10"
            >
              <Rocket className="w-4 h-4" />
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground scroll-indicator" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
