import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Send, CheckCircle, Mail, Linkedin, Instagram } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const projectTypes = ["Gym Reels", "Storyline", "Motivational Edits", "Brand Ads", "Social Media Package", "Other"];
const budgetRanges = ["₹1,000 – ₹5,000", "₹5,000 – ₹10,000", "₹10,000 – ₹20,000", "₹20,000+", "Let's discuss"];


const socials = [
  { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=abhinavjassal73@gmail.com", label: "Gmail" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/whiro.ae/", label: "Instagram" },
];

const ContactSection = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputClasses = (field: keyof FormData) =>
    `w-full px-5 py-4 bg-black/40 border-2 rounded-xl text-foreground focus:outline-none transition-all duration-500 font-mono text-sm ${errors[field]
      ? "border-destructive/40 focus:border-destructive shadow-[0_0_20px_rgba(239,68,68,0.15)]"
      : "border-white/5 focus:border-primary/50 shadow-[0_0_30px_rgba(0,255,255,0.05)]"
    }`;

  const MagneticButton = ({ children, className, ...props }: any) => {
    const ref = useRef<HTMLButtonElement>(null);
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
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: mouseX, y: mouseY }}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <p className="text-primary text-[10px] tracking-[0.5em] uppercase font-black">
              Booking Console Available
            </p>
          </div>
          <h2 className="font-display text-6xl md:text-8xl font-black leading-none mb-4 italic tracking-tighter">
            Let's <span className="gradient-text px-6 -mx-6">Execute</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass p-8 md:p-12 max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 border border-primary/25 mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Thanks for reaching out. I'll get back to you within 24 hours. Let's create something powerful.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
                  }}
                  className="mt-8 text-primary text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-5"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name */}
                <div>
                  <div className="relative">
                    <label
                      className={`absolute left-5 transition-all duration-500 pointer-events-none z-10 font-mono text-[10px] uppercase tracking-widest ${focused === "name" || form.name
                        ? "text-primary -top-2.5 bg-black px-2 opacity-100"
                        : "text-muted-foreground top-4 opacity-50"
                        }`}
                    >
                      [Your Name]
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("name")}
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <label
                      className={`absolute left-5 transition-all duration-500 pointer-events-none z-10 font-mono text-[10px] uppercase tracking-widest ${focused === "email" || form.email
                        ? "text-primary -top-2.5 bg-black px-2 opacity-100"
                        : "text-muted-foreground top-4 opacity-50"
                        }`}
                    >
                      [Email Address]
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("email")}
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>

                {/* Project Type + Budget row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-20">
                  <div>
                    <Select
                      value={form.projectType}
                      onValueChange={(value) => handleChange("projectType", value)}
                    >
                      <SelectTrigger className={cn(inputClasses("projectType"), "h-auto py-4 border-2")}>
                        <SelectValue placeholder="[Project Type]" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border/50 backdrop-blur-xl">
                        {projectTypes.map((t) => (
                          <SelectItem key={t} value={t} className="focus:bg-primary/10 focus:text-primary">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.projectType}</p>}
                  </div>
                  <div>
                    <Select
                      value={form.budget}
                      onValueChange={(value) => handleChange("budget", value)}
                    >
                      <SelectTrigger className={cn(inputClasses("budget"), "h-auto py-4 border-2")}>
                        <SelectValue placeholder="[Budget Range]" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border/50 backdrop-blur-xl">
                        {budgetRanges.map((b) => (
                          <SelectItem key={b} value={b} className="focus:bg-primary/10 focus:text-primary">
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.budget}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="relative">
                    <label
                      className={`absolute left-5 transition-all duration-500 pointer-events-none z-10 font-mono text-[10px] uppercase tracking-widest ${focused === "message" || form.message
                        ? "text-primary -top-2.5 bg-black px-2 opacity-100"
                        : "text-muted-foreground top-4 opacity-50"
                        }`}
                    >
                      [Message / Requirements]
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputClasses("message")} resize-none`}
                    />
                  </div>
                  {errors.message && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.message}</p>}
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full py-5 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest flex items-center justify-center gap-3 glow-button hover:brightness-110 transition-all duration-300 relative z-10"
                >
                  Initiate Project
                  <Send className="w-4 h-4" />
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Socials */}
          <div className="mt-10 pt-8 border-t border-border/30 flex justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
