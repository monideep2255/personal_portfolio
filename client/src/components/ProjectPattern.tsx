import { useMemo } from "react";

interface ProjectPatternProps {
  seed: number;
  title: string;
  className?: string;
}

export function ProjectPattern({ seed, title, className = "" }: ProjectPatternProps) {
  const pattern = useMemo(() => {
    // Generate a deterministic pattern based on the seed
    const random = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Generate colors
    const hue = Math.floor(random(seed + 200) * 360);
    const backgroundColor = `hsl(${hue}, 70%, 85%)`;
    const textColor = `hsl(${hue}, 70%, 35%)`;

    return {
      backgroundColor,
      textColor
    };
  }, [seed]);

  const firstLetter = title.charAt(0).toUpperCase();

  return (
    <div 
      className={`aspect-square rounded-lg flex items-center justify-center font-bold text-3xl ${className}`}
      style={{ 
        backgroundColor: pattern.backgroundColor,
        color: pattern.textColor,
        minHeight: "80px",
        maxHeight: "120px"
      }}
    >
      {firstLetter}
    </div>
  );
}