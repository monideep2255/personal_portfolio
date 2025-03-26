import { useMemo } from "react";

interface ProjectPatternProps {
  seed: number;
  className?: string;
}

export function ProjectPattern({ seed, className = "" }: ProjectPatternProps) {
  const pattern = useMemo(() => {
    // Generate a deterministic pattern based on the seed
    const random = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Generate pattern points
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = random(seed + i) * Math.PI * 2;
      const radius = 20 + random(seed + i + 100) * 30;
      points.push([
        50 + Math.cos(angle) * radius,
        50 + Math.sin(angle) * radius
      ]);
    }

    // Generate colors
    const hue = Math.floor(random(seed + 200) * 360);
    const colors = [
      `hsl(${hue}, 70%, 60%)`,
      `hsl(${(hue + 60) % 360}, 70%, 60%)`,
      `hsl(${(hue + 180) % 360}, 70%, 60%)`
    ];

    return {
      points: points.map(([x, y]) => `${x},${y}`).join(" "),
      colors
    };
  }, [seed]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={`aspect-square ${className}`}
      style={{ minHeight: "120px" }}
    >
      <defs>
        <linearGradient id={`gradient-${seed}`}>
          <stop offset="0%" stopColor={pattern.colors[0]} />
          <stop offset="50%" stopColor={pattern.colors[1]} />
          <stop offset="100%" stopColor={pattern.colors[2]} />
        </linearGradient>
      </defs>
      <polygon
        points={pattern.points}
        fill={`url(#gradient-${seed})`}
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
    </svg>
  );
}
