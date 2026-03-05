import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, TrendingUp, Cpu, Play } from "lucide-react";
import { projects, categories, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="h-full"
      onClick={onClick}
    >
      <div className="glass-hover group cursor-pointer h-full flex flex-col hover:shadow-[0_20px_50px_rgba(110,64,255,0.1)] transition-all duration-500 rounded-[2rem] overflow-hidden border border-white/5">
        {/* Thumbnail Container */}
        <div className="relative h-72 rounded-b-[2rem] bg-muted overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />

          {/* Polished Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.15 }}
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:border-primary transition-all duration-700"
            >
              <Play className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform duration-500 translate-x-0.5" />
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute top-6 left-6">
            <span className="text-[9px] tracking-[0.4em] uppercase text-white bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 font-black">
              {project.category}
            </span>
          </div>

          {/* Result Tag */}
          {project.result_metrics && (
            <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 text-[10px] font-black text-primary bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30 uppercase tracking-tight">
              <TrendingUp className="w-3.5 h-3.5" />
              {project.result_metrics}
            </span>
          )}
        </div>

        {/* Info Area */}
        <div className="p-8 pb-10 flex-1 flex flex-col">
          <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            {project.client_type}
          </p>
          <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 tracking-tighter leading-none">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
            {project.description}
          </p>

          {/* Toolkit */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tools_used.map((tool: string) => (
              <span key={tool} className="inline-flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-tighter">
                <Cpu className="w-2.5 h-2.5" />
                {tool}
              </span>
            ))}
          </div>

          {/* Bottom Link Decoration */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 group-hover:text-primary transition-colors">
              Read Story
            </span>
            <div className="h-px flex-1 bg-white/5 group-hover:bg-primary/20 transition-colors" />
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <ExternalLink className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const FeaturedWork = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default FeaturedWork;


