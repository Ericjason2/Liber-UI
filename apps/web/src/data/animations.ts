export interface AnimationItem {
  slug: string;
  kind: "animation";
  name: string;
  description: string;
  category: "basic" | "entrances" | "exits" | "text" | "attention" | "background";
  trigger: "loop" | "hover" | "click";
  tags: string[];
  cssKeyframes: string;
  cssClasses: string;
  tailwindClasses: string;
  tailwindConfig: string;
}

export const ANIMATIONS_DATA: AnimationItem[] = [
  // --- 1. BASIC ANIMATIONS  ---
  {
    slug: "scale-up-center",
    kind: "animation",
    name: "Scale Up Center",
    description: "Smooth focal expansion originating from the center.",
    category: "basic",
    trigger: "click",
    tags: ["scale", "zoom", "basic", "pop", "center"],
    cssKeyframes: `@keyframes scale-up-center {
  0% { transform: scale(0.5); }
  100% { transform: scale(1); }
}`,
    cssClasses: `.scale-up-center {
  animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}`,
    tailwindClasses: `animate-[scale-up-center_0.4s_cubic-bezier(0.39,0.575,0.565,1)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'scale-up-center': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
    },
  },
};`,
  },
  {
    slug: "scale-down-center",
    kind: "animation",
    name: "Scale Down Center",
    description: "Sleek contraction into center point.",
    category: "basic",
    trigger: "click",
    tags: ["scale", "shrink", "basic", "center"],
    cssKeyframes: `@keyframes scale-down-center {
  0% { transform: scale(1); }
  100% { transform: scale(0.5); }
}`,
    cssClasses: `.scale-down-center {
  animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}`,
    tailwindClasses: `animate-[scale-down-center_0.4s_cubic-bezier(0.25,0.46,0.45,0.94)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'scale-down-center': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.5)' },
        },
      },
      animation: {
        'scale-down-center': 'scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
};`,
  },
  {
    slug: "rotate-center",
    kind: "animation",
    name: "Rotate Center",
    description: "Full 360-degree continuous or triggered clockwise rotation.",
    category: "basic",
    trigger: "click",
    tags: ["rotate", "spin", "basic", "turn"],
    cssKeyframes: `@keyframes rotate-center {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}`,
    cssClasses: `.rotate-center {
  animation: rotate-center 0.6s ease-in-out both;
}`,
    tailwindClasses: `animate-[rotate-center_0.6s_ease-in-out_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'rotate-center': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'rotate-center': 'rotate-center 0.6s ease-in-out both',
      },
    },
  },
};`,
  },
  {
    slug: "rotate-scale-up",
    kind: "animation",
    name: "Rotate Scale Up",
    description: "Simultaneous 360-degree spin and magnification expanding into view (Animista Basic).",
    category: "basic",
    trigger: "click",
    tags: ["rotate", "scale", "zoom", "spin", "basic", "animista"],
    cssKeyframes: `@keyframes rotate-scale-up {
  0% { transform: scale(1) rotateZ(0); }
  50% { transform: scale(1.4) rotateZ(180deg); }
  100% { transform: scale(1) rotateZ(360deg); }
}`,
    cssClasses: `.rotate-scale-up {
  animation: rotate-scale-up 0.65s linear both;
}`,
    tailwindClasses: `animate-[rotate-scale-up_0.65s_linear_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'rotate-scale-up': {
          '0%': { transform: 'scale(1) rotateZ(0)' },
          '50%': { transform: 'scale(1.4) rotateZ(180deg)' },
          '100%': { transform: 'scale(1) rotateZ(360deg)' },
        },
      },
      animation: {
        'rotate-scale-up': 'rotate-scale-up 0.65s linear both',
      },
    },
  },
};`,
  },
  {
    slug: "flip-horizontal-bottom",
    kind: "animation",
    name: "Flip Horizontal Bottom",
    description: "3D perspective tile somersault pivoting along bottom X-axis (Animista Basic).",
    category: "basic",
    trigger: "hover",
    tags: ["flip", "3d", "card", "horizontal", "animista"],
    cssKeyframes: `@keyframes flip-horizontal-bottom {
  0% { transform: rotateX(0); }
  100% { transform: rotateX(-180deg); }
}`,
    cssClasses: `.flip-horizontal-bottom {
  animation: flip-horizontal-bottom 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  transform-origin: bottom;
}`,
    tailwindClasses: `animate-[flip-horizontal-bottom_0.4s_cubic-bezier(0.455,0.03,0.515,0.955)_both] origin-bottom`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'flip-horizontal-bottom': {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(-180deg)' },
        },
      },
      animation: {
        'flip-horizontal-bottom': 'flip-horizontal-bottom 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
      },
    },
  },
};`,
  },
  {
    slug: "shadow-pop-tr",
    kind: "animation",
    name: "Shadow Pop Top-Right",
    description: "Retro isometric solid shadow extrusion popping into top-right (Animista Basic).",
    category: "basic",
    trigger: "hover",
    tags: ["shadow", "pop", "retro", "isometric", "animista"],
    cssKeyframes: `@keyframes shadow-pop-tr {
  0% {
    box-shadow: 0 0 rgba(0,0,0,0.2);
    transform: translateX(0) translateY(0);
  }
  100% {
    box-shadow: 1px -1px #3b82f6, 2px -2px #3b82f6, 3px -3px #3b82f6, 4px -4px #3b82f6, 5px -5px #3b82f6, 6px -6px #3b82f6;
    transform: translateX(-6px) translateY(6px);
  }
}`,
    cssClasses: `.shadow-pop-tr:hover {
  animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}`,
    tailwindClasses: `hover:animate-[shadow-pop-tr_0.3s_cubic-bezier(0.47,0,0.745,0.715)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'shadow-pop-tr': {
          '0%': { boxShadow: '0 0 rgba(0,0,0,0)', transform: 'translateX(0) translateY(0)' },
          '100%': {
            boxShadow: '1px -1px #3b82f6, 2px -2px #3b82f6, 3px -3px #3b82f6, 4px -4px #3b82f6, 5px -5px #3b82f6, 6px -6px #3b82f6',
            transform: 'translateX(-6px) translateY(6px)',
          },
        },
      },
      animation: {
        'shadow-pop-tr': 'shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both',
      },
    },
  },
};`,
  },

  // --- 2. ENTRANCES (animista.net) ---
  {
    slug: "slide-in-top",
    kind: "animation",
    name: "Slide In Top",
    description: "Crisp vertical entrance dropping into view with custom easing (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["slide", "top", "entrance", "animista", "drop"],
    cssKeyframes: `@keyframes slide-in-top {
  0% { transform: translateY(-100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
    cssClasses: `.slide-in-top {
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}`,
    tailwindClasses: `animate-[slide-in-top_0.5s_cubic-bezier(0.25,0.46,0.45,0.94)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
};`,
  },
  {
    slug: "slide-in-elliptic-top-fwd",
    kind: "animation",
    name: "Slide In Elliptic Top",
    description: "Curved 3D elliptic trajectory swooping smoothly forward into the screen (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["elliptic", "3d", "entrance", "swoop", "animista"],
    cssKeyframes: `@keyframes slide-in-elliptic-top-fwd {
  0% {
    transform: translateY(-400px) rotateX(-30deg) scale(0);
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    transform: translateY(0) rotateX(0) scale(1);
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}`,
    cssClasses: `.slide-in-elliptic-top-fwd {
  animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}`,
    tailwindClasses: `animate-[slide-in-elliptic-top-fwd_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-in-elliptic-top-fwd': {
          '0%': { transform: 'translateY(-400px) rotateX(-30deg) scale(0)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotateX(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-elliptic-top-fwd': 'slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
};`,
  },
  {
    slug: "bounce-in-top",
    kind: "animation",
    name: "Bounce In Top",
    description: "Physics-inspired rubber rebound bounce landing securely into position (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["bounce", "elastic", "physics", "entrance", "animista"],
    cssKeyframes: `@keyframes bounce-in-top {
  0% { transform: translateY(-300px); animation-timing-function: ease-in; opacity: 0; }
  38% { transform: translateY(0); animation-timing-function: ease-out; opacity: 1; }
  55% { transform: translateY(-45px); animation-timing-function: ease-in; }
  72% { transform: translateY(0); animation-timing-function: ease-out; }
  81% { transform: translateY(-18px); animation-timing-function: ease-in; }
  90% { transform: translateY(0); animation-timing-function: ease-out; }
  95% { transform: translateY(-6px); animation-timing-function: ease-in; }
  100% { transform: translateY(0); animation-timing-function: ease-out; }
}`,
    cssClasses: `.bounce-in-top {
  animation: bounce-in-top 1.1s both;
}`,
    tailwindClasses: `animate-[bounce-in-top_1.1s_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'bounce-in-top': {
          '0%': { transform: 'translateY(-300px)', opacity: '0' },
          '38%': { transform: 'translateY(0)', opacity: '1' },
          '55%': { transform: 'translateY(-45px)' },
          '72%': { transform: 'translateY(0)' },
          '81%': { transform: 'translateY(-18px)' },
          '90%': { transform: 'translateY(0)' },
          '95%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bounce-in-top': 'bounce-in-top 1.1s both',
      },
    },
  },
};`,
  },
  {
    slug: "roll-in-left",
    kind: "animation",
    name: "Roll In Left",
    description: "Dynamic rolling translation tumbling in from the left margin (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["roll", "rotate", "entrance", "left", "animista"],
    cssKeyframes: `@keyframes roll-in-left {
  0% { transform: translateX(-400px) rotate(-540deg); opacity: 0; }
  100% { transform: translateX(0) rotate(0deg); opacity: 1; }
}`,
    cssClasses: `.roll-in-left {
  animation: roll-in-left 0.65s ease-out both;
}`,
    tailwindClasses: `animate-[roll-in-left_0.65s_ease-out_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'roll-in-left': {
          '0%': { transform: 'translateX(-400px) rotate(-540deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
        },
      },
      animation: {
        'roll-in-left': 'roll-in-left 0.65s ease-out both',
      },
    },
  },
};`,
  },
  {
    slug: "slit-in-vertical",
    kind: "animation",
    name: "Slit In Vertical",
    description: "Dramatic 3D perspective doorway opening revealing content (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["slit", "3d", "door", "perspective", "entrance", "animista"],
    cssKeyframes: `@keyframes slit-in-vertical {
  0% { transform: translateZ(-800px) rotateY(90deg); opacity: 0; }
  54% { transform: translateZ(-160px) rotateY(87deg); opacity: 1; }
  100% { transform: translateZ(0) rotateY(0); }
}`,
    cssClasses: `.slit-in-vertical {
  animation: slit-in-vertical 0.45s ease-out both;
}`,
    tailwindClasses: `animate-[slit-in-vertical_0.45s_ease-out_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slit-in-vertical': {
          '0%': { transform: 'translateZ(-800px) rotateY(90deg)', opacity: '0' },
          '54%': { transform: 'translateZ(-160px) rotateY(87deg)', opacity: '1' },
          '100%': { transform: 'translateZ(0) rotateY(0)' },
        },
      },
      animation: {
        'slit-in-vertical': 'slit-in-vertical 0.45s ease-out both',
      },
    },
  },
};`,
  },
  {
    slug: "swirl-in-fwd",
    kind: "animation",
    name: "Swirl In Forward",
    description: "Vortex spin and rapid dimensional scale up (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["swirl", "vortex", "spin", "zoom", "entrance", "animista"],
    cssKeyframes: `@keyframes swirl-in-fwd {
  0% { transform: rotate(-540deg) scale(0); opacity: 0; }
  100% { transform: rotate(0) scale(1); opacity: 1; }
}`,
    cssClasses: `.swirl-in-fwd {
  animation: swirl-in-fwd 0.65s ease-out both;
}`,
    tailwindClasses: `animate-[swirl-in-fwd_0.65s_ease-out_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'swirl-in-fwd': {
          '0%': { transform: 'rotate(-540deg) scale(0)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'swirl-in-fwd': 'swirl-in-fwd 0.65s ease-out both',
      },
    },
  },
};`,
  },

  // --- 3. EXITS (animista.net) ---
  {
    slug: "puff-out-center",
    kind: "animation",
    name: "Puff Out Center",
    description: "Dissipating vapor scale-up with soft optical blur and fade (Animista Exits).",
    category: "exits",
    trigger: "click",
    tags: ["puff", "blur", "fade", "exit", "dissolve", "animista"],
    cssKeyframes: `@keyframes puff-out-center {
  0% { transform: scale(1); filter: blur(0px); opacity: 1; }
  100% { transform: scale(1.6); filter: blur(6px); opacity: 0; }
}`,
    cssClasses: `.puff-out-center {
  animation: puff-out-center 0.6s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}`,
    tailwindClasses: `animate-[puff-out-center_0.6s_cubic-bezier(0.165,0.84,0.44,1)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'puff-out-center': {
          '0%': { transform: 'scale(1)', filter: 'blur(0)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', filter: 'blur(6px)', opacity: '0' },
        },
      },
      animation: {
        'puff-out-center': 'puff-out-center 0.6s cubic-bezier(0.165, 0.840, 0.440, 1.000) both',
      },
    },
  },
};`,
  },
  {
    slug: "slide-out-top",
    kind: "animation",
    name: "Slide Out Top",
    description: "Rapid vertical dismissal upward offscreen (Animista Exits).",
    category: "exits",
    trigger: "click",
    tags: ["slide", "exit", "top", "dismiss", "animista"],
    cssKeyframes: `@keyframes slide-out-top {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100px); opacity: 0; }
}`,
    cssClasses: `.slide-out-top {
  animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}`,
    tailwindClasses: `animate-[slide-out-top_0.5s_cubic-bezier(0.55,0.085,0.68,0.53)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-out-top': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
      },
      animation: {
        'slide-out-top': 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
      },
    },
  },
};`,
  },

  // --- 4. TEXT ANIMATIONS (animista.net) ---
  {
    slug: "tracking-in-expand",
    kind: "animation",
    name: "Tracking In Expand",
    description: "Cinematic typographic kerning expansion from compressed letters to airy width (Animista Text).",
    category: "text",
    trigger: "click",
    tags: ["text", "tracking", "kerning", "typography", "expand", "animista"],
    cssKeyframes: `@keyframes tracking-in-expand {
  0% { letter-spacing: -0.5em; opacity: 0; }
  40% { opacity: 0.6; }
  100% { opacity: 1; }
}`,
    cssClasses: `.tracking-in-expand {
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}`,
    tailwindClasses: `animate-[tracking-in-expand_0.7s_cubic-bezier(0.215,0.61,0.355,1)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'tracking-in-expand': {
          '0%': { letterSpacing: '-0.5em', opacity: '0' },
          '40%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'tracking-in-expand': 'tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
      },
    },
  },
};`,
  },
  {
    slug: "focus-in-contract-bck",
    kind: "animation",
    name: "Focus In Contract Back",
    description: "Lens focus pulling inward from heavy optical blur and wide kerning (Animista Text).",
    category: "text",
    trigger: "click",
    tags: ["focus", "blur", "text", "typography", "lens", "animista"],
    cssKeyframes: `@keyframes focus-in-contract-bck {
  0% {
    letter-spacing: 0.8em;
    transform: translateZ(250px);
    filter: blur(10px);
    opacity: 0;
  }
  100% {
    transform: translateZ(12px);
    filter: blur(0);
    opacity: 1;
  }
}`,
    cssClasses: `.focus-in-contract-bck {
  animation: focus-in-contract-bck 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}`,
    tailwindClasses: `animate-[focus-in-contract-bck_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'focus-in-contract-bck': {
          '0%': { letterSpacing: '0.8em', transform: 'translateZ(250px)', filter: 'blur(10px)', opacity: '0' },
          '100%': { transform: 'translateZ(12px)', filter: 'blur(0)', opacity: '1' },
        },
      },
      animation: {
        'focus-in-contract-bck': 'focus-in-contract-bck 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
};`,
  },
  {
    slug: "text-shadow-pop-tr",
    kind: "animation",
    name: "Text Shadow Pop Top-Right",
    description: "Retro 3D extruded lettering cast in crisp isometric depth (Animista Text).",
    category: "text",
    trigger: "hover",
    tags: ["text", "shadow", "pop", "3d", "isometric", "animista"],
    cssKeyframes: `@keyframes text-shadow-pop-tr {
  0% {
    text-shadow: 0 0 transparent;
    transform: translateX(0) translateY(0);
  }
  100% {
    text-shadow: 1px -1px #3b82f6, 2px -2px #3b82f6, 3px -3px #3b82f6, 4px -4px #3b82f6, 5px -5px #3b82f6;
    transform: translateX(-5px) translateY(5px);
  }
}`,
    cssClasses: `.text-shadow-pop-tr:hover {
  animation: text-shadow-pop-tr 0.35s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}`,
    tailwindClasses: `hover:animate-[text-shadow-pop-tr_0.35s_cubic-bezier(0.47,0,0.745,0.715)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'text-shadow-pop-tr': {
          '0%': { textShadow: '0 0 transparent', transform: 'translateX(0) translateY(0)' },
          '100%': {
            textShadow: '1px -1px #3b82f6, 2px -2px #3b82f6, 3px -3px #3b82f6, 4px -4px #3b82f6, 5px -5px #3b82f6',
            transform: 'translateX(-5px) translateY(5px)',
          },
        },
      },
      animation: {
        'text-shadow-pop-tr': 'text-shadow-pop-tr 0.35s cubic-bezier(0.470, 0.000, 0.745, 0.715) both',
      },
    },
  },
};`,
  },

  // --- 5. ATTENTION & MICRO-INTERACTIONS (animista.net) ---
  {
    slug: "vibrate-1",
    kind: "animation",
    name: "Vibrate",
    description: "Urgent micro-haptic vibration for errors and alarm badges (Animista Attention).",
    category: "attention",
    trigger: "hover",
    tags: ["vibrate", "shake", "attention", "haptic", "error", "animista"],
    cssKeyframes: `@keyframes vibrate-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}`,
    cssClasses: `.vibrate-1 {
  animation: vibrate-1 0.3s linear infinite both;
}`,
    tailwindClasses: `hover:animate-[vibrate-1_0.3s_linear_infinite_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'vibrate-1': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
      animation: {
        'vibrate-1': 'vibrate-1 0.3s linear infinite both',
      },
    },
  },
};`,
  },
  {
    slug: "wobble-hor-bottom",
    kind: "animation",
    name: "Wobble Horizontal Bottom",
    description: "Elastic rotational jiggle pinned to bottom edge (Animista Attention).",
    category: "attention",
    trigger: "hover",
    tags: ["wobble", "jiggle", "attention", "elastic", "animista"],
    cssKeyframes: `@keyframes wobble-hor-bottom {
  0%, 100% { transform: translateX(0%); transform-origin: 50% 50%; }
  15% { transform: translateX(-24px) rotate(-5deg); }
  30% { transform: translateX(12px) rotate(5deg); }
  45% { transform: translateX(-12px) rotate(-3deg); }
  60% { transform: translateX(8px) rotate(2deg); }
  75% { transform: translateX(-4px) rotate(-1deg); }
}`,
    cssClasses: `.wobble-hor-bottom:hover {
  animation: wobble-hor-bottom 0.8s both;
}`,
    tailwindClasses: `hover:animate-[wobble-hor-bottom_0.8s_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'wobble-hor-bottom': {
          '0%, 100%': { transform: 'translateX(0%)', transformOrigin: '50% 50%' },
          '15%': { transform: 'translateX(-24px) rotate(-5deg)' },
          '30%': { transform: 'translateX(12px) rotate(5deg)' },
          '45%': { transform: 'translateX(-12px) rotate(-3deg)' },
          '60%': { transform: 'translateX(8px) rotate(2deg)' },
          '75%': { transform: 'translateX(-4px) rotate(-1deg)' },
        },
      },
      animation: {
        'wobble-hor-bottom': 'wobble-hor-bottom 0.8s both',
      },
    },
  },
};`,
  },
  {
    slug: "jello-horizontal",
    kind: "animation",
    name: "Jello Horizontal",
    description: "Deformable gelatinous squishy pulse oscillating horizontally (Animista Attention).",
    category: "attention",
    trigger: "hover",
    tags: ["jello", "jelly", "squash", "attention", "elastic", "animista"],
    cssKeyframes: `@keyframes jello-horizontal {
  0%, 100% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(0.95, 1.05, 1); }
  75% { transform: scale3d(1.05, 0.95, 1); }
}`,
    cssClasses: `.jello-horizontal:hover {
  animation: jello-horizontal 0.9s both;
}`,
    tailwindClasses: `hover:animate-[jello-horizontal_0.9s_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'jello-horizontal': {
          '0%, 100%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
        },
      },
      animation: {
        'jello-horizontal': 'jello-horizontal 0.9s both',
      },
    },
  },
};`,
  },
  {
    slug: "pulsate-bck",
    kind: "animation",
    name: "Pulsate Back",
    description: "Deep rhythmic heart pulsation with subtle perspective retreat (Animista Attention).",
    category: "attention",
    trigger: "loop",
    tags: ["pulsate", "heartbeat", "pulse", "attention", "loop", "animista"],
    cssKeyframes: `@keyframes pulsate-bck {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.92); }
}`,
    cssClasses: `.pulsate-bck {
  animation: pulsate-bck 0.6s ease-in-out infinite both;
}`,
    tailwindClasses: `animate-[pulsate-bck_0.6s_ease-in-out_infinite_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'pulsate-bck': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.92)' },
        },
      },
      animation: {
        'pulsate-bck': 'pulsate-bck 0.6s ease-in-out infinite both',
      },
    },
  },
};`,
  },

  // --- 6. BACKGROUND ANIMATIONS (animista.net) ---
  {
    slug: "color-change-5x",
    kind: "animation",
    name: "Color Change 5X",
    description: "Harmonious chromatic cycle shifting continuously across 5 vibrant color stops (Animista Background).",
    category: "background",
    trigger: "loop",
    tags: ["color", "gradient", "chromatic", "background", "loop", "animista"],
    cssKeyframes: `@keyframes color-change-5x {
  0% { background: #3b82f6; }
  25% { background: #8b5cf6; }
  50% { background: #ec4899; }
  75% { background: #f59e0b; }
  100% { background: #10b981; }
}`,
    cssClasses: `.color-change-5x {
  animation: color-change-5x 8s linear infinite alternate both;
}`,
    tailwindClasses: `animate-[color-change-5x_8s_linear_infinite_alternate_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'color-change-5x': {
          '0%': { background: '#3b82f6' },
          '25%': { background: '#8b5cf6' },
          '50%': { background: '#ec4899' },
          '75%': { background: '#f59e0b' },
          '100%': { background: '#10b981' },
        },
      },
      animation: {
        'color-change-5x': 'color-change-5x 8s linear infinite alternate both',
      },
    },
  },
};`,
  },
  {
    slug: "kenburns-top",
    kind: "animation",
    name: "Ken Burns Top",
    description: "Cinematic documentary zoom and pan lifting gently towards top horizon (Animista Background).",
    category: "background",
    trigger: "loop",
    tags: ["kenburns", "zoom", "cinematic", "background", "animista"],
    cssKeyframes: `@keyframes kenburns-top {
  0% { transform: scale(1) translateY(0); transform-origin: 50% 16%; }
  100% { transform: scale(1.25) translateY(-15px); transform-origin: top; }
}`,
    cssClasses: `.kenburns-top {
  animation: kenburns-top 5s ease-out infinite alternate both;
}`,
    tailwindClasses: `animate-[kenburns-top_5s_ease-out_infinite_alternate_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'kenburns-top': {
          '0%': { transform: 'scale(1) translateY(0)', transformOrigin: '50% 16%' },
          '100%': { transform: 'scale(1.25) translateY(-15px)', transformOrigin: 'top' },
        },
      },
      animation: {
        'kenburns-top': 'kenburns-top 5s ease-out infinite alternate both',
      },
    },
  },
};`,
  },
  {
    slug: "bounce-top",
    kind: "animation",
    name: "Bounce Top",
    description: "Smooth elastic gravity bounce descending and settling from the top (Animista Attention).",
    category: "attention",
    trigger: "click",
    tags: ["bounce", "attention", "elastic", "animista", "gravity", "settle"],
    cssKeyframes: `@keyframes bounce-top {
  0% { transform: translateY(-45px); animation-timing-function: ease-in; opacity: 1; }
  24% { opacity: 1; }
  40% { transform: translateY(-24px); animation-timing-function: ease-in; }
  65% { transform: translateY(-12px); animation-timing-function: ease-in; }
  82% { transform: translateY(-6px); animation-timing-function: ease-in; }
  93% { transform: translateY(-4px); animation-timing-function: ease-in; }
  25%, 55%, 75%, 87% { transform: translateY(0); animation-timing-function: ease-out; }
  100% { transform: translateY(0); animation-timing-function: ease-out; opacity: 1; }
}`,
    cssClasses: `.bounce-top {
  animation: bounce-top 0.9s both;
}`,
    tailwindClasses: `animate-[bounce-top_0.9s_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'bounce-top': {
          '0%': { transform: 'translateY(-45px)', animationTimingFunction: 'ease-in', opacity: '1' },
          '24%': { opacity: '1' },
          '40%': { transform: 'translateY(-24px)', animationTimingFunction: 'ease-in' },
          '65%': { transform: 'translateY(-12px)', animationTimingFunction: 'ease-in' },
          '82%': { transform: 'translateY(-6px)', animationTimingFunction: 'ease-in' },
          '93%': { transform: 'translateY(-4px)', animationTimingFunction: 'ease-in' },
          '25%, 55%, 75%, 87%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out' },
          '100%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out', opacity: '1' },
        },
      },
      animation: {
        'bounce-top': 'bounce-top 0.9s both',
      },
    },
  },
};`,
  },
  {
    slug: "fade-in-fwd",
    kind: "animation",
    name: "Fade In Forward",
    description: "Dynamic depth zoom transitioning along the Z-axis with smooth opacity fade (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["fade", "zoom", "depth", "entrances", "animista", "perspective"],
    cssKeyframes: `@keyframes fade-in-fwd {
  0% { transform: translateZ(-80px); opacity: 0; }
  100% { transform: translateZ(0); opacity: 1; }
}`,
    cssClasses: `.fade-in-fwd {
  animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}`,
    tailwindClasses: `animate-[fade-in-fwd_0.6s_cubic-bezier(0.39,0.575,0.565,1)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in-fwd': {
          '0%': { transform: 'translateZ(-80px)', opacity: '0' },
          '100%': { transform: 'translateZ(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in-fwd': 'fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
    },
  },
};`,
  },
  {
    slug: "fade-out-bck",
    kind: "animation",
    name: "Fade Out Backward",
    description: "Receding depth push retreating backward into the viewport with gentle opacity fade (Animista Exits).",
    category: "exits",
    trigger: "click",
    tags: ["fade", "exit", "depth", "animista", "shrink", "dismiss"],
    cssKeyframes: `@keyframes fade-out-bck {
  0% { transform: translateZ(0); opacity: 1; }
  100% { transform: translateZ(-80px); opacity: 0; }
}`,
    cssClasses: `.fade-out-bck {
  animation: fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}`,
    tailwindClasses: `animate-[fade-out-bck_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-out-bck': {
          '0%': { transform: 'translateZ(0)', opacity: '1' },
          '100%': { transform: 'translateZ(-80px)', opacity: '0' },
        },
      },
      animation: {
        'fade-out-bck': 'fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
};`,
  },
  {
    slug: "slit-in-vertical",
    kind: "animation",
    name: "Slit In Vertical",
    description: "Architectural 3D door rotation snapping smoothly into place from 90° angle (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["slit", "3d", "rotation", "entrances", "animista", "card"],
    cssKeyframes: `@keyframes slit-in-vertical {
  0% { transform: translateZ(-800px) rotateY(90deg); opacity: 0; }
  54% { transform: translateZ(-160px) rotateY(87deg); opacity: 1; }
  100% { transform: translateZ(0) rotateY(0); opacity: 1; }
}`,
    cssClasses: `.slit-in-vertical {
  animation: slit-in-vertical 0.45s ease-out both;
}`,
    tailwindClasses: `animate-[slit-in-vertical_0.45s_ease-out_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slit-in-vertical': {
          '0%': { transform: 'translateZ(-800px) rotateY(90deg)', opacity: '0' },
          '54%': { transform: 'translateZ(-160px) rotateY(87deg)', opacity: '1' },
          '100%': { transform: 'translateZ(0) rotateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slit-in-vertical': 'slit-in-vertical 0.45s ease-out both',
      },
    },
  },
};`,
  },
  {
    slug: "slide-in-blurred-bottom",
    kind: "animation",
    name: "Slide In Blurred Bottom",
    description: "High-speed camera motion blur entrance rising from the bottom with rapid optical settling (Animista Entrances).",
    category: "entrances",
    trigger: "click",
    tags: ["blur", "slide", "speed", "entrances", "animista", "motion"],
    cssKeyframes: `@keyframes slide-in-blurred-bottom {
  0% { transform: translateY(600px) scaleY(2) scaleX(0.4); transform-origin: 50% 100%; filter: blur(30px); opacity: 0; }
  100% { transform: translateY(0) scaleY(1) scaleX(1); transform-origin: 50% 50%; filter: blur(0); opacity: 1; }
}`,
    cssClasses: `.slide-in-blurred-bottom {
  animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}`,
    tailwindClasses: `animate-[slide-in-blurred-bottom_0.6s_cubic-bezier(0.23,1,0.32,1)_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-in-blurred-bottom': {
          '0%': { transform: 'translateY(600px) scaleY(2) scaleX(0.4)', transformOrigin: '50% 100%', filter: 'blur(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0) scaleY(1) scaleX(1)', transformOrigin: '50% 50%', filter: 'blur(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-blurred-bottom': 'slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both',
      },
    },
  },
};`,
  },
  {
    slug: "heartbeat",
    kind: "animation",
    name: "Heartbeat Pulse",
    description: "Physiological dual systolic rhythm pulsation with natural biological decay (Animista Attention).",
    category: "attention",
    trigger: "loop",
    tags: ["heartbeat", "pulse", "attention", "loop", "animista", "cardiac"],
    cssKeyframes: `@keyframes heartbeat {
  from { transform: scale(1); transform-origin: center center; animation-timing-function: ease-out; }
  10% { transform: scale(0.91); animation-timing-function: ease-in; }
  17% { transform: scale(0.98); animation-timing-function: ease-out; }
  33% { transform: scale(0.87); animation-timing-function: ease-in; }
  45% { transform: scale(1); animation-timing-function: ease-out; }
}`,
    cssClasses: `.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite both;
}`,
    tailwindClasses: `animate-[heartbeat_1.5s_ease-in-out_infinite_both]`,
    tailwindConfig: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'heartbeat': {
          'from': { transform: 'scale(1)', transformOrigin: 'center center', animationTimingFunction: 'ease-out' },
          '10%': { transform: 'scale(0.91)', animationTimingFunction: 'ease-in' },
          '17%': { transform: 'scale(0.98)', animationTimingFunction: 'ease-out' },
          '33%': { transform: 'scale(0.87)', animationTimingFunction: 'ease-in' },
          '45%': { transform: 'scale(1)', animationTimingFunction: 'ease-out' },
        },
      },
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite both',
      },
    },
  },
};`,
  },
];
