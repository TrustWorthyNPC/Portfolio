import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ScrollStory from "@/components/ScrollStory";
import AboutSection from "@/components/AboutSection";
import MissionPipeline from "@/components/MissionPipeline";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";

const navItems = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 transition-all duration-500 ${scrolled
          ? "py-3 bg-background/70 backdrop-blur-xl border-b border-border/30"
          : "py-5"
          }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-extrabold text-xl gradient-text"
          >
            WHIRO
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm tracking-wide transition-colors duration-300 ${activeSection === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm px-5 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary font-medium hover:bg-primary/20 transition-all duration-300"
            >
              Hire Me
            </a>
          </motion.div>
        </div>
      </nav>

      <HeroSection />
      <div className="section-divider" />
      <ScrollStory />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <MissionPipeline />
      <div className="section-divider" />
      <ContactSection />

      <footer className="py-10 px-6 text-center border-t border-border/20">
        <p className="text-muted-foreground text-sm">
          © 2026 Whiro. Built to perform.
        </p>
      </footer>

      <FloatingCTA />
    </motion.div>
  );
};

export default Index;

