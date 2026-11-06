export interface AnimationItem {
  slug: string;
  kind: "animation";
  name: string;
  description: string;
  category: "attention" | "entrances" | "hover" | "text" | "background" | "loaders";
  trigger: "loop" | "hover" | "click";
  tags: string[];
  cssKeyframes: string;
  cssClasses: string;
  tailwindClasses: string;
  tailwindConfig: string;
}

export const ANIMATIONS_DATA: AnimationItem[] = [
  // --- ATTENTION & MICRO-INTERACTIONS ---
  {
    slug: "shimmer-skeleton",
    kind: "animation",
    name: "Shimmer Sweep",
    description: "Fluid metallic gradient reflection sweeping smoothly across cards and placeholder skeletons.",
    category: "attention",
    trigger: "loop",
    tags: ["shimmer", "skeleton", "loading", "gloss", "light", "linear", "modern"],
    cssKeyframes: `@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`,
    cssClasses: `.shimmer-sweep {
  position: relative;
  overflow: hidden;
}
.shimmer-sweep::after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite ease-in-out;
}`,
    tailwindClasses: `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite_ease-in-out] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite ease-in-out',
      },
    },
  },
};`,
  },
  {
    slug: "glowing-border-beam",
    kind: "animation",
    name: "Border Beam",
    description: "Electrified border laser beam traveling seamlessly along the perimeter of the component.",
    category: "attention",
    trigger: "loop",
    tags: ["border", "glow", "laser", "beam", "cyber", "magic", "neon"],
    cssKeyframes: `@keyframes border-beam {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}`,
    cssClasses: `.border-beam-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  padding: 1px;
}
.border-beam-core {
  position: absolute;
  aspect-ratio: 1;
  width: 80px;
  background: conic-gradient(from 0deg, transparent 0deg, #3b82f6 90deg, transparent 180deg);
  animation: spin 4s linear infinite;
  transform-origin: center;
}`,
    tailwindClasses: `relative rounded-xl p-[1px] overflow-hidden before:absolute before:inset-[-100%] before:animate-[spin_4s_linear_infinite] before:bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_360deg)]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        beam: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'border-beam': 'beam 4s linear infinite',
      },
    },
  },
};`,
  },
  {
    slug: "radar-beacon-pulse",
    kind: "animation",
    name: "Radar Beacon Pulse",
    description: "Expanding translucent sonar ripple indicating live servers, availability, or alerts.",
    category: "attention",
    trigger: "loop",
    tags: ["radar", "pulse", "ping", "live", "status", "beacon", "dot"],
    cssKeyframes: `@keyframes radar-ping {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}`,
    cssClasses: `.beacon-wrapper {
  position: relative;
  display: inline-flex;
  height: 12px;
  width: 12px;
}
.beacon-ping {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: #22c55e;
  opacity: 0.75;
  animation: radar-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.beacon-dot {
  position: relative;
  height: 12px;
  width: 12px;
  border-radius: 9999px;
  background-color: #16a34a;
}`,
    tailwindClasses: `relative flex h-3 w-3 items-center justify-center
// child 1: absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75
// child 2: relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500`,
    tailwindConfig: `// tailwind.config.js - Uses Tailwind built-in animate-ping
// Or customize duration:
module.exports = {
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
};`,
  },
  {
    slug: "heartbeat-ripple",
    kind: "animation",
    name: "Heartbeat Ripple",
    description: "Subtle rhythmic double pulse with dissipating drop-shadow shockwaves.",
    category: "attention",
    trigger: "loop",
    tags: ["heartbeat", "pulse", "shockwave", "alert", "favorite", "like"],
    cssKeyframes: `@keyframes heartbeat {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
  20% { transform: scale(1.08); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  40% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(239, 68, 68, 0); }
  60% { transform: scale(1); }
  100% { transform: scale(1); }
}`,
    cssClasses: `.heartbeat-pulse {
  animation: heartbeat 2s ease-in-out infinite;
}`,
    tailwindClasses: `animate-[heartbeat_2s_ease-in-out_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.6)' },
          '20%': { transform: 'scale(1.08)', boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
          '40%': { transform: 'scale(1.04)', boxShadow: '0 0 0 16px rgba(239, 68, 68, 0)' },
          '60%': { transform: 'scale(1)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 2s ease-in-out infinite',
      },
    },
  },
};`,
  },
  {
    slug: "wobble-elastic",
    kind: "animation",
    name: "Elastic Wobble",
    description: "Playful rotational spring shake triggered to capture urgent eye focus.",
    category: "attention",
    trigger: "hover",
    tags: ["wobble", "shake", "jiggle", "elastic", "spring", "badge", "notification"],
    cssKeyframes: `@keyframes wobble {
  0%, 100% { transform: translateX(0%) rotate(0deg); }
  15% { transform: translateX(-12%) rotate(-6deg); }
  30% { transform: translateX(10%) rotate(5deg); }
  45% { transform: translateX(-8%) rotate(-3deg); }
  60% { transform: translateX(5%) rotate(2deg); }
  75% { transform: translateX(-2%) rotate(-1deg); }
}`,
    cssClasses: `.wobble-hover:hover {
  animation: wobble 0.8s ease-in-out;
}`,
    tailwindClasses: `hover:animate-[wobble_0.8s_ease-in-out]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'translateX(0%) rotate(0deg)' },
          '15%': { transform: 'translateX(-12%) rotate(-6deg)' },
          '30%': { transform: 'translateX(10%) rotate(5deg)' },
          '45%': { transform: 'translateX(-8%) rotate(-3deg)' },
          '60%': { transform: 'translateX(5%) rotate(2deg)' },
          '75%': { transform: 'translateX(-2%) rotate(-1deg)' },
        },
      },
      animation: {
        wobble: 'wobble 0.8s ease-in-out',
      },
    },
  },
};`,
  },
  {
    slug: "neon-flicker-glow",
    kind: "animation",
    name: "Neon Glow Flicker",
    description: "Retro-futuristic gas tube electrical discharge with intermittent micro-flickers.",
    category: "attention",
    trigger: "loop",
    tags: ["neon", "cyberpunk", "glow", "flicker", "retro", "synth"],
    cssKeyframes: `@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 6px rgba(168, 85, 247, 0.9), 0 0 14px rgba(168, 85, 247, 0.6), 0 0 28px rgba(168, 85, 247, 0.3);
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.6;
  }
}`,
    cssClasses: `.neon-flicker {
  animation: neon-flicker 3s infinite;
}`,
    tailwindClasses: `animate-[neon-flicker_3s_infinite] drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.65' },
        },
      },
      animation: {
        'neon-flicker': 'neon-flicker 3s infinite',
      },
    },
  },
};`,
  },

  // --- ENTRANCES & REVEALS ---
  {
    slug: "blur-scale-reveal",
    kind: "animation",
    name: "Cinematic Blur In",
    description: "Cinematic focal lens transition shifting from frosted glass blur into crisp sharpness.",
    category: "entrances",
    trigger: "click",
    tags: ["blur", "reveal", "entrance", "cinematic", "focus", "fade", "linear"],
    cssKeyframes: `@keyframes blur-in {
  0% {
    opacity: 0;
    filter: blur(16px);
    transform: scale(0.92) translateY(12px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: scale(1) translateY(0);
  }
}`,
    cssClasses: `.blur-in {
  animation: blur-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`,
    tailwindClasses: `animate-[blur-in_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'scale(0.92) translateY(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'blur-in': 'blur-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
};`,
  },
  {
    slug: "slide-fade-up",
    kind: "animation",
    name: "Spring Slide Up",
    description: "Natural upward motion dampening gently with physics-based spring deceleration.",
    category: "entrances",
    trigger: "click",
    tags: ["slide", "fade", "entrance", "spring", "physics", "smooth"],
    cssKeyframes: `@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    cssClasses: `.slide-fade-up {
  animation: slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}`,
    tailwindClasses: `animate-[slide-up_0.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
    },
  },
};`,
  },
  {
    slug: "flip-3d-drop",
    kind: "animation",
    name: "3D Perspective Drop",
    description: "Card tumbling down in 3D space with subtle top edge bevel tilt.",
    category: "entrances",
    trigger: "click",
    tags: ["3d", "flip", "drop", "perspective", "modal", "dialog"],
    cssKeyframes: `@keyframes drop-3d {
  0% {
    opacity: 0;
    transform: perspective(600px) rotateX(25deg) translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: perspective(600px) rotateX(0deg) translateY(0);
  }
}`,
    cssClasses: `.drop-3d {
  animation: drop-3d 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}`,
    tailwindClasses: `animate-[drop-3d_0.55s_cubic-bezier(0.34,1.56,0.64,1)_forwards]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'drop-3d': {
          '0%': { opacity: '0', transform: 'perspective(600px) rotateX(25deg) translateY(-30px)' },
          '100%': { opacity: '1', transform: 'perspective(600px) rotateX(0deg) translateY(0)' },
        },
      },
      animation: {
        'drop-3d': 'drop-3d 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
};`,
  },

  // --- HOVER & INTERACTION ---
  {
    slug: "magnetic-levitation",
    kind: "animation",
    name: "Magnetic Levitation (Float)",
    description: "Zero-gravity continuous vertical floating with perfectly harmonized sinusoidal pacing.",
    category: "hover",
    trigger: "loop",
    tags: ["float", "levitate", "hover", "zero-g", "smooth", "ambient"],
    cssKeyframes: `@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}`,
    cssClasses: `.magnetic-float {
  animation: float 3.5s ease-in-out infinite;
}`,
    tailwindClasses: `animate-[float_3.5s_ease-in-out_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
      },
    },
  },
};`,
  },
  {
    slug: "card-tilt-3d",
    kind: "animation",
    name: "3D Perspective Card Tilt",
    description: "Deep dimensional lift on hover with reactive shadow projection and subtle rotation.",
    category: "hover",
    trigger: "hover",
    tags: ["3d", "card", "tilt", "perspective", "hover", "depth"],
    cssKeyframes: `/* No keyframes required: Uses hardware accelerated transitions */`,
    cssClasses: `.card-tilt-3d {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  transform-style: preserve-3d;
}
.card-tilt-3d:hover {
  transform: perspective(800px) rotateX(6deg) rotateY(-6deg) translateZ(12px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}`,
    tailwindClasses: `transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:[transform:perspective(800px)_rotateX(6deg)_rotateY(-6deg)_translateZ(12px)] hover:shadow-2xl`,
    tailwindConfig: `// Pure Tailwind utility classes, no config required!`,
  },
  {
    slug: "elastic-tap-press",
    kind: "animation",
    name: "Elastic Micro-Press",
    description: "Native iOS / macOS physical button sensation with instant click compression and spring rebound.",
    category: "hover",
    trigger: "click",
    tags: ["press", "click", "button", "elastic", "spring", "haptic", "micro-interaction"],
    cssKeyframes: `/* No keyframes required: Uses GPU transition transforms */`,
    cssClasses: `.elastic-press {
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.elastic-press:hover {
  transform: scale(1.03);
}
.elastic-press:active {
  transform: scale(0.94);
}`,
    tailwindClasses: `transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] active:scale-[0.94]`,
    tailwindConfig: `// Works out of the box with standard Tailwind utility classes!`,
  },
  {
    slug: "spotlight-hover-glow",
    kind: "animation",
    name: "Spotlight Radial Glow",
    description: "Dynamic radial gradient aura illuminating the card surface on hover.",
    category: "hover",
    trigger: "hover",
    tags: ["spotlight", "radial", "glow", "torch", "hover", "card", "linear"],
    cssKeyframes: `/* Uses dynamic hover background positioning */`,
    cssClasses: `.spotlight-card {
  position: relative;
  overflow: hidden;
}
.spotlight-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.18), transparent 40%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.spotlight-card:hover::before {
  opacity: 1;
}`,
    tailwindClasses: `group relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_60%)] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300`,
    tailwindConfig: `// tailwind.config.js - Combine with mousemove event or CSS hover`,
  },

  // --- TEXT & TYPOGRAPHY FX ---
  {
    slug: "text-gradient-flow",
    kind: "animation",
    name: "Fluid Gradient Text",
    description: "Multicolor iridescent gradient wave sweeping across headline typography.",
    category: "text",
    trigger: "loop",
    tags: ["text", "gradient", "flow", "iridescent", "rainbow", "stripe", "headline"],
    cssKeyframes: `@keyframes text-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    cssClasses: `.text-gradient-flow {
  background: linear-gradient(90deg, #3b82f6, #ec4899, #8b5cf6, #3b82f6);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-flow 6s ease infinite;
}`,
    tailwindClasses: `bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-[text-flow_6s_ease_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'text-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'text-flow': 'text-flow 6s ease infinite',
      },
    },
  },
};`,
  },
  {
    slug: "terminal-typewriter",
    kind: "animation",
    name: "Terminal Typewriter & Cursor",
    description: "Monospace code typing effect accompanied by an authentic blinking terminal caret.",
    category: "text",
    trigger: "loop",
    tags: ["typewriter", "terminal", "code", "cursor", "typing", "cli"],
    cssKeyframes: `@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}`,
    cssClasses: `.typewriter {
  font-family: monospace;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #3b82f6;
  width: 0;
  animation: typing 3s steps(30, end) infinite alternate, blink 0.75s step-end infinite;
}`,
    tailwindClasses: `font-mono overflow-hidden whitespace-nowrap border-r-2 border-blue-500 animate-[typing_3s_steps(30,end)_infinite_alternate,blink_0.75s_step-end_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typewriter: 'typing 3s steps(30, end) infinite alternate, blink 0.75s step-end infinite',
      },
    },
  },
};`,
  },
  {
    slug: "metallic-text-wipe",
    kind: "animation",
    name: "Metallic Shimmer Text",
    description: "Specular chrome gleam sweeping over typography from left to right.",
    category: "text",
    trigger: "loop",
    tags: ["text", "metallic", "shimmer", "chrome", "silver", "shine"],
    cssKeyframes: `@keyframes text-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}`,
    cssClasses: `.text-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.4) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-shimmer 3s linear infinite;
}`,
    tailwindClasses: `bg-[linear-gradient(90deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.4)_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[text-shimmer_3s_linear_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'text-shimmer': 'text-shimmer 3s linear infinite',
      },
    },
  },
};`,
  },

  // --- BACKGROUND & AMBIENT ---
  {
    slug: "infinite-marquee",
    kind: "animation",
    name: "Infinite Marquee Rail",
    description: "Continuous frictionless horizontal rail sliding logos or tags without jitter.",
    category: "background",
    trigger: "loop",
    tags: ["marquee", "rail", "ticker", "logos", "infinite", "scroll", "horizontal"],
    cssKeyframes: `@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}`,
    cssClasses: `.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 2rem;
}
.marquee-track {
  display: flex;
  flex-shrink: 0;
  gap: 2rem;
  animation: marquee 25s linear infinite;
}
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}`,
    tailwindClasses: `flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] gap-8`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
};`,
  },
  {
    slug: "aurora-gradient-mesh",
    kind: "animation",
    name: "Aurora Ambient Mesh",
    description: "Dreamy shifting atmospheric plasma blobs softly rotating in background layers.",
    category: "background",
    trigger: "loop",
    tags: ["aurora", "mesh", "gradient", "ambient", "plasma", "background"],
    cssKeyframes: `@keyframes aurora-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}`,
    cssClasses: `.aurora-orb {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 9999px;
  filter: blur(60px);
  opacity: 0.45;
  background: radial-gradient(circle, #3b82f6, #ec4899);
  animation: aurora-spin 12s ease-in-out infinite;
}`,
    tailwindClasses: `absolute h-72 w-72 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 blur-3xl opacity-40 animate-[aurora-spin_12s_ease-in-out_infinite]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'aurora-spin': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.15)' },
        },
      },
      animation: {
        aurora: 'aurora-spin 12s ease-in-out infinite',
      },
    },
  },
};`,
  },

  // --- LOADERS & PROGRESS ---
  {
    slug: "orbital-conic-spinner",
    kind: "animation",
    name: "Conic Orbital Spinner",
    description: "Sleek high-density circular activity indicator with fading tail.",
    category: "loaders",
    trigger: "loop",
    tags: ["spinner", "loader", "conic", "orbital", "progress", "circle"],
    cssKeyframes: `@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    cssClasses: `.conic-spinner {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, #3b82f6 100%);
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px));
  animation: spin 0.85s linear infinite;
}`,
    tailwindClasses: `h-9 w-9 rounded-full animate-spin [background:conic-gradient(from_0deg,transparent_0%,#3b82f6_100%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#fff_calc(100%-3px))]`,
    tailwindConfig: `// Uses Tailwind built-in animate-spin with custom conic mask!`,
  },
  {
    slug: "bouncing-triple-dots",
    kind: "animation",
    name: "Staggered Triple Dots",
    description: "Harmonized conversation typing indicator with staggered vertical hops.",
    category: "loaders",
    trigger: "loop",
    tags: ["dots", "typing", "staggered", "loader", "bounce", "chat"],
    cssKeyframes: `@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-8px); opacity: 1; }
}`,
    cssClasses: `.dot-container {
  display: flex;
  gap: 6px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  animation: dot-bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }`,
    tailwindClasses: `flex gap-1.5
// dot 1: h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out]
// dot 2: h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out_0.2s]
// dot 3: h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out_0.4s]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-8px)', opacity: '1' },
        },
      },
      animation: {
        'dot-bounce': 'dot-bounce 1.2s infinite ease-in-out',
      },
    },
  },
};`,
  },
];
