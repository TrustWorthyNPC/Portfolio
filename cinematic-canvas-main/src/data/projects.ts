export interface Project {
  id: string;
  title: string;
  category: "Gym Reels" | "Storyline" | "Motivational Edits" | "Brand Ads" | "Cafe";
  client_type: string;
  goal: string;
  description: string;
  tools_used: string[];
  result_metrics: string;
  thumbnail: string;
  instagram_link: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "The Modern Athlete",
    category: "Gym Reels",
    client_type: "Anushasan Fitness",
    goal: "Showcase the raw intensity and discipline of modern athletic training.",
    description: "A high-octane performance edit featuring rhythmic cuts and aggressive color grading designed to amplify the athlete's presence.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "52k+ Views",
    thumbnail: "/images/reel1.jpg",
    instagram_link: "https://www.instagram.com/p/DSCuZ1ICRmf/",
    gradient: "from-cyan-400/40 via-cyan-500/10 to-transparent",
  },
  {
    id: "2",
    title: "Cafe Brand Visual",
    category: "Cafe",
    client_type: "Velinna Cafe",
    goal: "Capture the morning atmosphere and premium quality of the artisan coffee process.",
    description: "Warm aesthetic brand showcase edit blending atmosphere with high-end visuals.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "Brand Awareness",
    thumbnail: "/images/cafe_1.jpg",
    instagram_link: "https://www.instagram.com/reel/DPRBXrxAaGq/",
    gradient: "from-cyan-400/30 via-emerald-500/10 to-transparent",
  },
  {
    id: "3",
    title: "Tareef: A Love Story",
    category: "Storyline",
    client_type: "Ansh Basoya",
    goal: "Capture the essence of emotions through cinematic storytelling and soulful pacing.",
    description: "A heart-touching storytelling edit blending atmospheric visuals with deep emotional resonance, crafted specifically for the modern romantic narrative.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "2.4M Views",
    thumbnail: "/images/tareef.jpg",
    instagram_link: "https://www.instagram.com/p/DUIobs1jzE2/",
    gradient: "from-fuchsia-500/40 via-rose-500/10 to-transparent",
  },
  {
    id: "4",
    title: "Mindset Mastery",
    category: "Motivational Edits",
    client_type: "Anushasan Fitness",
    goal: "Synthesize long-form speech into powerful, scroll-stopping reels.",
    description: "Powerful motivational short-form content designed to stop the scroll and inspire.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "Viral Storytelling",
    thumbnail: "/images/moti_1.jpg",
    instagram_link: "https://www.instagram.com/p/DQwT_uHCf5x/",
    gradient: "from-violet-500/40 via-purple-500/10 to-transparent",
  },
  {
    id: "5",
    title: "Cinematic Fitness Cut",
    category: "Brand Ads",
    client_type: "Anytime Fitness",
    goal: "Showcase athlete performance with high-speed cuts and cinematic color grading.",
    description: "Brand-focused ad blending lifestyle shots with high-energy workout sequences.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "Viral Fitness Cut",
    thumbnail: "/images/brand_ad3.jpg",
    instagram_link: "https://www.instagram.com/reel/DOlqOiKD1Cz/",
    gradient: "from-cyan-500/40 via-blue-500/10 to-transparent",
  },
  {
    id: "6",
    title: "Brand Dynamic Cut",
    category: "Brand Ads",
    client_type: "Anushasan Fitness",
    goal: "Drive engagement through high-impact rhythmic editing and cinematic transitions.",
    description: "A fast-paced commercial edit focusing on motion and energy.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "50k+ Views",
    thumbnail: "/images/brand_ad1.jpg",
    instagram_link: "https://www.instagram.com/reel/DKhZenJJ8s9/",
    gradient: "from-cyan-500/40 via-blue-600/10 to-transparent",
  },
  {
    id: "7",
    title: "Master of Motion",
    category: "Brand Ads",
    client_type: "Viro Edit Co.",
    goal: "Showcase the pinnacle of high-end motion graphics and rhythmic storytelling.",
    description: "A definitive showreel piece blending impossible transitions with razor-sharp color precision.",
    tools_used: ["DaVinci Resolve", "After Effects"],
    result_metrics: "Visual Excellence",
    thumbnail: "/images/brand_ad2.jpg",
    instagram_link: "https://www.instagram.com/reel/DOi40FBiR8a/",
    gradient: "from-fuchsia-500/40 via-violet-500/10 to-transparent",
  },



];


export const categories = ["All", "Gym Reels", "Storyline", "Motivational Edits", "Brand Ads", "Cafe"] as const;




