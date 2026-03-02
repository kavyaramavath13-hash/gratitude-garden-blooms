import { motion } from "framer-motion";
import type { GratitudeEntry } from "@/lib/gratitude-store";

const PLANTS: React.FC<{ size: number }>[] = [
  // Tulip pink
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="20" className="stroke-garden-green" strokeWidth="2.5" />
      <ellipse cx="14" cy="18" rx="8" ry="12" className="fill-garden-pink" />
      <ellipse cx="26" cy="18" rx="8" ry="12" className="fill-garden-pink" />
      <ellipse cx="20" cy="15" rx="6" ry="10" fill="hsl(340 70% 78%)" />
    </svg>
  ),
  // Sunflower
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="22" className="stroke-garden-green" strokeWidth="2.5" />
      <ellipse cx="12" cy="30" rx="6" ry="3" className="fill-garden-green" transform="rotate(-30 12 30)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="20" cy="10" rx="3" ry="7" className="fill-garden-yellow"
          transform={`rotate(${angle} 20 16)`} />
      ))}
      <circle cx="20" cy="16" r="5" fill="hsl(30 50% 30%)" />
    </svg>
  ),
  // Daisy
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="22" className="stroke-garden-green" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="20" cy="10" rx="3" ry="7" fill="white" stroke="hsl(340 30% 85%)" strokeWidth="0.5"
          transform={`rotate(${angle} 20 16)`} />
      ))}
      <circle cx="20" cy="16" r="4" className="fill-garden-yellow" />
    </svg>
  ),
  // Rose
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="24" className="stroke-garden-green" strokeWidth="2.5" />
      <ellipse cx="15" cy="34" rx="5" ry="2.5" className="fill-garden-green" transform="rotate(20 15 34)" />
      <circle cx="20" cy="16" r="10" className="fill-garden-pink" />
      <circle cx="20" cy="16" r="7" fill="hsl(340 65% 60%)" />
      <circle cx="20" cy="16" r="4" fill="hsl(340 70% 55%)" />
    </svg>
  ),
  // Sprout (small)
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="30" className="stroke-garden-green" strokeWidth="2.5" />
      <ellipse cx="14" cy="28" rx="7" ry="4" className="fill-garden-light-green" transform="rotate(-20 14 28)" />
      <ellipse cx="26" cy="28" rx="7" ry="4" className="fill-garden-light-green" transform="rotate(20 26 28)" />
    </svg>
  ),
  // Lavender
  ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 50">
      <line x1="20" y1="50" x2="20" y2="10" className="stroke-garden-green" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={17} cy={12 + i * 4} r="3" fill="hsl(280 40% 70%)" />
          <circle cx={23} cy={14 + i * 4} r="3" fill="hsl(280 40% 70%)" />
        </g>
      ))}
    </svg>
  ),
];

interface GardenPlantProps {
  entry: GratitudeEntry;
  index: number;
}

export function GardenPlant({ entry, index }: GardenPlantProps) {
  const PlantSvg = PLANTS[entry.flowerType % PLANTS.length];
  const size = 36 + (entry.text.length > 50 ? 12 : 0);

  return (
    <motion.div
      initial={{ scale: 0, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5, type: "spring" }}
      className="cursor-pointer group relative"
      title={`${entry.date}: ${entry.text}`}
    >
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2.5 + Math.random() * 2, ease: "easeInOut" }}
      >
        <PlantSvg size={size} />
      </motion.div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-xs max-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <p className="font-display text-[10px] text-muted-foreground mb-1">{entry.date}</p>
        <p className="text-foreground leading-tight">{entry.text}</p>
      </div>
    </motion.div>
  );
}
