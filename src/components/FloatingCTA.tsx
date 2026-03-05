import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-button hover:brightness-110 transition-all duration-300 shadow-2xl"
        >
          <Rocket className="w-4 h-4" />
          <span className="hidden sm:inline">Start a Project</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
