import { useMemo } from "react";

import { LucideIcon, Code2, FileCode, Folder, Terminal, Database, Globe } from "lucide-react";

interface ProjectPatternProps {
  seed: number;
  title: string;
  className?: string;
  icon?: LucideIcon;
}

export function ProjectPattern({ seed, title, className = "", icon: Icon }: ProjectPatternProps) {
  const pattern = useMemo(() => {
    // Generate a deterministic pattern based on the seed
    const random = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Generate colors with better caching
    const hue = Math.floor(random(seed + 200) * 360);
    const backgroundColor = `hsl(${hue}, 70%, 85%)`;
    const textColor = `hsl(${hue}, 70%, 35%)`;

    return {
      backgroundColor,
      textColor
    };
  }, [seed]); // Memoize based on seed only

  const firstLetter = useMemo(() => 
    title.charAt(0).toUpperCase()
  , [title]);

  return (
    <div 
      className={`aspect-square rounded-lg flex items-center justify-center font-bold text-3xl transition-all duration-300 hover:scale-105 ${className}`}
      style={{ 
        backgroundColor: pattern.backgroundColor,
        color: pattern.textColor,
        minHeight: "80px",
        maxHeight: "120px"
      }}
      role="img"
      aria-label={`${title} project icon`}
    >
      {Icon ? <Icon size={32} /> : firstLetter}
    </div>
  );
}