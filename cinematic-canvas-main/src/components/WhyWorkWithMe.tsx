import { motion } from "framer-motion";
import { Clapperboard, Target, Zap } from "lucide-react";

const reasons = [
  {
    icon: Clapperboard,
    title: "Story-Driven Edits",
    description:
      "Every reel has a narrative arc. I don't just cut clips — I craft stories that hook viewers in the first frame and keep them watching.",
  },
  {
    icon: Target,
    title: "Performance Focused",
    description:
      "Edits optimized for engagement. Beat-synced cuts, trending formats, and scroll-stopping hooks designed to maximize reach and conversions.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Most projects delivered within 48-72 hours. Rush delivery available. Your content calendar never misses a beat.",
  },
];

const WhyWorkWithMe = () => {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">
            The Edge
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Why <span className="gradient-text">Work With Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-hover p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">
                {r.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {r.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
